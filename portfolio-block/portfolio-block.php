<?php
/**
 * Plugin Name:     Portfolio Block
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     portfolio-block
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_portfolio_block_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/portfolio-block" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require $script_asset_path;
	wp_register_script(
		'create-block-portfolio-block-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);
	wp_set_script_translations( 'create-block-portfolio-block-block-editor', 'portfolio-block' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-portfolio-block-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-portfolio-block-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'create-block/portfolio-block',
		array(
			'editor_script'   => 'create-block-portfolio-block-block-editor',
			'editor_style'    => 'create-block-portfolio-block-block-editor',
			'style'           => 'create-block-portfolio-block-block',
			'render_callback' => 'portfolio_block_render_callback',
		)
	);
}

/**
 * Renders the categories of posts
 *
 * @param array $block_attributes .
 * @return mixed
 */
function portfolio_block_render_callback( $block_attributes ) {
	$post_query = new WP_Query(
		array(
			'post_type'      => 'portfolio',
			'posts_per_page' => $block_attributes['numberOfPosts'],
		)
	);
	$str        = '<h3 class ="portfolio-title">D\'SIGN THE SOUL</h3>';
	$str       .= '<div class="block-portfolio-content">';

	$post_index  = 1; // Index to loop through all the posts.
	$total_posts = $post_query->post_count; // Number of Posts found.

	while ( $post_query->have_posts() ) :

		/* Calculate previous and next post index for the Lighthous Image ID */
		if ( 1 === $post_index ) {
			$prev_post_index = $total_posts; // Previous Post Image ID Index.
		} else {
			$prev_post_index = $post_index - 1;
		}
		if ( $post_index === $total_posts ) {
			$next_post_index = 1; // Next Post Image ID Index.
		} else {
			$next_post_index = $post_index + 1;
		}

		$post_query->the_post();

		$str .= '<a class="block-post-thumbnail" href="#img' . $post_index . '">';
		$str .= '<div id="image-overlay" class="image-overlay"><span class="dashicons dashicons-cover-image"></span><span>View Image</span></div>';
		$str .= get_the_post_thumbnail();
		$str .= '</a>';
		$str .= '<div class="block-lightbox" id="img' . $post_index . '"><div class="block-lightbox__content"><div class="block-lightbox__image">';
		$str .= get_the_post_thumbnail();
		$str .= '<a href="#_" class="lightbox__exit">&#10005;</a>';
		$str .= '</div><div class="block-lightbox__footer">';
		$str .= '<div><a href="#img' . $prev_post_index . '" class="lightbox__previous">&#8592;</a></div>';
		$str .= '<div class="post-title"><a aia-hidden="true" href="' . get_the_permalink() . '" tabindex="-1">' . get_the_title() . '</a></div>';
		$str .= '<div><a href="#img' . $next_post_index . '" class="lightbox__next">&#8594;</a></div>';
		$str .= '</div></div></div>';

		$post_index++;
	endwhile;

	$str .= '</div>';

	return $str;
}

add_action( 'init', 'create_block_portfolio_block_block_init' );
