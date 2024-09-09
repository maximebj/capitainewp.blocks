<?php

namespace CapitaineWPBlocks\Blocks;

use CapitaineWPBlocks\Constant;
use CapitaineWP\Helpers;
use Timber\Timber;

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
  public function renderBlock($attributes, $content): string
  {
    // Ignore admin
    if (is_admin() || wp_doing_ajax()) {
      return $content;
    }

    // Get attributes
    $class = $attributes['className'] ?? '';

    // Define product linke to the parent course of the lesson
    $lesson_id = get_the_ID();
    $course_id = get_field('course', $lesson_id);
    $product_id = get_field('product', $course_id);

    // Display CTA if not purchased
    if (!Helpers::has_purchased($product_id)) {

      $data = [
        'pricingPage' => 0, // TODO: Define pricing page
      ];

      return Timber::compile('premium-locked.twig', $data);
    }

    $data = [
      'content' => $content,
      'customClass' => empty($class) ? '' : ' ' . $class,
    ];

    return Timber::compile('premium.twig', $data);
  }
}
