import fs from 'node:fs';

/**
 * Remove a file.
 *
 * @param path - The file path to remove.
 * @public
 */
export function rimraf( path: string ) {
	( fs.rmSync || fs.rmdirSync )( path, { recursive: true, force: true } ); // eslint-disable-line @typescript-eslint/no-unnecessary-condition
}
