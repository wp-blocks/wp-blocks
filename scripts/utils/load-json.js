/**
 * @typedef {import('./types').JsonValue} JsonValue
 * @typedef {import('./types').JsonObject} JsonObject
 */

import fs from 'node:fs/promises';

/**
 * Load a JSON file from a path.
 *
 * @param {string} filePath - The path from which to attempt to load JSON data.
 * @return {Promise<JsonValue | null>} The JSON data or null.
 */
export async function loadJson( filePath ) {
	const raw = await fs.readFile( filePath, { encoding: 'utf-8' } );
	try {
		/** @type {JsonValue} */
		const value = JSON.parse( raw );
		return value;
	} catch ( error ) {
		console.error( error );
		return null;
	}
}

/** @type {(value: unknown) => value is JsonObject} */
export const isJsonObject = function ( value ) {
	return ! Array.isArray( value ) && value === Object( value );
};
