import { useBlockProps } from '@wordpress/block-editor'

export default function Save( props ) {

	const { title, summary, ordered } = props.attributes

	return (
		<div {...useBlockProps.save()}>
			<p className="wp-block-capitainewp-table-of-contents__title">{title}</p>
			<div className="wp-block-capitainewp-table-of-contents__fold">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
			</div>

			{ ordered && (
					<ol
						role='directory'
						className='wp-block-capitainewp-table-of-contents__list'
						dangerouslySetInnerHTML={ {__html: summary} }
					/>
				) || (
					<ul
						role='directory'
						className='wp-block-capitainewp-table-of-contents__list'
						dangerouslySetInnerHTML={ {__html: summary} }
					/>
				)
			}
		</div>
	)
}
