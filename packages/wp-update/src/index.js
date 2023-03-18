import fetch from 'node-fetch';

const ROOT_URL = 'https://github.com/WordPress/gutenberg/raw';

/**
 * Fetch a list of all `@wordpress` packages in a release of Gutenberg
 *
 * @param {string} release The release of Gutenberg to target.
 * @return {Promise<Record<string, string>>} The `@wordpress` dependencies object of the Gutenberg monorepo.
 * @public
 */
export async function fetchVersions( release ) {
	const baseUrl = ROOT_URL + `/release/${ release }`;
	const pkg = await fetchJsonFile( `${ baseUrl }/package.json` );
	const deps = parseDependencies( pkg );
	if ( ! deps ) {
		throw new Error( 'unable to fetch package.json from Gutenberg repo' );
	}
	const pkgs = await Promise.all(
		deps.map( ( packagePath ) =>
			fetchJsonFile( `${ baseUrl }/${ packagePath }/package.json` )
		)
	);
	/** @type {Record<string, string>} */
	const result = {};
	for ( const { name, version } of pkgs ) {
		result[ name ] = version;
	}
	return result;
}

/**
 * Fetch a raw JSON file.
 *
 * @param {string} url The url of the raw JSON file.
 */
async function fetchJsonFile( url ) {
	const response = await fetch( url );
	const text = await response.text();
	const json = JSON.parse( text );
	return json;
}

/**
 * Parse `@wordpress` packages paths from the Gutenberg `package.json`.
 *
 * @param {Record<string, any>} pkg
 * @return {string[]|undefined} The paths to all the `@wordpress` packages of the monorepo
 */
function parseDependencies( pkg ) {
	if ( pkg.dependencies ) {
		return Object.entries( pkg.dependencies )
			.filter( ( [ packageName ] ) =>
				packageName.startsWith( '@wordpress' )
			)
			.map( ( [ , packagePath ] ) => packagePath.replace( 'file:', '' ) );
	}
}
