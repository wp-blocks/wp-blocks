#!/usr/bin/env node
/* eslint-disable no-console */

import main from "./src/image.js";

main().then( () => {
	console.log( 'The end 🎉' );
} );

