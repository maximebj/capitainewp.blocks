import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/introduction', {
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
	},
	edit: Edit,
	save: Save,
	useOnce: true,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: function ( attributes ) {
					return createBlock( 'capitainewp/introduction', {
							content: attributes.content,
					} )
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: function ( attributes ) {
					return createBlock( 'core/paragraph', {
							content: attributes.content,
					} )
				}
			}
		]
	}
})
