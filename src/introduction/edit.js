import { __ } from '@wordpress/i18n'
import { useBlockProps, RichText } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {

	const { attributes: { content }, setAttributes } = props

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="p"
				placeholder={ __( 'Texte d’introduction', 'advanced-gutenberg-blocks' ) }
				value={ content }
				onChange={ content => setAttributes( { content } ) }
			/>
		</div>
	)
}
