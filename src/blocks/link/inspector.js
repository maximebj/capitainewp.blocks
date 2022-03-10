import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, TextControl } from '@wordpress/components'

export default function Inspector( props ) {

	const { attributes, setAttributes } = props
	const { favicon } = attributes

	return (
		<InspectorControls>
			<PanelBody title="Choix de la Favicon">
				<TextControl
					value={ favicon }
					onChange={ favicon => setAttributes( { favicon } ) }
				/>
			</PanelBody>
		</InspectorControls>
	)
}
