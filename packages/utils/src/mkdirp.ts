import fs from 'node:fs';

import { isError } from './is-error.js';

/**
 * Recursively create directory path.
 *
 * @param dir - Directory path to create.
 * @public
 */
export function mkdirp( dir: string ) {
	try {
		fs.mkdirSync( dir, { recursive: true } );
	} catch ( e ) {
		if ( isError( e ) && e.code === 'EEXIST' ) return;
		throw e;
	}
}
