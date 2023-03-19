import { exec } from './utils/exec.js';
import { findExec } from './utils/find-exec.js';

/**
 * Run `tsc`.
 *
 * @param {Object}  options       - The options for `tsc`
 * @param {boolean} options.local - Local development flag.
 */
export default async function ( { local = true } ) {
	const tscPath = await findExec( 'tsc' );
	const tsConfigPath = local ? [ 'tsconfig.dev.json' ] : [];

	const tscArgs = [ '--build', ...tsConfigPath ];

	console.log( `tsc ${ tscArgs.join( ' ' ) }` );

	await exec( tscPath, tscArgs )
		.then( () => {
			process.exit( 0 );
		} )
		.catch( ( code ) => {
			process.exit( code );
		} );
}
