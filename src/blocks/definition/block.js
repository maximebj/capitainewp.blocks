import apiFetch from '@wordpress/api-fetch'
import { useBlockProps } from '@wordpress/block-editor'
import { useState, useEffect } from 'react'

import Message from '../../components/message'

export default function Block( props ) {

	const { definitionID } = props
	const [ definition, setDefinition ] = useState( false );

  const getPost = () => {
		apiFetch( { path: `/wp/v2/definitions/${definitionID}` } )
		.then( ( post ) => setDefinition( post ) )
  }

	useEffect( () => getPost(), [ definitionID ] )

	const blockProps = useBlockProps()

	return (
		definition ? (
			<div {...blockProps}>
				<header className="wp-block-capitainewp-definition__header">
					{ definition.meta.lesson != "" &&
						<a href="#" target="_blank" className="wp-block-capitainewp-definition__button editor-button button--main">Cours dédié</a>
					}
					<div className="wp-block-capitainewp-definition__icon"><span className="dashicons dashicons-book-alt"></span></div>
					<p className="wp-block-capitainewp-definition__title">{definition.title.rendered}</p>
					<p className="wp-block-capitainewp-definition__type">Définition</p>
				</header>
				<div className="wp-block-capitainewp-definition__content">
					<p className="wp-block-capitainewp-definition__desc">{definition.meta.description}</p>
				</div>
				<div className="wp-block-capitainewp-definition__meta">
					{ definition.meta.translation != "" &&
						<p>Traduction : <strong>{definition.meta.translation}</strong></p>
					}
					{ definition.meta.abbreviation != "" &&
						<p>Abréviation : <strong>{definition.meta.abbreviation}</strong></p>
					}
				</div>
			</div>
		) : (
			<Message
				withSpinner='true'
				label="Chargement de la définition…"
			/>
		)
	)
}
