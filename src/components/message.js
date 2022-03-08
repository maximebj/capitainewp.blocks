import '../styles/custom.scss'

export default function Message( props ) {

	const { label } = props

	return (
		<p class="capitainewp-message">{label} →</p>
	)
}
