import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import type { WPElement } from '@wordpress/element';

import './editor.scss';

import Hello from './hello';
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
	const { name } = attributes;

	const setName = ( value: string ) => {
		setAttributes( { name: value } );
	};

	return (
		<div { ...useBlockProps() }>
			<Hello name={ name } />
		</div>
	);
}
