const path = require( 'path' );

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		vinyl: path.resolve( process.cwd(), 'src', 'index' ),
		'vinyl-frontend': path.resolve( process.cwd(), 'src', 'frontend' ),
	},
};
