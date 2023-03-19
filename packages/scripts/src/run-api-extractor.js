import { exec } from './utils/exec.js';

/**
 * Run `api-extractor`.
 *
 * @param {Object}  options       - The options for `api-extractor`
 * @param {boolean} options.local - Local development flag.
 */
export default function ( { local = true } ) {
	// When in CI, `api-extractor` shouldn't apply the local flag. This script will
	// error if an API change occurs without being committed in an `api.md` file.
	const localFlag = local ? [ '--local' ] : [];
	const apiExtractorArgs = [ 'run', ...localFlag ];
	const pnpmArgs = [ 'api-extractor', ...apiExtractorArgs ];
	console.log( pnpmArgs.join( ' ' ) );
	return exec( 'pnpm', pnpmArgs ).catch( ( code ) => {
		process.exit( code );
	} );
}
