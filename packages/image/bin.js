import main from './src/index.js';

await main()
	.then( () => {
		console.log( 'The end 🎉' );
	} )
	.catch( ( err ) => {
		console.error( err );
	} );
