<?php

namespace CapitaineWPBlocks;

defined('ABSPATH') || exit;

class Editor
{
	/**
	 * Registrer Hooks
	 *
	 * @return void
	 */
	public function registerHooks(): void
	{
		add_action('enqueue_block_editor_assets', [$this, 'sentDataToJS']);
		add_filter('block_categories_all', [$this, 'registerEditorCategory']);
	}


	/**
	 * Send data from PHP to JS
	 *
	 * @return void
	 */
	public function sentDataToJS(): void
	{
		wp_localize_script(
			'wp-block-editor',
			'CapitaineWPBlocks',
			[
				'ajaxurl' => admin_url('admin-ajax.php'),
			],
		);
	}


	/**
	 * Register a new « Capitaine WP » category in editor
	 *
	 * @return void
	 */
	public function registerEditorCategory($categories): array
	{
		$new_categories = [
			[
				'slug' => 'capitainewp',
				'title' => 'Capitaine WP',
				'icon' => null
			]
		];

		return array_merge($new_categories, $categories);
	}
}
