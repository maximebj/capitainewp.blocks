<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;
use Timber\Timber;

defined('ABSPATH') || exit;

class Definition
{
	public const SLUG = 'definition';

	/**
	 * Registrer Hooks
	 *
	 * @return void
	 */
	public function registerHooks(): void
	{
		add_action('init', [$this, 'registerBlock']);
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
				'render_callback' => [$this, 'renderBlock']
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
	public function renderBlock($attributes): string
	{
		$post_id = $attributes['definitionID'] ?? null;
		$class = $attributes['className'] ?? '';

		if (is_null($post_id)) {
			return '';
		}

		$data = [
			'definition' 		=> Timber::get_post($post_id),
			'currentLesson' => get_the_id(),
			'customClass'		=> empty($class) ? '' : ' ' . $class,
		];

		return Timber::compile('block-definition.twig', $data);
	}
}
