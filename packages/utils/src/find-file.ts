import path from 'node:path';

import { ascend } from './ascend.js';

/**
 * Ascend the file tree to find a specific file.
 *
 * Intended use is to find the `package.json` file of a Node.js project.
 *
 * @param fileName Either a string of the file name to find or a `RegExp`.
 * @returns The absolute path of the file or `undefined`.
 */
export function fileFile(
	fileName: string | RegExp
): Promise< string | undefined > {
	if ( typeof fileName === 'string' ) {
		return ascend( ( files, cwd ) => {
			if ( files.includes( fileName ) ) {
				return path.join( cwd, fileName );
			}
			return undefined;
		} );
	}
	return ascend( ( files, cwd ) => {
		for ( const file of files ) {
			if ( fileName.test( file ) ) {
				return path.join( cwd, file );
			}
		}
		return undefined;
	} );
}
