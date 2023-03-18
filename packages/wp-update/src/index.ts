/* eslint-disable no-console */
import fetch from 'node-fetch';

const ROOT_URL = 'https://github.com/WordPress/gutenberg/raw';

/**
 * Interface for required `package.json` properties used by this package.
 *
 * @public
 */
export interface PackageJson {
	name: string;
	version: string;
	dependencies?: Record< string, string >;
	devDependencies?: Record< string, string >;

	[ key: string ]: unknown;
}

export interface UpdateOptions {
	dev?: true;
}

/**
 * Update dependencies objects of `package.json`.
 *
 * @param pkg     - The `package.json` object to update list.
 * @param release - The release of Gutenberg to target.
 * @param options - The update options.
 * @returns The updated `package.json` object or undefined if there were no updates.
 * @public
 */
export async function updateDependencies(
	pkg: PackageJson,
	release: string,
	options: UpdateOptions = {}
): Promise< PackageJson | undefined > {
	const result: PackageJson = { ...pkg };
	let updated = false;

	const deps = await fetchVersions( release, options );

	if ( pkg.dependencies ) {
		for ( const [ name, version ] of Object.entries( deps ) ) {
			if (
				pkg.dependencies[ name ] &&
				pkg.dependencies[ name ] !== version
			) {
				console.log( `Updating ${ name }@${ version }` );
				pkg.dependencies[ name ] = version;
				updated = true;
			}
			/**
			 * This is conceptually separate than the `-D` option. This is updating the
			 * versions in the local `package.json` to match the target, which optionally
			 * could include the `devDependencies` of the Gutenberg release.
			 */
			if (
				pkg.devDependencies?.[ name ] &&
				pkg.devDependencies[ name ] !== version
			) {
				console.log( `Updating ${ name }@${ version }` );
				pkg.devDependencies[ name ] = version;
				updated = true;
			}
		}
	}
	if ( updated ) {
		return result;
	}
}

/**
 * Fetch a list of all `@wordpress` packages in a release of Gutenberg
 *
 * @param release - The release of Gutenberg to target.
 * @param options - The update options.
 * @returns The `@wordpress` dependencies object of the Gutenberg monorepo.
 * @public
 */
export async function fetchVersions(
	release: string,
	options: UpdateOptions = {}
): Promise< Record< string, string > > {
	const baseUrl = ROOT_URL + `/release/${ release }`;
	const url = `${ baseUrl }/package.json`;
	const pkg = await fetchJsonFile( url ).catch( ( error ) => {
		console.error( `Unable to fetch "${ url }"` );
		throw error;
	} );
	const deps = extractDependencies( pkg, options );
	const pkgs = await Promise.all(
		deps.map( ( packagePath: string ) =>
			fetchJsonFile( `${ baseUrl }/${ packagePath }/package.json` )
		)
	);
	const result: Record< string, string > = {};
	for ( const { name, version } of pkgs ) {
		result[ name ] = version;
	}
	return result;
}

/**
 * Fetch a raw JSON file.
 *
 * @param url - The url of the raw JSON file.
 */
async function fetchJsonFile( url: string ) {
	const response = await fetch( url );
	const text = await response.text();
	const json = JSON.parse( text );
	return json;
}

/**
 * Extract `@wordpress` packages paths from the Gutenberg `package.json`.
 *
 * @param pkg     - The `package.json` object to extract a dependency list.
 * @param options - The update options.
 * @returns The relative paths to all the `@wordpress` packages of the monorepo
 */
function extractDependencies(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pkg: Record< string, any >,
	options: UpdateOptions = {}
): string[] {
	let result: string[] = [];
	if ( pkg.dependencies ) {
		result = filterPackages( pkg.dependencies );
	}
	/**
	 * Typically `devDependencies` can be at the latest versions, though can optionally
	 * be updated to match target as well.
	 */
	if ( options.dev && pkg.devDependencies ) {
		result = [ ...result, ...filterPackages( pkg.devDependencies ) ];
	}
	return result;
}

/**
 * Collect `@wordpress` package paths from `dependencies` object.
 *
 * @param dependencies Dependencies object from a package.json
 * @returns Array package paths in the monorepo.
 */
function filterPackages( dependencies: Record< string, string > ): string[] {
	return Object.entries( dependencies )
		.filter( ( [ packageName ] ) => packageName.startsWith( '@wordpress' ) )
		.map( ( [ , packagePath ] ) => packagePath.replace( 'file:', '' ) );
}
