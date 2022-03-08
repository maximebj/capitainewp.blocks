import { useBlockProps } from '@wordpress/block-editor'
import classnames from 'classnames'

export default function Save( props ) {

	const { buttonClass, hasIcon, icon, label, url, isBlank } = props.attributes

	return (
		<p {...useBlockProps.save()}>
			<a
				href={ url }
				target={isBlank && '_blank'}
				className={ classnames( 'button', `button--${buttonClass}` ) }
				data-type={ buttonClass }
				rel="noopener"
			>
				{ !! hasIcon && (
					<span
						className={ classnames( 'dashicons', `dashicons-${icon}` ) }
						data-icon={ icon }
					>
					</span>
					)
				}
				<span>{ label }</span>
			</a>
		</p>
	)
}
