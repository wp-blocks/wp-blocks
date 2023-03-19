import { exec } from './utils/exec.js';

/**
 * Run `api-documenter`.
 */
export default function () {
	const apiDocumenterArgs = [ 'markdown', '-i', 'temp', '-o', 'docs' ];
	const pnpmArgs = [ 'api-documenter', ...apiDocumenterArgs ];
	console.log( pnpmArgs.join( ' ' ) );
	return exec( 'pnpm', pnpmArgs ).catch( ( code ) => {
		process.exit( code );
	} );
}
