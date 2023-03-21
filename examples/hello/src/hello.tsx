import { Props } from './types';

export default function Hello( { name }: Props ) {
	return (
		<>
			Hello <span>{ name }</span>
		</>
	);
}
