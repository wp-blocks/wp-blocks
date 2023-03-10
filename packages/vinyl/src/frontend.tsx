import { render } from '@wordpress/element';

window.addEventListener( 'load', () => {
	const container = document.querySelector( '.wp-block-vinyl' );

	// Ensure the container exists
	if ( ! container || ! ( container instanceof HTMLElement ) ) {
		return;
	}

	const Wrapper = () => {
		return <div>TODO implement frontend ui</div>;
	};
	render( <Wrapper />, container );
} );
