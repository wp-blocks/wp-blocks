/* OPTIONS */
import prompts from 'prompts';

import { compressors, svgOptions } from './constants.js';

export const srcDirQuestion = {
	type: 'text',
	name: 'srcDir',
	message: 'Enter the source directory:',
	initial: './in',
};

export const distDirQuestion = {
	type: 'text',
	name: 'distDir',
	message: 'Enter the destination directory:',
	initial: './out',
};

/**
 * This function prompts the user for options to compress different image formats,
 * including SVG files with custom SVGO plugins.
 *
 * @param imageFormats - An array of image file formats (e.g. ['.jpg', '.png', '.svg'])
 *                     that the function will prompt the user about compressing.
 * @returns an object containing compression options for different image formats. The
 * options are obtained through a series of prompts that ask the user whether they want
 * to compress each format, which compressor to use (if applicable), and the quality
 * level (if applicable). For SVG files, the user can also choose which SVGO plugins to
 * use for compression.
 */
export async function getImageCompressionOptions( imageFormats ) {
	const options = {};
	for ( const format of imageFormats ) {
		let response = {};
		if ( format === '.svg' ) {
			response = await prompts( {
				type: 'select',
				name: 'compress',
				message: `Would you like to compress ${ format } files with SVGO?`,
				choices: [
					{ title: 'Yes, with default options', value: 'default' },
					{ title: 'Yes, with custom options', value: 'custom' },
					{ title: 'No', value: 'no' },
				],
			} );
			if ( response.compress === 'custom' ) {
				response = await prompts( {
					type: 'multiselect',
					name: 'plugins',
					message: 'Which SVGO plugins do you want to use?',
					choices: svgOptions,
					hint: '- Space to select. Return to submit',
				} );
			}
		} else {
			response = await prompts( [
				{
					type: 'select',
					name: 'compress',
					message: `Would you like to compress ${ format } files?`,
					choices: [
						{ title: 'Yes', value: 'yes' },
						{ title: 'No', value: 'no' },
					],
				},
				{
					type: ( prev, values ) => {
						if ( values.compress === 'no' ) {
							return null; // Skip this question
						}
						return 'select';
					},
					name: 'compressor',
					message: `Which compressor would you like to use for ${ format } files?`,
					choices: compressors.map( ( comp ) => ( {
						title: comp,
						value: comp,
					} ) ),
				},
				{
					type: ( prev, values ) => {
						if ( values.compress === 'no' ) {
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
			] );

			if ( response.compress === 'no' ) {
				console.log( `Skipping ${ format } files...` );
				continue;
			}
		}
		options[ format ] = response;
	}
	return options;
}
