import { useBlockProps } from "@wordpress/block-editor"

export default function Save(props) {
  const { title, content } = props.attributes

  return (
    <div {...useBlockProps.save()}>
      <p className="wp-block-capitainewp-aparte__title">{title}</p>
      <div className="wp-block-capitainewp-aparte__content">{content}</div>
    </div>
  )
}
