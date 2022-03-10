import { registerBlockType } from '@wordpress/blocks'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/link', {
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.wp-block-capitainewp-link__site',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-capitainewp-link__desc',
		},
		url: {
			source: 'text',
			selector: '.wp-block-capitainewp-link__url',
		},
		label: {
			source: 'text',
			selector: '.wp-block-capitainewp-link__button',
			default: 'Voir le site',
		},
		favicon: {
			source: 'attribute',
			selector: '.wp-block-capitainewp-link__favicon',
			attribute: 'src',
			default: 'http://capitainewp.io/wp-content/themes/captain/img/favicon.png'
		}
	},
	edit: Edit,
	save: Save,
})
