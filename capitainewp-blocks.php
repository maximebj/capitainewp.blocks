<?php
/**
 * Plugin Name:       CapitaineWP Blocks
 * Description:       Les Blocs de CapitaineWP.
 * Requires at least: 5.9
 * Requires PHP:      8.0
 * Version:           1.0
 * Author:            Maxime BJ • Capitaine WP
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capitainewp-blocks
 *
 * @package           create-block
 */


function create_block_capitainewp_blocks_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_capitainewp_blocks_block_init' );
