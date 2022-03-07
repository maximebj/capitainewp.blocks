<?php
/**
 * Plugin Name:       Blocs Capitaine WP
 * Description:       Les blocs de Capitaine WP pour les cours et articles.
 * Requires at least: 5.9
 * Requires PHP:      8.0
 * Version:           1.0
 * Author:            Maxime BJ • Capitaine WP
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capitainewp-blocks
 *
 * @package           create-block
 */

defined( 'ABSPATH' ) || exit;

class CapitaineWPBlocks
{
	public function run()
	{
		# Load Files
		require_once __DIR__ . '/inc/Constant.php';
		require_once __DIR__ . '/inc/Editor.php';

		require_once __DIR__ . '/inc/Blocks/Alert.php';
		require_once __DIR__ . '/inc/Blocks/Aparte.php';
		require_once __DIR__ . '/inc/Blocks/Button.php';
		require_once __DIR__ . '/inc/Blocks/Definition.php';
		require_once __DIR__ . '/inc/Blocks/Fact.php';
		require_once __DIR__ . '/inc/Blocks/Interview.php';
		require_once __DIR__ . '/inc/Blocks/Introduction.php';
		require_once __DIR__ . '/inc/Blocks/Link.php';
		require_once __DIR__ . '/inc/Blocks/Plugin.php';
		require_once __DIR__ . '/inc/Blocks/TableOfContents.php';

		# Init Classes
		(new CapitaineWPBlocks\Editor)->registerHooks();

		(new CapitaineWPBlocks\Blocks\Alert)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Aparte)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Button)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Definition)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Fact)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Interview)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Introduction)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Link)->registerHooks();
		(new CapitaineWPBlocks\Blocks\Plugin)->registerHooks();
		(new CapitaineWPBlocks\Blocks\TableOfContents)->registerHooks();
	}
}

(new CapitaineWPBlocks)->run();
