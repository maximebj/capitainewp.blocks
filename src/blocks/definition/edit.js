import { useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'

import Inspector from './inspector'
import Message from '../../components/message'

import './editor.scss'

export default function Edit( props ) {

	const { attributes: { definitionID }, setAttributes } = props

	return (
		<Fragment>
			<Inspector { ...{ setAttributes } } />

			{ definitionID ? (
				<Block { ...{ definitionID } } />
			) : (
				<div {...useBlockProps()}>
					<Message
						label="Choisissez une définition dans l'inspecteur"
					/>
				</div>
			) }
		</Fragment>
	)
}
