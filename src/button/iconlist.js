import classnames from 'classnames'
import dashIconList from './dashicons'

export default function IconList( props ) {

	return (
		<div class="captain-icons">
			{ dashIconList.map( icon => {
				return (
					<span
						className={ classnames('dashicons', `dashicons-${icon}`) }
						onClick={ () => props.onChange( icon ) }
					>
					</span>
				)
			})}
		</div>
	)
}
