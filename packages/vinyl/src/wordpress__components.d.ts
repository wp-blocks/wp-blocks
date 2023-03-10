export module '@wordpress/components' {
	export namespace Disabled {
		interface Props {
			children?: never | undefined;

			/**
			 * Whether to disable all the descendant fields. Defaults to `true`.
			 */
			isDisabled?: boolean;

		}
	}
}
