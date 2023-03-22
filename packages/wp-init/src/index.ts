/* eslint-disable no-console */
import { readFileSync } from 'node:fs';

import { intro, outro, confirm, spinner } from '@clack/prompts';
import { findFile, type JsonObject } from '@wp-blocks/utils';
import pc from 'picocolors';

/**
 * @public
 */
export async function main() {
	intro( `wp-init` );

	const pkgFilePath = await findFile( 'package.json' );

	if ( ! pkgFilePath ) {
		console.error(
			pc.red( 'Unable to locate a package.json' ),
			'Are you inside a Node.js package?'
		);
		process.exit( 1 );
	}

	const raw = readFileSync( pkgFilePath, { encoding: 'utf-8' } );
	const pkg = JSON.parse( raw ) as JsonObject;

	const shouldContinue = await confirm( {
		message: `Scaffolding package "${
			pkg.name as string
		}", is this correct?"`,
	} );

	if ( shouldContinue ) {
		const s = spinner();
		s.start( 'do-block...' );
		await wait( 2000 );
		s.stop( '💩' );
	}

	outro( `You're all set!` );
}

/**
 * @param ms
 * @internal
 */
function wait( ms: number ): Promise< void > {
	return new Promise( ( resolve ) => {
		setTimeout( () => {
			resolve();
		}, ms );
	} );
}
