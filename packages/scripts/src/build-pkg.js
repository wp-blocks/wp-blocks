import buildEsm from './copy-esm.js';
import buildTypes from './run-api-extractor.js';
import buildCompile from './run-tsc.js';
import { exec } from './utils/exec.js';

/**
 * @param {Object}  options       - The options for `api-extractor`
 * @param {boolean} options.local - Local development flag.
 */
export default async function ( options ) {
	if ( ! options.local ) {
		await exec( 'pnpm', [ 'run', 'clean:all' ] );
	}
	try {
		await buildCompile( options );
		buildEsm();
		await buildTypes( options );
	} catch ( code ) {
		process.exit( code );
	}
	process.exit( 0 );
}
