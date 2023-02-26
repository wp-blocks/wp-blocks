/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import type { WPElement } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import Counter from './counter';
import type { Props } from './types';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param props
 * @param props.attributes
 * @param props.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
}: BlockEditProps< Props > ): WPElement {
	const blockProps = useBlockProps();

	let { count } = attributes;

	if ( typeof count !== 'number' ) count = 0;

	const setCount = ( value: number ) => {
		setAttributes( { count: value } );
	};

	return (
		<div { ...blockProps }>
			<Counter count={ count } setCount={ setCount } />
		</div>
	);
}
