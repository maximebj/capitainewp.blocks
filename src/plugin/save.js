import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'

export default function Save( props ) {
	return (
		<p {...useBlockProps.save()}>
			{__(
				'Capitainewp Blocks – hello from the saved content!',
				'capitainewp-blocks'
			)}
		</p>
	)
}
