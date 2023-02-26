/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';
import type { WPElement } from '@wordpress/element';

import { Props } from './types';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param props            - The block save props.
 * @param props.attributes
 * @return Element to render.
 */
export default function save( {
	attributes,
}: BlockSaveProps< Props > ): WPElement {
	const { count } = attributes;

	return <p { ...useBlockProps.save() }>{ `Counter value: ${ count }` }</p>;
}
