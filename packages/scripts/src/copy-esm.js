#!/usr/bin/env node

import path from 'path';

import { copy } from './utils/index.js';

/**
 * Copy ESM output of `tsc` to build directory.
 *
 * Includes source maps if present.
 */
export default function () {
	const fromDir = path.resolve( './lib' );
	const toDir = path.resolve( './build' );
	copy( fromDir, toDir, ( file ) =>
		/\.js(?:\.map)?$/.test( path.basename( file ) )
	);
}
