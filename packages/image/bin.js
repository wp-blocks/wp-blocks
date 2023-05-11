#!/usr/bin/env node
/* eslint-disable no-console */

import main from './src/image.js';

await main()
	.then( () => {
		console.log( 'The end 🎉' );
	} )
	.catch( ( err ) => {
		console.error( err );
	} );
