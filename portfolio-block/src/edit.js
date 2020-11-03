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
import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';
import { useEffect } from "@wordpress/element";

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
export default function Edit( { attributes, setAttributes } ) {

	useEffect( async () =>  {
		try {
			const postFound = await apiFetch( { url: "/wp-json/wp/v2/portfolio" } );
			const postFoundLength = Object.keys(postFound).length;
			setAttributes({
				avilablePosts: postFoundLength
			});
		} catch (error) {
			console.log(error);
		}
	}, [])
	return ([
		<div className = "block-wrapper" >
			<h1>D'SIGN THE SOUL</h1>
			<div>Number of posts found = {attributes.avilablePosts}</div>
			<label> No of posts you want to display: </label>
			<input
				type="number"
				onChange={(e) => {
					setAttributes({
						numberOfPosts: e.target.value,
					});
				}}
				min="1"
				max={attributes.avilablePosts}
				value={attributes.numberOfPosts}
			/>
		</div>
	]);
}
