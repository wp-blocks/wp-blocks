import fs from 'node:fs';
import path from 'node:path';

import { ascend } from './ascend.js';

/**
 * Find executable in `node_module` directory of monorepo.
 *
 * @param {string}  name   - The executable to find.
 * @param {boolean} isRoot - Is the current working directory the root of the monorepo.
 * @returns {Promise<string>} The path of the executable.
 */
export async function findExec( name, isRoot = false ) {
	const rootDir = await ascend(
		( files, cwd ) => {
			if ( files.includes( 'node_modules' ) ) {
				return cwd;
			}
		},
		isRoot ? process.cwd() : path.join( process.cwd(), '../' )
	);
	if ( ! rootDir ) {
		throw new Error( 'Could not find root level node_modules directory' );
	}
	const execPath = path.join( rootDir, 'node_modules', '.bin', name );
	if ( ! fs.existsSync( execPath ) ) {
		throw new Error(
			`Could not find executable '${ name }', is it installed?`
		);
	}
	return execPath;
}
