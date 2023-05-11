/* eslint-disable no-console */
import prompts from 'prompts';

import { convertImages } from './compression.js';
import {
	distDirQuestion,
	getImageCompressionOptions,
	srcDirQuestion,
} from './options.js';
import { getImageFormatsInFolder } from './utils.js';

/**
 * Prompts the user for the source and destination directories
 * then runs a function that converts the images.
 *
 * @returns {Promise<void>}
 */
export default async function main() {
	const { srcDir, distDir } = await prompts( [
		srcDirQuestion,
		distDirQuestion,
	] );

	// Get the image formats
	const imageFormats = getImageFormatsInFolder( srcDir );

	// Get the compression options
	const compressionOptions = await getImageCompressionOptions( imageFormats );

	// Start the timer
	const startTime = Date.now();

	// Then convert the images in the source directory
	convertImages( srcDir, distDir, compressionOptions );

	// Print the time elapsed
	console.log(
		'Time elapsed:',
		( Date.now() - startTime ) / 1000,
		'seconds'
	);
}
