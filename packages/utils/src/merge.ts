import { isObject } from './is-object.js';

/**
 * Merge two objects.
 *
 * Intended for merging `package.json` data.
 *
 * @param target - Target object to merge into.
 * @param source - Source object to copy from.
 * @public
 */
export function merge(
	target: Record< string, unknown >,
	source: Record< string, unknown >
) {
	for ( const key in source ) {
		if ( key in target ) {
			const targetValue = target[ key ]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
			const sourceValue = source[ key ]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

			if (
				typeof sourceValue !== typeof targetValue ||
				Array.isArray( sourceValue ) !== Array.isArray( targetValue )
			) {
				throw new Error( 'Mismatched values' );
			}

			if ( isObject( targetValue ) && isObject( sourceValue ) ) {
				merge( targetValue, sourceValue );
			} else {
				target[ key ] = sourceValue;
			}
		} else {
			target[ key ] = source[ key ];
		}
	}
}
