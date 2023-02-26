<?php
/**
 * Plugin Name:       Counter
 * Description:       A Gutenberg block plugin example to enqueue React on the frontend.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            John Hooks
 * Author URI:        https://johnhooks.io
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       counter
 *
 * @package           counter
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build' );
	}
);

/**
 * Register our script.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		$asset_file = include plugin_dir_path( __FILE__ ) . 'build/frontend.asset.php';

		wp_register_script(
			'counter-frontend',
			plugins_url( 'build/frontend.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
);
