declare module '@wordpress/block-library' {
	export * from '@types/wordpress__block-library';
}

declare module '@wordpress/block-library/src/embed/util' {
	// import type { BlockType } from '@wordpress/blocks';
	/**
	 * Creates a more suitable embed block based on the passed in props
	 * and attributes generated from an embed block's preview.
	 *
	 * We require `attributesFromPreview` to be generated from the latest attributes
	 * and preview, and because of the way the react lifecycle operates, we can't
	 * guarantee that the attributes contained in the block's props are the latest
	 * versions, so we require that these are generated separately.
	 * See `getAttributesFromPreview` in the generated embed edit component.
	 */
	export function createUpgradedEmbedBlock(
		/**
		 * The block's props.
		 */
		props: Record<string, unknown>,

		/**
		 * Attributes generated from the block's most up to date preview.
		 */
		attributesFromPreview?: Record<string, unknown>
	): Record<string, unknown> | undefined;
}
