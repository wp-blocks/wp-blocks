declare module '@wordpress/block-editor' {
	export * from '@types/wordpress__block-editor';

	namespace MediaReplaceFlow {
		interface Props {
			children?: never | undefined;

			/**
			 * The URL of the media.
			 */
			mediaURL: string;

			/**
			 * The Id of the attachment post type for the current media.
			 */
			mediaId?: number;

			/**
			 * A list of media types allowed to replace the current media.
			 *
			 * @todo
			 */
			allowedTypes: string[];

			/**
			 * Comma delimited list of MIME types accepted for upload.
			 */
			accept: string;

			/**
			 * Callback called before to start to upload the files. It receives an array
			 * with the files to upload before to the final process.
			 */
			onFilesUpload: (files: File[]) => void;

			/**
			 * Callback used when media is replaced from the Media Library or when a new
			 * media is uploaded. It is called with one argument `media` which is an
			 * object with all the media details.
			 * @todo
			 */
			onSelect: (media: unknown) => void;

			/**
			 * Callback used when media is replaced with an URL. It is called with one
			 * argument `newURL` which is a string containing the new URL.
			 */
			onSelectURL?: (newUrl: string) => void;

			/**
			 * Callback called when an upload error happens and receives an error message
			 * as an argument.
			 */
			onError?: (error: string) => void;

			/**
			 * The label of the replace button.
			 */
			name?: string;

			/**
			 * Creates a media replace notice.
			 *
			 * @todo
			 */
			createNotice?: () => void;

			/**
			 * Removes a media replace notice.
			 *
			 * @todo
			 */
			removeNotice?: () => void;
		}
	}

	/**
	 * A component that implements a replacement flow for various media objects. It is
	 * used to allow various blocks that use media to have a toolbar button for
	 * replacing it. I offers several options, such as:
	 * - replace from Media Library
	 * - replace using an URL
	 * - replace by uploading new media
	 *
	 * This component should be used as a child of a <BlockControls> component.
	 */
	export function MediaReplaceFlow(
		props: MediaReplaceFlow.Props
	): JSX.Element;
}
