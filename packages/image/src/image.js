
import sharp from 'sharp';
import prompts from 'prompts';
import path from 'path';
import fs from "fs";
import {optimize} from 'svgo';

const srcDirQuestion = {
	type: 'text',
	name: 'srcDir',
	message: 'Enter the source directory:',
	initial: './temp/img',
};

const distDirQuestion = {
	type: 'text',
	name: 'distDir',
	message: 'Enter the destination directory:',
	initial: './img',
};


function getImageFormatsInFolder(folderPath) {
	const imageFormats = new Set(); // using a Set to store unique image formats

	/**
	 * This function searches for all image files in a given folder
	 *
	 * @param dir
	 */
	function searchForImages(dir) {
		const files = fs.readdirSync(dir);

		// iterate over each file
		files.forEach(file => {
			const filePath = path.join(dir, file);

			const stats = fs.statSync(filePath);

			if (stats.isDirectory()) {
				searchForImages(filePath);
			} else {
				const ext = path.extname(file).toLowerCase(); // get the file extension in lowercase

				if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.svg' || ext === '.gif' || ext === '.tiff'  ) { // check if it's an image file
					imageFormats.add(ext); // add the image format to the Set
				}
			}
		});
	}

	searchForImages(folderPath);

	return [...imageFormats]; // convert the Set to an array
}

const svgOptions = [
	{ title: 'CleanupAttrs', value: 'cleanupAttrs'},
	{ title: 'RemoveDoctype', value: 'removeDoctype'},
	{ title: 'RemoveXMLProcInst', value: 'removeXMLProcInst'},
	{ title: 'RemoveComments', value: 'removeComments'},
	{ title: 'RemoveMetadata', value: 'removeMetadata'},
	{ title: 'RemoveTitle', value: 'removeTitle'},
	{ title: 'RemoveDesc', value: 'removeDesc'},
	{ title: 'RemoveUselessDefs', value: 'removeUselessDefs'},
	{ title: 'RemoveXMLNS', value: 'removeXMLNS'},
	{ title: 'RemoveEditorsNSData', value: 'removeEditorsNSData'},
	{ title: 'RemoveEmptyAttrs', value: 'removeEmptyAttrs'},
	{ title: 'RemoveHiddenElems', value: 'removeHiddenElems'},
	{ title: 'RemoveEmptyText', value: 'removeEmptyText'},
	{ title: 'RemoveEmptyContainers', value: 'removeEmptyContainers'},
	{ title: 'MergePaths', value: 'mergePaths'},
	{ title: 'RemoveUnusedNS', value: 'removeUnusedNS'},
	{ title: 'SortAttrs', value: 'sortAttrs'},
	{ title: 'RemoveAttrs', value: 'removeAttrs'},
	{ title: 'ConvertShapeToPath', value: 'convertShapeToPath'},
	{ title: 'SortDefsChildren', value: 'sortDefsChildren'},
	{ title: 'RemoveDimensions', value: 'removeDimensions'},
	{ title: 'RemoveStyleElement', value: 'removeStyleElement'},
	{ title: 'RemoveScriptElement', value: 'removeScriptElement' }
]

const compressors = ['avif', 'webp', 'mozjpeg'];

async function getImageCompressionOptions(imageFormats) {
	const options = {};
	for (let i = 0; i < imageFormats.length; i++) {
		const format = imageFormats[i];
		let response = {};
		if (format === '.svg') {
			response = await prompts({
				type: 'select',
				name: 'compress',
				message: `Would you like to compress ${format} files with SVGO?`,
				choices: [
					{ title: 'Yes, with default options', value: 'default' },
					{ title: 'Yes, with custom options', value: 'custom' },
					{ title: 'No', value: 'no' },
				],
			});
			if (response.compress === 'custom') {
				response = await prompts({
					type: 'multiselect',
					name: 'plugins',
					message: 'Which SVGO plugins do you want to use?',
					choices: svgOptions,
					hint: '- Space to select. Return to submit'
				});
			}
		} else {
			response = await prompts([
				{
					type: 'select',
					name: 'compress',
					message: `Would you like to compress ${format} files?`,
					choices: [
						{ title: 'Yes', value: 'yes' },
						{ title: 'No', value: 'no' },
					],
				},
				{
					type: (prev, values) => {
						if (values.compress === 'no') {
							return null; // Skip this question
						}
						return 'select';
					},
					name: 'compressor',
					message: `Which compressor would you like to use for ${format} files?`,
					choices: compressors.map((comp) => ({ title: comp, value: comp }))
				},
				{
					type: (prev, values) => {
						if (values.compress === 'no') {
							return null; // Skip this question
						}
						return 'number';
					},
					name: 'quality',
					message: 'Enter the quality (1-100):',
					initial: 75,
					min: 1,
					max: 100,
				},
			]);

			if (response.compress === 'no') {
				console.log(`Skipping ${format} files...`);
				continue;
			}
		}
		options[format] = response;
	}
	return options;
}

function getCompressionOptions(imageFormat, options) {
	const formatOptions = options[imageFormat];

	if (!formatOptions) {
		throw new Error(`No compression options found for format: ${imageFormat}`);
	}

	return formatOptions;
}

function optimizeSvg(filePath, distPath, svgoOptions) {
	// Read the SVG file from the file system
	const svg = fs.readFileSync(filePath, 'utf8');

	// Optimize the SVG with SVGO
	const optimizedSvg = optimize(svg, svgoOptions);

	// Write the optimized SVG to the output file
	fs.writeFileSync(distPath, optimizedSvg.data);
}

function convertImages(srcDir, distDir = '', compressionOptions = {}) {
	// Get a list of files in the source directory
	const files = fs.readdirSync(srcDir);

	// Loop through the files in the directory
	files.forEach(file => {
		// Get the full path of the file
		const filePath = path.join(srcDir, file);

		// Get the stats of the file
		const stats = fs.statSync(filePath);

		// Check if the file is a directory
		if (stats.isDirectory()) {
			// Recursively call this function on the subdirectory
			const subDir = path.join(distDir, file);
			fs.mkdirSync(subDir, { recursive: true });
			convertImages(filePath, subDir, compressionOptions);
		} else {
			// Get the extension of the file
			const extension = path.extname(filePath).toLowerCase();

			// Check if the file is an image
			if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.gif', '.svg'].includes(extension)) {
				// Set the default options for the image format
				let options = {};
				if (extension in compressionOptions) {
					options = compressionOptions[extension];
				}

				// Apply compression options
				if (extension === '.svg') {
					// Optimize the SVG

					// Save the image to the destination directory
					const distPath = distDir ? path.join(distDir, file) : filePath;
					optimizeSvg(filePath, distPath,{ ...options.plugins });

				} else {

					// Load the image with sharp
					let image = sharp(filePath);

					if (options.compress === 'yes') {
						if (options.compressor === 'avif') {
							image = image.avif({ quality: options.quality });
						} else if (options.compressor === 'webp') {
							image = image.webp({ quality: options.quality });
						} else if (options.compressor === 'mozjpeg') {
							image = image.jpeg({ mozjpeg: true, quality: options.quality });
						} else {
							image = image.jpeg({ quality: options.quality });
						}
					}

					// Save the image to the destination directory
					const distPath = distDir ? path.join(distDir, file) : filePath;
					image.toFile(distPath);
				}
			}
		}
	});
}

/**
 * 	Prompts the user for the source and destination directories
 * 	then runs a function that converts the images
 *
 * @return {Promise<void>}
 */
export default async function main() {
	const { srcDir, distDir } = await prompts([srcDirQuestion, distDirQuestion]);

	const imageFormats = getImageFormatsInFolder(srcDir);

	const compressionOptions = await getImageCompressionOptions(imageFormats);

	convertImages(srcDir, distDir, compressionOptions);
}
