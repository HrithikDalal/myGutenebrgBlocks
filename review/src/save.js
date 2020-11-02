/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from "@wordpress/block-editor";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save({ attributes, className }) {
	const {
		moviePosterUrl,
		movieTitle,
		movieTitleColor,
		reviewContent,
		reviewContentColor,
		authorName,
		authorNameColor,
		boxBackgroundColor,
		textAlignment,
	} = attributes;

	return (
		<div className={className} style={{ backgroundColor: boxBackgroundColor }}>
			<div className="media">
				<img src={moviePosterUrl} />
			</div>
			<RichText.Content
				tagName="h3"
				value={movieTitle}
				style={{ color: movieTitleColor, textAlign: textAlignment }}
			/>
			<hr />
			<RichText.Content
				tagName="p"
				value={reviewContent}
				style={{ color: reviewContentColor, textAlign: textAlignment }}
			/>
			<hr />
			<RichText.Content
				tagName="h5"
				value={authorName}
				style={{ color: authorNameColor, textAlign: textAlignment }}
			/>
			<InnerBlocks.Content />
		</div>
	);
}
