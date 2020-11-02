/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";

import { Panel, PanelBody } from '@wordpress/components';
import { more } from '@wordpress/icons';

/**
 * Allowed innerblocks for this block
 */
const ALLOWED_BLOCKS = ["core/button"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, className, setAttributes }) {
	const {
		moviePosterUrl,
		movieTitle,
		movieTitleColor,
		reviewContent,
		reviewContentColor,
		authorName,
		authorNameColor,
		textAlignment,
		boxBackgroundColor,
	} = attributes;

	return ([
		<InspectorControls style={{ marginBottom: '40px' }}>
			<Panel header="My Panel">
				<PanelBody title="Box Background Color Setting" icon={more} initialOpen={true}>
					<p>
						<strong>Select Background Color:</strong>
					</p>
					<ColorPalette
						value={boxBackgroundColor}
						onChange={(value) => {
							setAttributes({ boxBackgroundColor: value });
						}}
					/>
				</PanelBody>
				<PanelBody title="Font Color Settings" icon={more} initialOpen={false}>
					<p>
						<strong>Select Title Color:</strong>
					</p>
					<ColorPalette
						value={movieTitleColor}
						onChange={(value) => {
							setAttributes({ movieTitleColor: value });
						}}
					/>
					<p>
						<strong>Select Content Color:</strong>
					</p>
					<ColorPalette
						value={reviewContentColor}
						onChange={(value) => {
							setAttributes({ reviewContentColor: value });
						}}
					/>
					<p>
						<strong>Select Author Name Color:</strong>
					</p>
					<ColorPalette
						value={authorNameColor}
						onChange={(value) => {
							setAttributes({ authorNameColor: value });
						}}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>,
		<BlockControls>
			<AlignmentToolbar
				value={textAlignment}
				onChange={(value) => setAttributes({
					 textAlignment: value === undefined ? 'none' : value
					})
				}
			/>
		</BlockControls>,
		<div className={className} style={{ backgroundColor: boxBackgroundColor }}>
			<div className="media">
				<MediaUpload
					onSelect={(value) => {
						setAttributes({ moviePosterUrl: value.sizes.full.url });
					}}
					render={({ open }) => {
						return <img
							src={moviePosterUrl}
							onClick={open}
						/>;
					}}
				/>
			</div>
			<RichText
				key="editable"
				tagName="h3"
				placeholder="Enter Movie Name"
				value={movieTitle}
				onChange={(value) => {
					setAttributes({ movieTitle: value });
				}}
				style={{ color: movieTitleColor, textAlign: textAlignment }}
			/>
			<hr />
			<RichText
				key="editable"
				tagName="p"
				placeholder="What's your review?"
				value={reviewContent}
				onChange={(value) => {
					setAttributes({ reviewContent: value });
				}}
				style={{ color: reviewContentColor, textAlign: textAlignment }}
			/>
			<hr />
			<RichText
				key="editable"
				tagName="h5"
				placeholder="Your Name"
				value={authorName}
				onChange={(value) => {
					setAttributes({ authorName: value });
				}}
				style={{ color: authorNameColor, textAlign: textAlignment }}
			/>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
			/>
		</div>
	]);
}
