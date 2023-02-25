/**
 * External dependencies
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import makeDir from 'make-dir';
import { render } from 'mustache';

const writeOutputAsset = async ( inputFile, outputFile, view ) => {
	const outputFilePath = join( view.slug, 'assets', outputFile );
	await makeDir( dirname( outputFilePath ) );
	writeFile( outputFilePath, inputFile );
};

const writeOutputTemplate = async ( inputFile, outputFile, view ) => {
	const outputFilePath = view.plugin
		? join( view.slug, outputFile.replace( /\$slug/g, view.slug ) )
		: outputFile;
	await makeDir( dirname( outputFilePath ) );
	// If the rendered template is empty, don't write it. This is how we can conditionally add template files.
	const renderedFile = render( inputFile, view );
	if ( renderedFile.trim().length ) {
		writeFile( outputFilePath, renderedFile );
	}
};

module.exports = {
	writeOutputAsset,
	writeOutputTemplate,
};
