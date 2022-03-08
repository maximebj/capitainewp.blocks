import { useBlockProps } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {

	const { attributes: { definitionID }, setAttributes } = props

	return (
		<div {...useBlockProps()}>
			Test
		</div>
	)
}
