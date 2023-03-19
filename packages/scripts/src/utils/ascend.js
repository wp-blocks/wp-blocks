import { readdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * @template T
 * @typedef {(files: string[], cwd: string) => T|undefined} AscendFn
 */

/**
 * Ascend up the file tree.
 *
 * Stop ascending and return the value from `cb` if it returns a value;
 *
 * @template T
 * @param {AscendFn<T>} fn  - Callback function.
 * @param {string}      cwd - The directory to ascend from.
 * @returns {Promise<T|undefined>} The value of the callback function if a value is returned.
 */
export async function ascend( fn, cwd = process.cwd() ) {
	const files = await readdir( cwd );
	const result = fn( files, cwd );
	if ( result !== undefined ) return result;
	const parent = path.join( cwd, '../' );
	if ( parent === cwd ) return undefined;
	return ascend( fn, parent );
}
