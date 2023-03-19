import { exec } from './utils/exec.js';
import { findExec } from './utils/find-exec.js';

/**
 * Run `api-extractor`.
 *
 * @param {Object}  options       - The options for `api-extractor`
 * @param {boolean} options.local - Local development flag.
 */
export default async function ( { local = true } ) {
	const apiExtractorPath = await findExec( 'api-extractor' );

	// When in CI, `api-extractor` shouldn't apply the local flag. This script will
	// error if an API change occurs without being committed in an `api.md` file.
	const localFlag = local ? [ '--local' ] : [];

	/**
	 * ApiExtractor CLI arguments.
	 */
	const apiExtractorArgs = [ 'run', ...localFlag ];

	console.log( `api-extractor ${ apiExtractorArgs.join( ' ' ) }` );

	exec( apiExtractorPath, apiExtractorArgs )
		.then( () => process.exit( 0 ) )
		.catch( ( code ) => {
			process.exit( code );
		} );
}
