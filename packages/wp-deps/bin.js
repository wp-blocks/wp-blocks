#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync, writeFileSync } from 'node:fs';

// eslint-disable-next-line import/default
import prettier from 'prettier';
import yargs from 'yargs/yargs';

// prettier requires this to import into an es module without error.
// eslint-disable-next-line import/no-named-as-default-member
const { format, resolveConfig } = prettier;

import { updateDependencies } from './build/index.js';

const raw = readFileSync( './package.json' );
const pkg = JSON.parse( raw );
const prettierOptions = {
	...( await resolveConfig( process.cwd() ) ),
	parser: 'json',
};

if ( ! ( pkg?.dependencies || pkg?.devDependencies ) ) {
	console.log( 'No dependencies fields found in "./package.json"' );
}

const argv = yargs( process.argv.slice( 2 ) )
	.options( {
		t: {
			type: 'string',
			demandOption: true,
			alias: 'target',
			describe: 'The release of Gutenberg to target',
		},
		D: {
			type: 'boolean',
			alias: 'dev',
			describe:
				'Optionally update "devDependencies" to match Gutenberg targeted release.',
		},
	} )
	.parseSync();

/**
 * Update dependencies to target a release of Gutenberg.
 */
const updated = await updateDependencies( pkg, argv.t, { dev: argv.D } );

if ( updated ) {
	const stringified = JSON.stringify( updated, null, 2 );
	writeFileSync( './package.json', format( stringified, prettierOptions ) );
}
