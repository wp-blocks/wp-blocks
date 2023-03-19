import fs from 'node:fs';
import path from 'node:path';

import { mkdirp } from './mkdirp.js';

/**
 * @param {string}                        from
 * @param {string}                        to
 * @param {(basename: string) => boolean} predicate
 */
export function copy( from, to, predicate ) {
	if ( ! fs.existsSync( from ) ) return;

	const stats = fs.statSync( from );

	if ( stats.isDirectory() ) {
		fs.readdirSync( from ).forEach( ( file ) => {
			copy( path.join( from, file ), path.join( to, file ), predicate );
		} );
	} else if ( predicate( from ) ) {
		mkdirp( path.dirname( to ) );
		fs.copyFileSync( from, to );
	}
}
