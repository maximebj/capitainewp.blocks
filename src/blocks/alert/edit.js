import { useBlockProps, RichText } from '@wordpress/block-editor'
import { Fragment } from '@wordpress/element'
import classnames from 'classnames'

import Inspector from './inspector'
import Toolbar from './toolbar'

import icon from './icons'

import './editor.scss'

export default function Edit( props ) {

	const { attributes, setAttributes } = props
	const { type, content, title, hasIcon } = attributes

	const blockProps = useBlockProps( {
		className: classnames( `is-variation-${type}`, hasIcon && 'has-icon' ),
	} )

	return (
		<Fragment>

			<Inspector { ...{ attributes, setAttributes } } />
			<Toolbar { ...{ attributes, setAttributes } } />

			<div {...blockProps}>

				{ hasIcon && icon[type] }

				<RichText
					tagName="p"
					value={ title }
					className='wp-block-capitainewp-alert__title'
					onChange={ title => setAttributes( { title } ) }
				/>

				<RichText
					tagName="p"
					placeholder={ 'Tapez votre contenu' }
					value={ content }
					className='wp-block-capitainewp-alert__content'
					onChange={ content => setAttributes( { content } ) }
					keepPlaceholderOnFocus="true"
				/>
			</div>

		</Fragment>
	)
}
