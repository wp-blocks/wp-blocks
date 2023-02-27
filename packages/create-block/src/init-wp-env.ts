/**
 * External dependencies
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { command } from 'execa';

/**
 * Internal dependencies
 */
import { info } from './log';
import { Config } from './types';

export default async function initWpEnv( { slug }: Config ) {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info(
		'Installing `@wordpress/env` package. It might take a couple of minutes...'
	);
	await command( 'npm install @wordpress/env --save-dev', {
		cwd,
	} );

	info( '' );
	info( 'Configuring `@wordpress/env`...' );
	await writeFile(
		join( cwd, '.wp-env.json' ),
		JSON.stringify(
			{
				core: 'WordPress/WordPress',
				plugins: [ '.' ],
			},
			null,
			'\t'
		)
	);
}
