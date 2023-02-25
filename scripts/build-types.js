#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';

import { exec } from './utils/exec.js';

const rootDir = path.resolve(
	fileURLToPath( new URL( '.', import.meta.url ) ),
	'../'
);

const apiExtractorPath = path.join(
	rootDir,
	'node_modules/.bin/api-extractor'
);

// Strip `--local` out. It will be configured only by this script.
const args = process.argv.slice( 2 ).filter( ( arg ) => arg !== '--local' );

// When in CI, `api-extractor` shouldn't apply the local flag. This script will
// error if an API change occurs without being committed in an `api.md` file.
const localFlag = process.env.CI ? [] : [ '--local' ];

/**
 * ApiExtractor CLI arguments.
 */
const apiExtractorArgs = [ 'run', ...args, ...localFlag ];

console.log( `api-extractor ${ apiExtractorArgs.join( ' ' ) }` );

exec( apiExtractorPath, apiExtractorArgs )
	.then( () => process.exit( 0 ) )
	.catch( ( code ) => {
		process.exit( code );
	} );
