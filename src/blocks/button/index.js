import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/button', {
	attributes: {
		label: {
			type: 'string',
			source: 'text',
			selector: 'a',
		},
		url: {
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
		icon: {
			source: 'attribute',
			attribute: 'data-icon',
			selector: '.dashicons',
			default: 'download',
		},
		hasIcon: {
			type: 'boolean',
			default: true,
		},
		isBlank: {
			type: 'boolean',
			default: true,
		},
		buttonClass: {
			default: 'start',
		},
	},
	edit: Edit,
	save: Save,
})
