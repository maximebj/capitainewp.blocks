import { registerBlockType } from '@wordpress/blocks'
import { compose } from '@wordpress/compose'
import { withSelect, withDispatch } from '@wordpress/data'

import './style.scss'

import Edit from './edit'
import Save from './save'

registerBlockType('capitainewp/table-of-contents', {
	attributes: {
		title: {
			source: 'text',
			type: 'string',
			selector: '.wp-block-capitainewp-table-of-contents__title',
			default: 'Sommaire du cours',
		},
		summary: {
			source: 'html',
			selector: '.wp-block-capitainewp-table-of-contents__list',
		},
		ordered: {
			type: 'boolean',
			default: true,
		},
	},
	edit: compose(
		withSelect( select => ({
			blocks: select( 'core/block-editor' ).getBlocks()
		})),
		withDispatch( dispatch => ({
			updateBlockAttributes: dispatch( 'core/block-editor' ).updateBlockAttributes
		}))
	) ( Edit ),
	save: Save,
})
