<?php
/**
 * Plugin Name: Capitaine WP - Formation Gutenberg - Blocs
 * Plugin URI: https://github.com/maximebj/capitainewp-gut-bases
 * Description: Des exemples concrets de blocs pour apprendre Gutenberg
 * Author: maximebj
 * Author URI: https://capitainewp.io
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function capitainewp_blocks_assets() {

	wp_enqueue_style(
		'capitainewp-blocs-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' )
	);
}
add_action( 'enqueue_block_assets', 'capitainewp_blocks_assets' );


function capitainewp_blocks_editor_assets() {

	wp_enqueue_script(
		'capitainewp-blocs-block',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' )
	);

	wp_enqueue_style(
		'capitainewp-blocs-block-editor',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
}
add_action( 'enqueue_block_editor_assets', 'capitainewp_blocks_editor_assets' );
