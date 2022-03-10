import { useBlockProps, RichText } from '@wordpress/block-editor'
import apiFetch from '@wordpress/api-fetch'
import { useState, useEffect } from 'react'

import Message from '../../components/message'

export default function Block( props ) {

	const { attributes, setAttributes } = props
	const { peopleID, content } = attributes

	const [ people, setPeople ] = useState( false );
	const [ picture, setPicture ] = useState( false );

  const getPost = () => {
		apiFetch( { path: `/wp/v2/peoples/${peopleID}` } )
		.then( ( post ) => {
			setPeople( post )

			if( typeof post.meta.photo != "" ) {
				apiFetch( { path: `/wp/v2/media/${post.meta.photo}` } )
				.then( ( picture ) => setPicture( picture.media_details.sizes.thumbnail.source_url ) )
			}
		})
  }

	useEffect( () => getPost(), [ peopleID ] )

	const isFirstLetterVowel = name => {
    return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(name[0].toLowerCase()) !== -1 ? "d'" : "de "
  }

	const blockProps = useBlockProps()

	return (
		people ? (
			<div {...blockProps}>

				{ picture &&
					<div className="wp-block-capitainewp-interview__picture">
						<img src={picture} alt={people.title.rendered} />
					</div>
				}

				<div className="wp-block-capitainewp-interview__awards">
					{ people.meta.skill1 &&
						<div className="wp-block-capitainewp-interview__award wp-block-capitainewp-interview__award--left">
							<span className="dashicons dashicons-tickets"></span> {people.meta.skill1}
						</div>
					}

					{ people.meta.skill2 &&
						<div className="wp-block-capitainewp-interview__award wp-block-capitainewp-interview__award--right">
							<span className="dashicons dashicons-awards"></span> {people.meta.skill2}
						</div>
					}
				</div>

				<p className="wp-block-capitainewp-interview__title">
					Le conseil {' '}
					{isFirstLetterVowel(people.title.rendered)}
					<span>{people.title.rendered}</span>
				</p>

				{ people.meta.work != "" &&
					<p className="wp-block-capitainewp-interview__work">{people.meta.work}</p>
				}

				<RichText
					tagName="div"
					multiline="p"
					className='wp-block-capitainewp-interview__desc'
					value={ content }
					onChange={ content => setAttributes( { content } ) }
					placeholder="Écrivez le contenu du conseil ici !"
					format="string"
				/>

				<div className="wp-block-capitainewp-interview__meta">
					{ people.meta.twitter != "" &&
						<span>
							Suivez-moi sur Twitter : <a href="https://twitter.com/{people.meta.twitter}" target="_blank">@{people.meta.twitter}</a>
						</span>
					}
					{ people.meta.website != "" &&
						<span>
							{' '} • Mon site : <a href="{people.meta.website}" target="_blank">{people.meta.website_name}</a>
						</span>
					}
				</div>

			</div>
		) : (
			<Message
				withSpinner='true'
				label="Chargement de l’interview…"
			/>
		)
  )
}
