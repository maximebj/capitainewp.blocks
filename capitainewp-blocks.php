<?php
/**
 * Plugin Name:       Blocs Capitaine WP
 * Description:       Les blocs de Capitaine WP pour les cours et articles.
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


function create_block_capitainewp_blocks_block_init(): void
{

	# Register blocks
	register_block_type( __DIR__ . '/build/alert' );
	register_block_type( __DIR__ . '/build/aparte' );
	register_block_type( __DIR__ . '/build/button' );
	register_block_type( __DIR__ . '/build/definition' );
	register_block_type( __DIR__ . '/build/fact' );
	register_block_type( __DIR__ . '/build/interview' );
	register_block_type( __DIR__ . '/build/intro' );
	register_block_type( __DIR__ . '/build/link' );
	register_block_type( __DIR__ . '/build/plugin' );
	register_block_type( __DIR__ . '/build/table-of-contents' );
}
add_action( 'init', 'create_block_capitainewp_blocks_block_init' );


function wholesomecode_wholesome_plugin_block_categories( $categories ): array
{
	$categories[] = [
		'slug' => 'capitainewp',
		'title' => 'Capitaine WP',
	];

	return $categories;
}
add_filter( 'block_categories_all', 'wholesomecode_wholesome_plugin_block_categories', 10, 2 );
