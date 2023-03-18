#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync, writeFileSync } from 'node:fs';

// eslint-disable-next-line import/default
import prettier from 'prettier';
import yargs from 'yargs/yargs';

// prettier requires this to import into an es module without error.
// eslint-disable-next-line import/no-named-as-default-member
const { format, resolveConfig } = prettier;

import { fetchVersions } from './src/index.js';

const raw = readFileSync( './package.json' );
const pkg = JSON.parse( raw );
const prettierOptions = {
	...( await resolveConfig( process.cwd() ) ),
	parser: 'babel',
};

if ( ! ( pkg?.dependencies || pkg?.devDependencies ) ) {
	console.log( 'No "@wordpress" dependencies found' );
}

const argv = yargs( process.argv.slice( 2 ) )
	.options( {
		t: {
			type: 'string',
			demandOption: true,
			alias: 'target',
			describe: 'The release of Gutenberg to target',
		},
	} )
	.parseSync();

/**
 * Update dependencies to target a release of Gutenberg.
 */

const deps = await fetchVersions( argv.t );

let updated = false;

for ( const [ name, version ] of Object.entries( deps ) ) {
	if ( pkg.dependencies[ name ] ) {
		pkg.dependencies[ name ] = version;
		updated = true;
	}
	if ( pkg.devDependencies[ name ] ) {
		pkg.devDependencies[ name ] = version;
		updated = true;
	}
}

if ( updated ) {
	writeFileSync( './package.json', format( pkg, prettierOptions ) );
}
