#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { exec } from './utils/exec.js';

const rootDir = path.resolve(
	fileURLToPath( new URL( '.', import.meta.url ) ),
	'../'
);

const apiDocumenterPath = path.join(
	rootDir,
	'node_modules/.bin/api-documenter'
);

const args = process.argv.slice( 2 );

/**
 * ApiDocumenter CLI arguments.
 */
const apiDocumenterArgs = [
	'markdown',
	'-i',
	'./temp',
	'-o',
	'./docs',
	...args,
];

console.log( `api-documenter ${ apiDocumenterArgs.join( ' ' ) }` );

exec( apiDocumenterPath, apiDocumenterArgs )
	.then( () => process.exit( 0 ) )
	.catch( ( code ) => {
		process.exit( code );
	} );
