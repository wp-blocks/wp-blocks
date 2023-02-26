import { __ } from '@wordpress/i18n';

interface Props {
	count: number;
	setCount?: ( value: number ) => void;
}

export default function Counter( { count, setCount }: Props ) {
	return (
		<>
			<p>
				{ __( 'You clicked', 'counter' ) } { count }{ ' ' }
				{ __( 'times', 'counter' ) }
			</p>
			<button onClick={ () => setCount?.( count + 1 ) }>
				{ __( 'Click me', 'counter' ) }
			</button>
		</>
	);
}
