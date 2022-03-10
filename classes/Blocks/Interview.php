<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;
use Timber\Timber;

defined( 'ABSPATH' ) || exit;

class Interview
{
	public const SLUG = 'interview';

	/**
   * Registrer Hooks
	 *
	 * @return void
	 */
	public function registerHooks(): void
	{
		add_action( 'init', [ $this, 'registerBlock' ] );
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
		$post_id = $attributes['peopleID'] ?? null;
		$content = $attributes['content'] ?? '';

		if( is_null( $post_id ) ) { return ''; }

		$people = Timber::get_post( $post_id );

    # Define article
    $first_letter = strtolower( substr( $people->post_title, 0, 1 ) );
    $article = in_array( $first_letter, [ "a", "e", "i", "o", "u", "y" ] ) ? "d'" : "de ";

		$data = [
			'people'  => $people,
			'content' => $content,
			'article' => $article,
		];

		return Timber::compile( 'interview.twig', $data );
	}
}
