/**
 * Error type guard.
 *
 * @param error - Maybe an error.
 * @public
 */
export function isError( error: unknown ): error is NodeJS.ErrnoException {
	return error instanceof Error;
}
