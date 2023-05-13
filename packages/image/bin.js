import main from './build/index.js';

await main()
	.then( () => {
		console.log( 'The end 🎉' );
	} )
	.catch( ( err ) => {
		console.error( err );
	} );
