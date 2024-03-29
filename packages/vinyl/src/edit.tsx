/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import {
	Disabled,
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
	ToolbarButton,
} from '@wordpress/components';
import { usePrevious } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { audio as icon, caption as captionIcon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classnames from 'classnames';

import './editor.scss';

import type { Props } from './types';

/**
 * Internal dependencies
 */

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

function VinylEdit( {
	attributes,
	className,
	setAttributes,
	isSelected,
}: BlockEditProps< Props > ) {
	const { id, caption, loop, preload, src } = attributes;
	const prevCaption = usePrevious( caption );
	const [ showCaption, setShowCaption ] = useState( !! caption );
	const isTemporaryAudio = ! id && isBlobURL( src );
	const mediaUpload = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore ) as {
			getSettings: any;
		};
		return getSettings().mediaUpload;
	}, [] );

	useEffect( () => {
		if ( ! id && isBlobURL( src ) ) {
			const file = getBlobByURL( src );

			if ( file ) {
				mediaUpload( {
					filesList: [ file ],
					onFileChange: ( [ media ] ) => onSelectAudio( media ),
					onError: ( e ) => onUploadError( e ),
					allowedTypes: ALLOWED_MEDIA_TYPES,
				} );
			}
		}
	}, [] );

	// We need to show the caption when changes come from
	// history navigation(undo/redo).
	useEffect( () => {
		if ( caption && ! prevCaption ) {
			setShowCaption( true );
		}
	}, [ caption, prevCaption ] );

	// Focus the caption when we click to add one.
	const captionRef = useCallback(
		( node: HTMLElement | null ) => {
			if ( node && ! caption ) {
				node.focus();
			}
		},
		[ caption ]
	);

	useEffect( () => {
		if ( ! isSelected && ! caption ) {
			setShowCaption( false );
		}
	}, [ isSelected, caption ] );

	function toggleAttribute( attribute: any ) {
		return ( newValue: any ) => {
			setAttributes( { [ attribute ]: newValue } );
		};
	}

	function onSelectURL( newSrc: string ): void {
		// Set the block's src from the edit component's state, and switch off
		// the editing UI.
		if ( newSrc !== src ) {
			setAttributes( { src: newSrc, id: undefined } );
		}
	}

	const { createErrorNotice } = useDispatch( noticesStore );
	function onUploadError( message: string ) {
		createErrorNotice( message, { type: 'snackbar' } );
	}

	function onSelectAudio( media: any ) {
		if ( ! media?.url ) {
			// In this case there was an error and we should continue in the editing state
			// previous attributes should be removed because they may be temporary blob urls.
			setAttributes( {
				src: undefined,
				id: undefined,
				caption: undefined,
			} );
			return;
		}
		// Sets the block's attribute and updates the edit component from the
		// selected media, then switches off the editing UI.
		setAttributes( {
			src: media.url,
			id: media.id,
			caption: media.caption,
		} );
	}

	const classes = classnames( className, {
		'is-transient': isTemporaryAudio,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	if ( ! src ) {
		return (
			<div { ...blockProps }>
				<MediaPlaceholder
					icon={ <BlockIcon icon={ icon } /> }
					onSelect={ onSelectAudio }
					onSelectURL={ onSelectURL }
					accept="audio/*"
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ attributes }
					onError={ onUploadError }
				/>
			</div>
		);
	}

	return (
		<>
			<BlockControls group="block">
				<ToolbarButton
					onClick={ () => {
						setShowCaption( ! showCaption );
						if ( showCaption && caption ) {
							setAttributes( { caption: undefined } );
						}
					} }
					icon={ captionIcon }
					isPressed={ showCaption }
					label={
						showCaption
							? __( 'Remove caption' )
							: __( 'Add caption' )
					}
				/>
			</BlockControls>
			<BlockControls group="other">
				<MediaReplaceFlow
					mediaId={ id }
					mediaURL={ src }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept="audio/*"
					onSelect={ onSelectAudio }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						label={ __( 'Loop' ) }
						onChange={ toggleAttribute( 'loop' ) }
						checked={ loop }
					/>
					<SelectControl
						label={ _x( 'Preload', 'noun; Audio block parameter' ) }
						value={ preload || '' }
						// `undefined` is required for the preload attribute to be unset.
						onChange={ ( value ) =>
							setAttributes( {
								preload: value || undefined,
							} )
						}
						options={ [
							{ value: '', label: __( 'Browser default' ) },
							{ value: 'auto', label: __( 'Auto' ) },
							{ value: 'metadata', label: __( 'Metadata' ) },
							{
								value: 'none',
								label: _x( 'None', 'Preload value' ),
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				{ /*
					Disable the audio tag if the block is not selected
					so the user clicking on it won't play the
					file or change the position slider when the controls are enabled.
				*/ }
				{ isSelected ? (
					<audio controls src={ src } />
				) : (
					<Disabled>
						<audio controls src={ src } />
					</Disabled>
				) }
				{ isTemporaryAudio && <Spinner /> }
				{ showCaption &&
					( ! RichText.isEmpty( caption ) || isSelected ) && (
						<RichText
							identifier="caption"
							tagName="figcaption"
							ref={ captionRef }
							aria-label={ __( 'Audio caption text' ) }
							placeholder={ __( 'Add caption' ) }
							value={ caption }
							onChange={ ( value ) =>
								setAttributes( { caption: value } )
							}
							inlineToolbar
						/>
					) }
			</figure>
		</>
	);
}

export default VinylEdit;
