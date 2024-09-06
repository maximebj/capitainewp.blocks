import { useBlockProps, RichText } from "@wordpress/block-editor"

import "./editor.scss"

export default function Edit(props) {
  const {
    attributes: { title, content },
    setAttributes,
  } = props

  return (
    <div {...useBlockProps()}>
      <RichText
        tagName="p"
        value={title}
        className="wp-block-capitainewp-aparte__title"
        onChange={(title) => setAttributes({ title })}
      />

      <RichText
        tagName="div"
        multiline="p"
        placeholder="Contenu de l'apparté"
        value={content}
        className="wp-block-capitainewp-aparte__content"
        onChange={(content) => setAttributes({ content })}
      />
    </div>
  )
}
