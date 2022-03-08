import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody } from '@wordpress/components'

export default function Inspector( props ) {

	const { setAttributes } = props

	return (
		<InspectorControls>

			<PanelBody title="Choix de la définition">
				COUCOU
				{/* <SearchPost
					onChange={ definitionID => setAttributes( { definitionID } ) }
					type="definitions"
					placeholder="Chercher une définition"
				/> */}

			</PanelBody>

		</InspectorControls>
	)
}
