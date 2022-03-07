<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;

defined( 'ABSPATH' ) || exit;

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
		add_action( 'init', [ $this, 'registerBlock' ] );
	}


	/**
   * Register Block
	 *
	 * @return void
	 */
	public function registerBlock(): void
	{
		register_block_type( Constant::path() . "build/" . self::SLUG );
	}
}
