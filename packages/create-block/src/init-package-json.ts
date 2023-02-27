/**
 * External dependencies
 */
import { join } from 'node:path';

import { command } from 'execa';
import npmPackageArg from 'npm-package-arg';
import writePkg from 'write-pkg';

/**
 * Internal dependencies
 */
import { info, error } from './log.js';
import type { Config } from './types.js';

export default async function initPackageJson( {
	author,
	description,
	license,
	pluginURI,
	slug,
	version,
	wpEnv,
	wpScripts,
	npmDependencies,
	npmDevDependencies,
	customScripts,
	isDynamicVariant,
	customPackageJSON,
}: { isDynamicVariant: boolean } & Config ) {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info( 'Creating a "package.json" file.' );

	await writePkg(
		cwd,
		Object.fromEntries(
			Object.entries( {
				name: slug,
				version,
				description,
				author,
				license,
				homepage: pluginURI,
				main: wpScripts && 'build/index.js',
				scripts: {
					...( wpScripts && {
						build: isDynamicVariant
							? 'wp-scripts build --webpack-copy-php'
							: 'wp-scripts build',
						format: 'wp-scripts format',
						'lint:css': 'wp-scripts lint-style',
						'lint:js': 'wp-scripts lint-js',
						'packages-update': 'wp-scripts packages-update',
						'plugin-zip': 'wp-scripts plugin-zip',
						start: isDynamicVariant
							? 'wp-scripts start --webpack-copy-php'
							: 'wp-scripts start',
					} ),
					...( wpEnv && { env: 'wp-env' } ),
					...customScripts,
				},
				...customPackageJSON,
			} ).filter( ( [ , value ] ) => !! value )
		)
	);

	/**
	 * Helper to determine if we can install this package.
	 *
	 * @param {string} packageArg The package to install.
	 */
	function checkDependency( packageArg: string ) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const type = npmPackageArg( packageArg ).type as string;
		if (
			! [ 'git', 'tag', 'version', 'range', 'remote' ].includes( type )
		) {
			throw new Error(
				`Provided package type "${ type }" is not supported.`
			);
		}
	}

	if ( wpScripts ) {
		if ( npmDependencies.length ) {
			info( '' );
			info(
				'Installing npm dependencies. It might take a couple of minutes...'
			);
			for ( const packageArg of npmDependencies ) {
				try {
					checkDependency( packageArg );
					info( '' );
					info( `Installing "${ packageArg }".` );
					await command( `npm install ${ packageArg }`, {
						cwd,
					} );
				} catch ( { message } ) {
					info( '' );
					info(
						`Skipping "${ packageArg }" npm dependency. Reason:`
					);
					error( message as string );
				}
			}
		}

		if ( npmDevDependencies.length ) {
			info( '' );
			info(
				'Installing npm devDependencies. It might take a couple of minutes...'
			);
			for ( const packageArg of npmDevDependencies ) {
				try {
					checkDependency( packageArg );
					info( '' );
					info( `Installing "${ packageArg }".` );
					await command( `npm install ${ packageArg } --save-dev`, {
						cwd,
					} );
				} catch ( { message } ) {
					info( '' );
					info(
						`Skipping "${ packageArg }" npm dev dependency. Reason:`
					);
					error( message as string );
				}
			}
		}
	}
}
