declare module '@wordpress/blocks' {
	export * from '@types/wordpress__blocks';

	export interface BlockSaveProps<
		Attributes extends Record<string, unknown>
	> {
		className: string;
		attributes: Attributes;
	}

	/**
	 * Details in  gutenberg/packages/block-editor/src/components/block-list/block.js
	 *
	 * Still a lot to figure out.
	 */
	export interface BlockEditProps<Attributes extends Record<string, unknown>>
		extends BlockSaveProps<Attributes> {
		name: string;
		isSelected: boolean;
		setAttributes: (attrs: Partial<Attributes>) => void;
		insertBlocksAfter?: any;
		onReplace?: (...args: unknown[]) => unknown;
		onRemove?: (...args: unknown[]) => unknown;
		mergeBlocks?: (...args: unknown[]) => unknown;
		clientId: string;
		isSelectionEnabled: boolean;
		toggleSelection: unknown;

		/**
		 * TODO Find reference
		 */
		context: Record<string, unknown>;
	}
}
