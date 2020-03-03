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

namespace CapitaineWP;

defined( 'ABSPATH' ) || exit;

class Blocks {

	public function register_hooks() {
    add_action( 'init', [ $this, 'register_render'] );
    add_action( 'init', [ $this, 'register_assets' ] );
    add_filter( 'block_categories', [ $this, 'add_block_category' ] );
  }


  public function register_assets() {

    // Blocks Styles (Front + Editor)
    wp_register_style(
      'capitainewp-blocs',
      plugins_url( 'dist/blocks.style.build.css' , __FILE__ ),
      is_admin() ? [ 'wp-editor' ] : null,
      '1.1'
    );

    // Blocks scripts (Editor)
    wp_register_script(
      'capitainewp-blocs',
      plugins_url( 'dist/blocks.build.js', __FILE__ ),
      [ 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ],
      '1.1',
      true
    );

    // Special styles (Editor)
    wp_register_style(
      'capitainewp-blocs-editor',
      plugins_url( 'dist/blocks.editor.build.css', __FILE__ ),
      [ 'wp-edit-blocks' ],
      '1.1'
    );

    // Register block to load assets
    register_block_type(
      'capitainewp/blocks', array(
        'style'         => 'capitainewp-blocs',
        'editor_script' => 'capitainewp-blocs',
        'editor_style'  => 'capitainewp-blocs-editor',
      )
    );
  }


  public function register_render() {

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
    $context['current_lesson'] = get_the_id();

    return \Timber::compile( 'blocks/definition.twig', $context );
  }


  public function render_interview_block( $attributes ) {
    global $context;

    $id = $attributes['peopleID'];
    $context['people'] = \Timber::get_post( $id );
    $context['content'] = $attributes['content'] ?? '';

    // define article
    $vowels = array( "a", "e", "i", "o", "u", "y" );
    $first_letter = strtolower( substr( $context['people']->post_title, 0, 1 ) );

    $context['article'] = in_array( $first_letter, $vowels ) ? "d'" : "de ";

    return \Timber::compile( 'blocks/interview.twig', $context );
  }


  public function add_block_category( $categories ) {
    $categories[] = array(
      'slug' => 'captain',
      'title' => 'Capitaine WP',
    );

    return $categories;
  }
}

(new Blocks)->register_hooks();
