import { Spinner } from '@wordpress/components'
import './style.scss'

export default function Message( props ) {

	const { label, withSpinner } = props

	return (
		<p class="capitainewp-message">
			{ withSpinner && <Spinner /> }
			{label}
		</p>
	)
}
