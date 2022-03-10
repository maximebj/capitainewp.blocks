import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/interview', {
	attributes: {
		peopleID: {
			type: 'integer',
		},
		content: {
			type: 'string',
		}
	},
	edit: Edit,
	save: Save,
})
