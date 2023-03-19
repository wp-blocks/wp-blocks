import { exec } from './utils/exec.js';

/**
 * @param {Object}  options       - The options for `api-extractor`
 * @param {boolean} options.local - Local development flag.
 */
export default async function ( options ) {
	if ( options.local ) {
		await exec( 'pnpm', [ 'clean:all' ] );
	}
	try {
		await exec( 'pnpm', [ 'build:compile' ] );
		await exec( 'pnpm', [ 'build:esm' ] );
		await exec( 'pnpm', [ 'build:types' ] );
	} catch ( code ) {
		process.exit( code );
	}
	process.exit( 0 );
}
