import { BlockControls } from '@wordpress/block-editor'
import { ToolbarGroup, ToolbarButton } from '@wordpress/components'

export default function Toolbar( props ) {

	const { attributes, setAttributes } = props
	const { ordered } = attributes

	return (
		<BlockControls>
			<ToolbarGroup>

				<ToolbarButton
					icon='editor-ol'
					label='Liste ordonnée'
					onClick={ () => setAttributes( { ordered: true } ) }
					isPressed={ ordered }
				/>

				<ToolbarButton
					icon='editor-ul'
					label='liste non ordonnée'
					onClick={ () => setAttributes( { ordered: false } ) }
					isPressed={ ! ordered }
				/>

			</ToolbarGroup>
		</BlockControls>
	)
}
