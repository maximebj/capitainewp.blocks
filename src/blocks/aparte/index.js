import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/aparte', {
	attributes: {
		title: {
			type: 'string',
			selector: '.wp-block-capitainewp-aparte__title',
			default: 'Aparté: ',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-capitainewp-aparte__content',
		},
	},
	edit: Edit,
	save: Save,
})
