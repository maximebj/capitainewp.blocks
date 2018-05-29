<?php
/**
 * Plugin Name: Capitaine WP - Blocs
 * Plugin URI: https://github.com/maximebj/capitainewp-gut-bases
 * Description: Mes blocs pour la rédaction des cours et tutoriels
 * Author: maximebj
 * Author URI: https://capitainewp.io
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function capitainewp_blocks_assets() {

	wp_enqueue_style(
		'capitainewp-blocs',
		plugins_url( 'dist/blocks.style.build.css', __FILE__ ),
		[ 'wp-editor', 'wp-blocks' ]
	);
}
add_action( 'enqueue_block_assets', 'capitainewp_blocks_assets' );


function capitainewp_blocks_editor_assets() {

	wp_enqueue_script(
		'capitainewp-blocs',
		plugins_url( '/dist/blocks.build.js', __FILE__ ),
	  [ 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ]
	);

	wp_enqueue_style(
		'capitainewp-blocs-editor',
		plugins_url( 'dist/blocks.editor.build.css', __FILE__ ),
		[ 'wp-edit-blocks' ]
	);
}
add_action( 'enqueue_block_editor_assets', 'capitainewp_blocks_editor_assets' );








class CapitaineWPBlocks {

	public function register_hooks() {
    add_action( 'init', [ $this, 'register_render'] );
    add_action( 'enqueue_block_editor_assets', [ $this, 'register_editor_assets' ] );
    //add_action( 'enqueue_block_assets', [ $this, 'register_public_assets' ] );
  }

  public function register_editor_assets() {

  	wp_enqueue_script(
  		'capitainewp-blocs',
  		plugins_url( '/dist/blocks.build.js', __FILE__ ),
  	  [ 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ]
  	);

  	wp_enqueue_style(
  		'capitainewp-blocs-editor',
  		plugins_url( 'dist/blocks.editor.build.css', __FILE__ ),
  		[ 'wp-edit-blocks' ]
  	);
  }

  public function register_public_assets() {

    wp_enqueue_style(
      'capitainwp-blocks',
      plugins_url( '/dist/blocks.css', __FILE__ ),
      array('wp-blocks'),
      '1.0'
    );
  }

  public function register_render() {

    register_block_type(
      'captainewp/definition',
      [ 'render_callback' => [ $this, 'render_definition_block' ] ]
    );
  }

  public function render_definition_block( $attributes ) {
    global $context;

    $id = $attributes['definitionID'];

    $context['definition'] = \Timber::get_post($id);

    return \Timber::compile('blocks/definition.twig', $context);
  }
}



$CapitaineWPBlocks = new CapitaineWPBlocks();
$CapitaineWPBlocks->register_hooks();
