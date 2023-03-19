import { exec } from './utils/exec.js';

/**
 * Run `tsc`.
 *
 * @param {Object}  options       - The options for `tsc`
 * @param {boolean} options.local - Local development flag.
 */
export default async function ( { local = true } ) {
	const tsConfigPath = local ? [ 'tsconfig.dev.json' ] : [];
	const tscArgs = [ '--build', ...tsConfigPath ];
	const pnpmArgs = [ 'tsc', ...tscArgs ];
	console.log( pnpmArgs.join( ' ' ) );
	return exec( 'pnpm', pnpmArgs ).catch( ( code ) => {
		process.exit( code );
	} );
}
