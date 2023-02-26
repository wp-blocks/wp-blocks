import { render } from '@wordpress/element';

// Run on window.load to reduce jank on page load
window.addEventListener( 'load', () => {
	const container = document.querySelector( '.wp-block-example-counter' );

	// Ensure our container exists
	if ( ! container ) {
		return;
	}

	const Hello = () => <span>Hello Plugin React!</span>;

	render( <Hello />, container );
} );
