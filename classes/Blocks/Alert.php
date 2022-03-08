<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;

defined( 'ABSPATH' ) || exit;

class Alert
{
	public const SLUG = 'alert';

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
		register_block_type( Constant::path() . "build/blocks/" . self::SLUG );
	}
}
