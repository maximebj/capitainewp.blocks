import { useBlockProps } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'

import Inspector from './inspector'
import Block from './block'
import Message from '../../components/message'

import './editor.scss'

export default function Edit( props ) {

	const { attributes, setAttributes } = props
  const { peopleID, content } = attributes

	return (
		<Fragment>
			<Inspector { ...{ setAttributes } } />

			{ peopleID ? (
				<Block { ...{ attributes, setAttributes } } />
			) : (
				<div {...useBlockProps()}>
					<Message
						label="Recherchez une personne dans l'inspecteur →"
					/>
				</div>
			) }
		</Fragment>
	)
}
