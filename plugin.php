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
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }


class CapitaineWPBlocks {

	public function register_hooks() {
    add_action( 'init', [ $this, 'register_render'] );
    add_action( 'enqueue_block_editor_assets', [ $this, 'register_editor_assets' ] );
    add_action( 'enqueue_block_assets', [ $this, 'register_public_assets' ] );
  }

  public function register_editor_assets() {

    $js = 'dist/blocks.build.js';

  	wp_enqueue_script(
  		'capitainewp-blocs',
  		plugins_url( $js, __FILE__ ),
  	  [ 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ],
      filemtime( plugin_dir_path( __FILE__ ) . $js )
  	);

    $css = 'dist/blocks.editor.build.css';

  	wp_enqueue_style(
  		'capitainewp-blocs-editor',
  		plugins_url( $css , __FILE__ ),
  		[ 'wp-edit-blocks' ],
      filemtime( plugin_dir_path( __FILE__ ) . $css )
  	);
  }

  public function register_public_assets() {

    $css = 'dist/blocks.style.build.css';

    wp_enqueue_style(
      'capitainwp-blocks',
      plugins_url( $css , __FILE__ ),
      [],
      filemtime( plugin_dir_path( __FILE__ ) . $css )
    );
  }

  public function register_render() {
    
    // WP 5 Compatibility
    if ( ! function_exists('register_block_type') ) {
      return;
    }

    register_block_type(
      'captainwp/definition',
      [ 'render_callback' => [ $this, 'render_definition_block' ] ]
    );

    register_block_type(
      'captainwp/interview',
      [ 'render_callback' => [ $this, 'render_interview_block' ] ]
    );
  }

  public function render_definition_block( $attributes ) {
    global $context;

    $id = $attributes['definitionID'];
    $context['definition'] = \Timber::get_post($id);

    return \Timber::compile( 'blocks/definition.twig', $context );
  }

  public function render_interview_block( $attributes ) {
    global $context;

    $id = $attributes['peopleID'];
    $context['people'] = \Timber::get_post($id);
    $context['content'] = $attributes['content'];

    // define article
    $vowels = array("a", "e", "i", "o", "u", "y");
    $first_letter = strtolower( substr( $context['people']->post_title, 0, 1 ) );

    $context['article'] = in_array( $first_letter, $vowels ) ? "d'" : "de ";

    return \Timber::compile( 'blocks/interview.twig', $context );
  }
}

$CapitaineWPBlocks = new CapitaineWPBlocks();
$CapitaineWPBlocks->register_hooks();
