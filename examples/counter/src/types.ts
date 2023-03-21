export interface Props {
	count: number;

	[ key: string ]: unknown; // not sure why this is necessary
	// Index signature for type 'string' is missing in type 'Props'.
	// examples/counter/src/save.tsx(19,20): error TS2344: Type 'Props' does not satisfy the constraint 'Record<string, unknown>'.
}
