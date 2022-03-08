import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

import './editor.scss'

export default function Edit( props ) {
	return (
		<p {...useBlockProps()}>
			{__(
				'Capitainewp Blocks – hello from the editor!',
				'capitainewp-blocks'
			)}
		</p>
	)
}
