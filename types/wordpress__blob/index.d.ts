declare module '@wordpress/blob' {
	export * from '@wordpress/blob';

	// The problem with the originals was the `url` parameter wasn't typed as possibly
	// `undefined` but that is how the functions are used, and also how they are implemented.

	/**
	 * Create a blob URL from a file.
	 *
	 * @param file The file to create a blob URL for.
	 *
	 * @return The blob URL.
	 */
	export function createBlobURL(file: File): string;

	/**
	 * Retrieve a file based on a blob URL. The file must have been created by
	 * `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return
	 * `undefined`.
	 *
	 * @param url The blob URL.
	 *
	 * @return The file for the blob URL.
	 */
	export function getBlobByURL(url?: string): File | undefined;

	/**
	 * Retrieve a blob type based on URL. The file must have been created by
	 * `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return
	 * `undefined`.
	 *
	 * @param url The blob URL.
	 *
	 * @return The blob type.
	 */
	export function getBlobTypeByURL(url?: string): string | undefined;

	/**
	 * Remove the resource and file cache from memory.
	 *
	 * @param url The blob URL.
	 */
	export function revokeBlobURL(url?: string): void;

	/**
	 * Check whether a url is a blob url.
	 *
	 * @param url The URL.
	 *
	 * @return Is the url a blob url?
	 */
	export function isBlobURL(url?: string): boolean;
}
