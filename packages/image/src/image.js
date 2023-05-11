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

	const imageFormats = getImageFormatsInFolder( srcDir );

	const compressionOptions = await getImageCompressionOptions( imageFormats );

	const startTime = Date.now();
	convertImages( srcDir, distDir, compressionOptions );
	console.log(
		'Time elapsed:',
		( Date.now() - startTime ) / 1000,
		'seconds'
	);
}
