import { render, useState } from '@wordpress/element';

import Counter from './counter';

// Run on window.load to reduce jank on page load
window.addEventListener( 'load', () => {
	const container = document.querySelector( '.wp-block-vinyl-counter' );

	// Ensure our container exists
	if ( ! container || ! ( container instanceof HTMLElement ) ) {
		return;
	}

	const parsed = parseInt( container.dataset.count as string ); // eslint-disable-line @typescript-eslint/non-nullable-type-assertion-style

	const value = isNaN( parsed ) ? 0 : parsed;

	const Wrapper = () => {
		const [ count, setCount ] = useState( value );
		return (
			<div>
				<Counter count={ count } setCount={ setCount } />
			</div>
		);
	};
	render( <Wrapper />, container );
} );
