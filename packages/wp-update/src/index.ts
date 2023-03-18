/* eslint-disable no-console */
import fetch from 'node-fetch';
import pc from 'picocolors';

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

/**
 * Options interface for {@link updateDependencies}.
 *
 * @public
 */
export interface UpdateOptions {
	dev?: true;
}

/**
 * TODO move to `@wp-blocks/utils`
 * https://stackoverflow.com/a/69328045/3586344
 */
type WithRequired< T, K extends keyof T > = T & { [ P in K ]-?: T[ P ] };

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
	const result = { ...pkg } as WithRequired<
		PackageJson,
		'dependencies' | 'devDependencies'
	>;
	let updated = false;

	const deps = await fetchVersions( release, options );

	for ( const [ name, version ] of Object.entries( deps ) ) {
		if ( pkg.dependencies?.[ name ] ) {
			const status = maybeUpdate( {
				name,
				version,
				input: pkg.dependencies,
				output: result.dependencies,
			} );
			updated = updated || status;
		}
		/**
		 * This is conceptually separate than the `-D` option. This is updating the
		 * versions in the local `package.json` to match the target, which optionally
		 * could include the `devDependencies` of the Gutenberg release.
		 */
		if ( pkg.devDependencies?.[ name ] ) {
			const status = maybeUpdate( {
				name,
				version,
				input: pkg.devDependencies,
				output: result.devDependencies,
			} );
			updated = updated || status;
		}
	}

	if ( updated ) {
		return result as PackageJson;
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

/**
 * Maybe update dependency.
 *
 * @param context         - The context object.
 * @param context.name    - The name of the dependency.
 * @param context.version - The target version of the dependency.
 * @param context.input   - The original dependencies object.
 * @param context.output  - The updated dependencies object.
 */
function maybeUpdate( context: {
	name: string;
	version: string;
	input: Record< string, string >;
	output: Record< string, string >;
} ): boolean {
	const { name, version, input, output } = context;
	if ( input[ name ] !== version ) {
		const current = input[ name ];
		output[ name ] = version;
		console.log(
			pc.green( `${ name }@${ version }` ) +
				pc.gray( ` Updated from v${ current }` )
		);
		return true;
	}
	console.log( pc.gray( `${ name }@${ version } Matches current version` ) );
	return false;
}
