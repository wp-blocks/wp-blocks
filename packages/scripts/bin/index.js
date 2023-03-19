#!/usr/bin/env node
/* eslint-disable no-shadow */
import yargs from 'yargs/yargs';

import buildPkg from '../src/build-pkg.js';
import buildEsm from '../src/copy-esm.js';
import buildDocs from '../src/run-api-documenter.js';
import buildTypes from '../src/run-api-extractor.js';
import buildCompile from '../src/run-tsc.js';

const argv = yargs( process.argv.slice( 2 ) )
	.command( [ 'build', 'compile' ], 'transpile TypeScript', ( yargs ) => {
		yargs.options( {
			l: {
				type: 'boolean',
				alias: 'local',
				describe: 'Local development flag',
			},
		} );
	} )
	.command( [ 'build', 'docs' ], 'generate documentation' )
	.command( [ 'build', 'esm' ], 'copy esm to build directory' )
	.command( [ 'build', 'pkg' ], 'completely build package', ( yargs ) => {
		yargs.options( {
			l: {
				type: 'boolean',
				alias: 'local',
				describe: 'Local development flag',
			},
		} );
	} )
	.command( [ 'build', 'types' ], 'rollup type declarations', ( yargs ) => {
		yargs.options( {
			l: {
				type: 'boolean',
				alias: 'local',
				describe: 'Local development flag',
			},
		} );
	} )
	.parseSync();

const [ , cmd ] = argv._;

const options = { local: !! argv.l };
console.log( options );
if ( cmd === 'compile' ) {
	await buildCompile( options );
} else if ( cmd === 'docs' ) {
	await buildDocs();
} else if ( cmd === 'esm' ) {
	buildEsm();
} else if ( cmd === 'pkg' ) {
	await buildPkg( options );
} else if ( cmd === 'types' ) {
	await buildTypes( options );
}
