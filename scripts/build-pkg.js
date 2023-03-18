#!/usr/bin/env node

import { exec } from './utils/exec.js';

if ( ! process.env.CI ) {
	await exec( 'pnpm', [ 'run', 'clean:all' ] );
}

try {
	await exec( 'pnpm', [ 'run', 'build:compile' ] );
	await exec( 'pnpm', [ 'run', 'build:esm' ] );
	await exec( 'pnpm', [ 'run', 'build:types' ] );
} catch ( code ) {
	process.exit( code );
}

process.exit( 0 );
