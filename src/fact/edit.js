import { useBlockProps, RichText } from '@wordpress/block-editor'

import emoji from './emoji'

import './editor.scss'

export default function Edit( props ) {

	const { attributes: { content }, setAttributes } = props

	return (
		<div {...useBlockProps()}>
			<div className="wp-block-capitainewp-fact__container">
				<div className="wp-block-capitainewp-fact__picture">{ emoji }</div>
				<div className="wp-block-capitainewp-fact__content">
					<p className="wp-block-capitainewp-fact__title">Le saviez-vous ?</p>

					<RichText
						tagName="div"
						multiline="p"
						placeholder="Que doit-on savoir ?"
						value={ content }
						className='wp-block-capitainewp-fact__desc'
						onChange={ content => setAttributes( { content } ) }
					/>

				</div>
			</div>
		</div>
	)
}
