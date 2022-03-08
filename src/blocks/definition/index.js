import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/definition', {
	attributes: {
		definitionID: {
			type: 'integer',
		},
	},
	edit: Edit,
	save: Save,
})
