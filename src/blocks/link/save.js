import { useBlockProps } from '@wordpress/block-editor'

export default function Save( props ) {

	const { title, description, url, label, favicon } = props.attributes

	return (
		<div {...useBlockProps.save()}>
			<div className="wp-block-capitainewp-link__content">
				<a href={url} target="_blank" className="wp-block-capitainewp-link__button button button--main" rel="noreferrer noopener">{label}</a>
				<p className="wp-block-capitainewp-link__title">
					<a href={url} target="_blank" rel="noreferrer noopener">
						<img className="wp-block-capitainewp-link__favicon" alt={title} src={favicon} />
						<span class="wp-block-capitainewp-link__site">{title}</span>
					</a>
				</p>
				<p className="wp-block-capitainewp-link__desc">{description}</p>
			</div>
			<div className="wp-block-capitainewp-link__meta">
				<span className="wp-block-capitainewp-link__url">{url}</span>
				<a data-pocket-label="pocket" data-pocket-count="none" class="pocket-btn" data-lang="en" data-save-url={url}></a>
				<script dangerouslySetInnerHTML={{__html: `type="text/javascript">!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");`}}></script>
			</div>
		</div>
	)
}
