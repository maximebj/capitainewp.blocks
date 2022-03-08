import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/fact', {
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-capitainewp-fact__desc',
		},
	},
	edit: Edit,
	save: Save,
})
