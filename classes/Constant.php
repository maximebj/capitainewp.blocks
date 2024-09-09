<?php

namespace CapitaineWPBlocks;

defined('ABSPATH') || exit;

abstract class Constant
{
	const SLUG    = 'capitainewp-blocks';
	const VERSION = '2.0';

	/**
	 * Get Plugin path to directory
	 *
	 * @return string
	 */
	public static function path(): string
	{
		return plugin_dir_path(__DIR__);
	}


	/**
	 * Get Plugin URL to directory
	 *
	 * @return string
	 */
	public static function URL(): string
	{
		return plugin_dir_url(__DIR__);
	}
}
