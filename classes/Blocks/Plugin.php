<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;
use Timber\Timber;

defined( 'ABSPATH' ) || exit;

class Plugin
{
	public const SLUG = 'plugin';

	/**
   * Registrer Hooks
	 *
	 * @return void
	 */
	public function registerHooks(): void
	{
		add_action( 'init', [ $this, 'registerBlock' ] );
		add_action( 'wp_ajax_search_plugins', [ $this, 'searchPlugins' ] );
    add_action( 'wp_ajax_get_plugin', [ $this, 'getPlugin' ] );
	}


	/**
   * Register Block
	 *
	 * @return void
	 */
	public function registerBlock(): void
	{
		register_block_type(
			Constant::path() . "build/blocks/" . self::SLUG,
			[
				'render_callback' => [ $this, 'renderBlock' ]
			]
		);
	}


	/**
   * Render Block in frontend
	 *
	 * @param array $attributes
	 *
	 * @return string The rendered block in HTML
	 */
	public function renderBlock( $attributes ): string
	{
		require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

		$slug = $attributes['slug'] ?? null;
		$class = $attributes['className'] ?? '';

		if( is_null( $slug ) ) { return '';}

		$request = [
      'slug' => $slug,
			'fields' => $this->getApiFields()
		];

		# Get datas from API
    $result = plugins_api( 'plugin_information', $request );

		# Prepare datas for template
		$plugin = $this->prepareData( $result );

		$data = [
			'plugin' => $plugin,
			'customClass' => empty( $class ) ? '' : ' ' . $class,
		];

		return Timber::compile( 'plugin.twig', $data );
	}


	/**
   * Search a plugin via Plugins API
	 * Context: Ajax
	 *
	 * @return void
	 */
  public function searchPlugins(): void
	{
		require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

    $request = [
      'per_page' => 20,
      'search' => $_POST['search'],
      'fields' => $this->getApiFields()
		];

    $results = plugins_api( 'query_plugins', $request );
		$data = [];
		$plugins = [];

    foreach( $results->plugins as $plugin ) {
			$plugins[] = $this->prepareData( $plugin );
		}

		$data['info'] = $results->info;
		$data['plugins'] = $plugins;

		wp_send_json_success( $data );
  }


	/**
   * Get plugin data for Preview component via Plugins API
	 * Context: Ajax
	 *
	 * @return void
	 */
	public function getPlugin(): void
	{
		require_once( ABSPATH . 'wp-admin/includes/plugin-install.php' );

		$request = [
      'slug' => $_POST['slug'],
			'fields' => $this->getApiFields()
		];

		# Get datas from API
    $result = plugins_api( 'plugin_information', $request );

		# Prepare datas for template
		$plugin = $this->prepareData( $result );

		wp_send_json_success( $plugin );
	}


	/**
   * Additional fields to get via plugins API
	 *
	 * @return void
	 */
	protected function getApiFields(): array
	{
		return [
			'title' => true,
			'short_description' => true,
			'active_installs' => true,
			'icons' => true,
			'sections' => false,
		];
	}


	/**
   * Search a plugin via Plugins API
	 * Context: Ajax
	 *
	 * @param object|array $data
	 *
	 * @return array
	 */
	protected function prepareData( $data ): array
	{
		# Force object
		if( is_array( $data ) ) { $data = (object) $data; }

		return [
			'slug' => $data->slug,
			'name' => html_entity_decode( $data->name ),
			'description' => html_entity_decode( $data->short_description ),
			'icon' => $this->defineImage( $data->icons ),
			'stars' => $this->setStars( $data->rating ),
			'activeInstalls' => $this->formatInstalls( $data->active_installs ),
			'downloadLink' => "https://wordpress.org/plugins/" . $data->slug,
			'rating' => $data->rating,
			'numRatings' => $data->num_ratings,
			'author' => strip_tags( $data->author ),
			'homepage' => $data->homepage,
			'numRatings' => $data->num_ratings,
		];
	}


	/**
   * Define plugin icon size
	 *
	 * @param array $icons The icons available
	 *
	 * @return sring
	 */
	protected function defineImage( array $icons ): string
	{
		if ( array_key_exists( '2x', $icons ) ) {
			return $icons['2x'];
		} else if( array_key_exists( '1x', $icons ) ) {
			return $icons['1x'];
		} else {
			return $icons['default'];
		}
	}


	/**
   * Format number of installs
	 *
	 * @param int $installs number of active installs
	 *
	 * @return string
	 */
	protected function formatInstalls( int $installs ): string
	{
		if ( $installs >= 1000000 ) {
			return '1+ Million';
		}
		else if( $installs < 10 ) {
			return 'moins de 10';
		}

		return $installs . '+';
	}


	/**
   * Generate stars
	 *
	 * @param string $rating the plugin rating
	 *
	 * @return string The 1 to 5 stars
	 */
	protected function setStars( string $rating ): string
	{
		$rating = intval( $rating ) / 20;
    $floor = floor( $rating );

    $max = 5;
    $last = 0;

    $stars = '';

    for( $i=0; $i < $floor; $i++ ) {
      $stars.= $this->getStarSVG( 'filled' );
      $last++;
    }

    if( $floor != $rating ) {
      $stars.= $this->getStarSVG( 'half' );
      $last++;
    }

    for ( $i = $last; $i < $max; $i++ ) {
      $stars.= $this->getStarSVG( 'empty' );
    }

		return $stars;
	}


	/**
   * Generate stars in SVG
	 *
	 * @param string $type The type: filled, half or empty
	 *
	 * @return string the star svg
	 */
	protected function getStarSVG( string $type ): string
	{
		if( $type == "filled" ) {
			return "
				<svg width='18px' height='18px'>
			 		<g fill='#F5BC41'>
			    	<polygon points='9 0 12 6 18 6.75 13.88 11.37 15 18 9 15 3 18 4.13 11.37 0 6.75 6 6'></polygon>
			  	</g>
				</svg>
			";

		} else if ( $type == "half" ) {
			return "
				<svg width='18px' height='18px'>
					<g fill='#F5BC41'>
						<path d='M9,0 L6,6 L0,6.75 L4.13,11.37 L3,18 L9,15 L15,18 L13.88,11.37 L18,6.75 L12,6 L9,0 Z M9,2.24 L11.34,6.93 L15.99,7.51 L12.81,11.07 L13.68,16.22 L9,13.88 L9,2.24 Z'></path>
					</g>
				</svg>
			";
		}

		return "
			<svg width='18px' height='18px'>
				<g fill='#F5BC41'>
					<path d='M9,0 L6,6 L0,6.75 L4.13,11.37 L3,18 L9,15 L15,18 L13.88,11.37 L18,6.75 L12,6 L9,0 Z M9,2.24 L11.34,6.93 L15.99,7.51 L12.81,11.07 L13.68,16.22 L9,13.88 L4.32,16.22 L5.19,11.07 L2.01,7.51 L6.66,6.93 L9,2.24 Z'></path>
				</g>
			</svg>
		";
	}
}
