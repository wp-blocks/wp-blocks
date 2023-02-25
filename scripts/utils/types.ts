export type JsonValue =
	| string
	| number
	| boolean
	| { [ x: string ]: JsonValue }
	| JsonValue[];

export type JsonObject = Record< string, JsonValue >;
export type JsonArray = JsonValue[];
