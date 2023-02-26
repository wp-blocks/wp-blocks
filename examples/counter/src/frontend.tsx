import { render, useState } from '@wordpress/element';

import Counter from './counter';

window.addEventListener( 'load', () => {
	const container = document.querySelector( '.wp-block-x-counter' );

	// Ensure the container exists
	if ( ! container || ! ( container instanceof HTMLElement ) ) {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
	const parsed = parseInt( container.dataset.count as string );

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
