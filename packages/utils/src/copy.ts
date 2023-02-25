import fs from 'node:fs';
import path from 'node:path';

import { mkdirp } from './mkdirp.js';

/**
 *
 * @param x
 */
function identity< T >( x: T ): T {
	return x;
}

/**
 * Copy a directory structure.
 *
 * @param from   - Directory path to copy from.
 * @param to     - Directory path to copy to.
 * @param rename - Optional function to rename files.
 * @public
 */
export function copy(
	from: string,
	to: string,
	rename: ( basename: string ) => string = identity
) {
	if ( ! fs.existsSync( from ) ) return;

	const stats = fs.statSync( from );

	if ( stats.isDirectory() ) {
		fs.readdirSync( from ).forEach( ( file ) => {
			copy( path.join( from, file ), path.join( to, rename( file ) ) );
		} );
	} else {
		mkdirp( path.dirname( to ) );
		fs.copyFileSync( from, to );
	}
}
