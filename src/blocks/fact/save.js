import { useBlockProps } from "@wordpress/block-editor"

import emoji from "./emoji"

export default function Save(props) {
  const { content } = props.attributes

  return (
    <div {...useBlockProps.save()}>
      <div className="wp-block-capitainewp-fact__container">
        <div className="wp-block-capitainewp-fact__picture">{emoji}</div>
        <div className="wp-block-capitainewp-fact__content">
          <p className="wp-block-capitainewp-fact__title">Le saviez-vous ?</p>
          <div className="wp-block-capitainewp-fact__desc">{content}</div>
        </div>
      </div>
    </div>
  )
}
