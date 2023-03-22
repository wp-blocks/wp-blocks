import { readdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * @public
 */
export type Ascender< T > = (
	files: string[],
	cwd: string
) => Promise< T | undefined > | T | undefined;

/**
 * Ascend up the file tree.
 *
 * Stop ascending and return the value from `cb` if it returns a value;
 *
 * @param cb  - Callback function.
 * @param cwd - The directory to ascend from.
 * @returns The value of the callback function if a value is returned.
 * @public
 */
export async function ascend< T >(
	cb: Ascender< T >,
	cwd: string = process.cwd()
): Promise< T | undefined > {
	const files = await readdir( cwd );
	const result = await Promise.resolve( cb( files, cwd ) );
	if ( result !== undefined ) return result;
	const parent = path.join( cwd, '../' );
	if ( parent === cwd ) return undefined;
	return ascend( cb, parent );
}
