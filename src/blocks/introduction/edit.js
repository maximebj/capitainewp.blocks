import { useBlockProps, RichText } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {

	const { attributes: { content }, setAttributes } = props

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="p"
				placeholder="Texte d’introduction"
				value={ content }
				onChange={ content => setAttributes( { content } ) }
			/>
		</div>
	)
}
