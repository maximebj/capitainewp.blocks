import { useEffect } from 'react'

import Item from './item'

export default function List( props ) {

	const { headings, ordered, setAttributes } = props

	// Save the markup in attributes
	const getSummary = () => {
		const summary = document.querySelector('.wp-block-capitainewp-table-of-contents__list').innerHTML
		setAttributes( { summary } )
	}

	useEffect( () => getSummary(), [ headings ] )

	// Define the markup
	let markup = headings.map( heading => {
		return(
			<Item
				key={heading.data.clientId}
				heading={heading}
				children={heading.children}
				ordered={ordered}
			/>
		)
	} )

	return (
		headings.length < 1 && (
			<li className="wp-block-capitainewp-table-of-contents__none">
				Pas de titre pour le moment
			</li>
		) || markup
	)
}
