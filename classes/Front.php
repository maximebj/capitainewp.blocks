<?php

namespace CapitaineWPBlocks;

use Timber\Timber;

defined( 'ABSPATH' ) || exit;

class Front
{
	/**
   * Registrer Hooks
	 *
	 * @return void
	 */
	public function registerHooks(): void
	{
		add_action( 'init', [ $this, 'AddTimberPath' ] );
	}


	/**
   * Add plugin path to Timber
	 *
	 * @return void
	 */
	public function AddTimberPath(): void
	{
		Timber::$locations = [
      Constant::path() . 'templates',
    ];
	}
}
