/**
 * Object type guard.
 *
 * @param input - Maybe an object.
 * @public
 */
export const isObject = (
	input: unknown
): input is Record< string, unknown > => {
	return (
		typeof input === 'object' && input !== null && ! Array.isArray( input )
	);
};
