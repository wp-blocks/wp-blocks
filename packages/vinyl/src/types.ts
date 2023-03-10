import type { Transform } from '@wordpress/blocks';

export interface Props {
	autoplay: boolean;
	caption: string;
	id: number;
	loop: boolean;
	src: string;
	preload: string;
}

/**
 * This isn't currently in `@types/wordpress__blocks`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Transforms< T extends Record< string, any > > {
	/**
	 * Transforms from another block type to this block type.
	 */
	readonly from?: readonly Transform< T >[] | undefined;
	/**
	 * Transforms from this block type to another block type.
	 */
	readonly to?: readonly Transform[] | undefined;
}
