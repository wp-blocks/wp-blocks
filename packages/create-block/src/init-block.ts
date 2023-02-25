/**
 * External dependencies
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import makeDir from 'make-dir';

/**
 * Internal dependencies
 */
import { info } from './log.js';
import { writeOutputTemplate } from './output.js';
import type { Config } from './types.js';

async function initBlockJSON( {
	$schema,
	apiVersion,
	plugin,
	slug,
	namespace,
	title,
	version,
	description,
	category,
	attributes,
	supports,
	dashicon,
	domainPath,
	folderName,
	editorScript,
	editorStyle,
	style,
	render,
	customBlockJSON,
}: Config ) {
	info( '' );
	info( 'Creating a "block.json" file.' );

	const outputFile = plugin
		? join( process.cwd(), slug, folderName, 'block.json' )
		: join( process.cwd(), slug, 'block.json' );
	await makeDir( dirname( outputFile ) );
	await writeFile(
		outputFile,
		JSON.stringify(
			Object.fromEntries(
				Object.entries( {
					$schema,
					apiVersion,
					name: namespace + '/' + slug,
					version,
					title,
					category,
					icon: dashicon,
					description,
					attributes,
					supports,
					textdomain: domainPath,
					editorScript,
					editorStyle,
					style,
					render,
					...customBlockJSON,
				} ).filter( ( [ , value ] ) => !! value )
			),
			null,
			'\t'
		)
	);
}

export default async function initBlock( outputTemplates, view ) {
	await Promise.all(
		Object.keys( outputTemplates ).map( async ( outputFile ) => {
			const pathName = view.plugin
				? join( view.folderName, outputFile )
				: join( process.cwd(), view.slug, outputFile );

			await writeOutputTemplate(
				outputTemplates[ outputFile ],
				pathName,
				view
			);
		} )
	);
	await initBlockJSON( view );
}
