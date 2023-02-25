/**
 * External dependencies
 */
import { join } from 'path';

import { command } from 'execa';

/**
 * Internal dependencies
 */
import { info } from './log.js';
import { Config } from './types.js';

export default async function initWpScripts( { slug }: Config ) {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info(
		'Installing `@wordpress/scripts` package. It might take a couple of minutes...'
	);
	await command( 'npm install @wordpress/scripts --save-dev', {
		cwd,
	} );

	info( '' );
	info( 'Formatting JavaScript files.' );
	await command( 'npm run format', {
		cwd,
	} );

	info( '' );
	info( 'Compiling block.' );
	await command( 'npm run build', {
		cwd,
	} );
}
