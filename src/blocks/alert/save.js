import { useBlockProps } from '@wordpress/block-editor'

import icon from './icons'

export default function Save( props ) {

	const { type, title, content, hasIcon } = props.attributes

	const blockProps = useBlockProps.save( {
		className: [
			`is-variation-${type}`,
			{ 'has-icon': hasIcon },
		]
	} )

	return (
		<div {...blockProps} data-type={ type }>
			{ hasIcon && icon[type] }
			<p className='wp-block-capitainewp-alert__title'>{ title }</p>
			<p className='wp-block-capitainewp-alert__content'>{ content }</p>
		</div>
	)
}
