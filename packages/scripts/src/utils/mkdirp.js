import fs from 'node:fs';

/** @param {string} dir */
export function mkdirp( dir ) {
	try {
		fs.mkdirSync( dir, { recursive: true } );
	} catch ( e ) {
		if ( e.code === 'EEXIST' ) return;
		throw e;
	}
}
