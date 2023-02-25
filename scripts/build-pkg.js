#!/usr/bin/env node

import { exec } from './utils/exec.js';

if ( ! process.env.CI ) {
	await exec( 'npm', [ 'run', 'clean:all' ] );
}

try {
	await exec( 'npm', [ 'run', 'build:compile' ] );
	await exec( 'npm', [ 'run', 'build:esm' ] );
	await exec( 'npm', [ 'run', 'build:types' ] );
} catch ( code ) {
	process.exit( code );
}

process.exit( 0 );
