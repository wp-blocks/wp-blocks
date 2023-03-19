import { exec } from './utils/exec.js';
import { findExec } from './utils/find-exec.js';

/**
 * Run `api-documenter`.
 */
export default async function () {
	const apiDocumenterPath = await findExec( 'api-documenter' );

	/**
	 * ApiDocumenter CLI arguments.
	 */
	const apiDocumenterArgs = [ 'markdown', '-i', './temp', '-o', './docs' ];

	console.log( `api-documenter ${ apiDocumenterArgs.join( ' ' ) }` );

	exec( apiDocumenterPath, apiDocumenterArgs )
		.then( () => process.exit( 0 ) )
		.catch( ( code ) => {
			process.exit( code );
		} );
}
