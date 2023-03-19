/**
 * JSON value type.
 *
 * @public
 */
export type JsonValue =
	| string
	| number
	| boolean
	| { [ x: string ]: JsonValue }
	| JsonValue[];

/**
 * JSON object type.
 *
 * @public
 */
export type JsonObject = Record< string, JsonValue >;

/**
 * JSON array type.
 *
 * @public
 */
export type JsonArray = JsonValue[];
