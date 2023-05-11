/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import sharp from 'sharp';
import { optimize } from 'svgo';

import { InputFormats } from './constants.js';
import { getCompressionOptions } from './utils.js';

/**
 * The function optimizes an SVG file using SVGO and writes the optimized SVG to a
 * specified output file.
 *
 * @param {string} filePath    - The path to the SVG file that needs to be optimized.
 * @param {string} distPath    - The `distPath` parameter is a string representing the file path
 *                             where the optimized SVG file will be written to.
 * @param {Object} svgoOptions - `svgoOptions` is an object that contains options for optimizing
 *                             the SVG using SVGO (SVG Optimizer). These options can include things like removing
 *                             comments, removing empty groups, and optimizing path data. The specific options and
 *                             their values will depend on the desired optimization settings.
 */
export function optimizeSvg( filePath, distPath, svgoOptions ) {
	// Read the SVG file from the file system
	const svg = fs.readFileSync( filePath, 'utf8' );

	// Optimize the SVG with SVGO
	const optimizedSvg = optimize( svg, svgoOptions );

	// Write the optimized SVG to the output file
	fs.writeFileSync( distPath, optimizedSvg.data );
}

function getOutputExtension( compressor ) {
	switch ( compressor ) {
		case 'jpeg':
		case 'jpg':
		case 'mozjpeg':
			return '.jpg';
		default:
			return '.'.concat( compressor );
	}
}

/**
 * The function converts images in a source directory to a specified format and
 * compresses them, while also copying non-image files to a destination directory.
 *
 * @param {string} srcDir             - The source directory from where the images will be read and
 *                                    converted.
 * @param {string} distDir            - The destination directory where the converted images will be
 *                                    saved. If no value is provided, the images will be saved in the same directory as
 *                                    the source images.
 * @param {Object} compressionOptions - An optional object that contains compression options
 *                                    for different image formats. The default value is an empty object. The object should
 *                                    have keys that correspond to image formats (e.g. "jpg", "png", "webp") and values
 *                                    that are objects containing compression options for that format (e.g. "
 */
export function convertImages( srcDir, distDir = '', compressionOptions = {} ) {
	// Get a list of files in the source directory
	const files = fs.readdirSync( srcDir );

	// Loop through the files in the directory
	files.forEach( ( file ) => {
		// Get the full path of the file
		const filePath = path.join( srcDir, file );

		// Get the stats of the file
		const stats = fs.statSync( filePath );

		// Check if the file is a directory
		if ( stats.isDirectory() ) {
			// Recursively call this function on the subdirectory
			const subDir = path.join( distDir, file );
			fs.mkdirSync( subDir, { recursive: true } );

			// Call this function on the subdirectory
			convertImages( filePath, subDir, compressionOptions );
		} else {
			// Get the extension of the file
			const extension = path.extname( filePath ).toLowerCase();

			// Set the default options for the image format
			const options = getCompressionOptions(
				extension,
				compressionOptions
			);

			// Check if the file is an image
			if ( InputFormats.includes( extension ) && options ) {
				// Apply compression options
				if ( extension === '.svg' ) {
					// Save the image to the destination directory
					const distPath = distDir
						? path.join( distDir, file )
						: filePath;
					optimizeSvg( filePath, distPath, { ...options.plugins } );
				} else {
					// Load the image with sharp
					let image = sharp( filePath );

					if ( options?.compressor ) {
						// Apply compression
						switch ( options.compressor ) {
							case 'avif':
								image = image.avif( {
									quality: options.quality,
								} );
								break;
							case 'webp':
								image = image.webp( {
									quality: options.quality,
								} );
								break;
							case 'mozjpeg':
								image = image.jpeg( {
									mozjpeg: true,
									quality: options.quality,
								} );
								break;
							case 'png':
								image = image.png();
								break;
							case 'jpg':
								image = image.jpeg( {
									quality: options.quality,
									progressive: options.progressive,
								} );
								break;
						}
					}

					// Save the image to the destination directory
					const distPath = distDir
						? path.join( distDir, file )
						: filePath;
					const distFileName = distPath.concat(
						getOutputExtension( options.compressor )
					);
					image.toFile( distFileName );

					console.log(
						`File converted from ${ filePath } to ${ distFileName }`
					);
				}
			} else {
				// copy the file to the destination directory
				// Read the contents of the source file
				const distFileName = path.join( distDir, file );

				const fileContent = fs.readFileSync( filePath );

				// Write the contents to the destination file
				fs.writeFileSync( distFileName, fileContent );

				console.log(
					`File copied from ${ filePath } to ${ distFileName }`
				);
			}
		}
	} );
}
