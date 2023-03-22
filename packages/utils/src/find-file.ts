import fs from 'node:fs/promises';
import path from 'node:path';

import { ascend } from './ascend.js';

/**
 * Ascend the file tree to find a specific file.
 *
 * Intended use is to find the `package.json` file of a Node.js project.
 *
 * @param fileName - Either a string of the file name to find or a `RegExp`.
 * @returns The absolute path of the file or `undefined`.
 * @public
 */
export function findFile(
	fileName: string | RegExp
): Promise< string | undefined > {
	if ( typeof fileName === 'string' ) {
		return ascend( async ( files, cwd ) => {
			if ( files.includes( fileName ) ) {
				const filePath = path.join( cwd, fileName );
				if ( await isFile( filePath ) ) return filePath;
			}
			return undefined;
		} );
	}
	return ascend( async ( files, cwd ) => {
		for ( const file of files ) {
			if ( fileName.test( file ) ) {
				const filePath = path.join( cwd, file );
				if ( await isFile( filePath ) ) return filePath;
			}
		}
	} );
}

async function isFile( filePath: string ): Promise< boolean > {
	const stats = await fs.stat( filePath );
	return stats.isFile();
}
