import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';

import './style.scss';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import type { Props } from './types';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata as BlockConfiguration< Props >, {
	/**
	 * @see {@link ./edit.js}
	 */
	edit,

	/**
	 * @see {@link ./save.js}
	 */
	save,
} );
