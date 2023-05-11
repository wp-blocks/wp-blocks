import fs from 'fs';
import path from 'path';

/**
 * The function returns compression options for a given image format.
 *
 * @param {string} imageFormat - The format of the image that needs to be compressed, such as
 *                             "jpeg", "png", etc.
 * @param {Object} options     - The options parameter is an object that contains compression
 *                             options for different image formats. It is expected to have properties for each
 *                             supported image format, where the property name is the format name (e.g. "jpeg",
 *                             "png") and the value is an object containing compression options for that format.
 * @returns {Object|false} either the compression options for the specified image format from the
 * provided options object, or false if no compression options are found for that
 * format.
 */
export function getCompressionOptions( imageFormat, options ) {
	const formatOptions = options[ imageFormat ];

	if ( ! formatOptions ) {
		console.log(
			`No compression options found for format: ${ imageFormat }`
		);
		return false;
	}

	return formatOptions;
}

/**
 * this function returns an array of image formats in a given folder
 *
 * @param {string} folderPath The folder to search for images in
 * @returns {string[]} An array of image formats
 */
export function getImageFormatsInFolder( folderPath ) {
	const imageFormats = new Set(); // using a Set to store unique image formats

	/**
	 * This function searches for all image files in a given folder
	 *
	 * @param {string} dir The folder to search for images in.
	 */
	function searchForImages( dir ) {
		const files = fs.readdirSync( dir );

		// iterate over each file
		files.forEach( ( file ) => {
			const filePath = path.join( dir, file );

			const stats = fs.statSync( filePath );

			if ( stats.isDirectory() ) {
				searchForImages( filePath );
			} else {
				const ext = path.extname( file ).toLowerCase(); // get the file extension in lowercase

				if (
					ext === '.jpg' ||
					ext === '.jpeg' ||
					ext === '.png' ||
					ext === '.gif' ||
					ext === '.svg' ||
					ext === '.gif' ||
					ext === '.tiff'
				) {
					// check if it's an image file
					imageFormats.add( ext ); // add the image format to the Set
				}
			}
		} );
	}

	searchForImages( folderPath );

	return [ ...imageFormats ]; // convert the Set to an array
}
