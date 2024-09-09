<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;

defined('ABSPATH') || exit;

class Premium
{
  public const SLUG = 'premium';

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
    $class = $attributes['className'] ?? '';

    // TODO

    $data = [
      'test' => 'test',
      'customClass' => empty($class) ? '' : ' ' . $class,
    ];

    return Timber::compile('premium.twig', $data);
  }
}
