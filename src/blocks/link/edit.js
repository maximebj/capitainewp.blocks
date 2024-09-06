import { useBlockProps, RichText } from "@wordpress/block-editor"
import { TextControl } from "@wordpress/components"
import { Fragment } from "@wordpress/element"

import Inspector from "./inspector"

import "./editor.scss"

export default function Edit(props) {
  const { attributes, setAttributes, isSelected } = props
  const { title, description, url, label, favicon } = attributes

  return (
    <Fragment>
      <Inspector {...{ attributes, setAttributes }} />

      <div {...useBlockProps()}>
        <div className="wp-block-capitainewp-link__content">
          <RichText
            tagName="span"
            value={label}
            className="wp-block-capitainewp-link__button button button--main"
            onChange={(label) => setAttributes({ label })}
            placeholder="Voir le site"
            format="string"
          />

          <p class="wp-block-capitainewp-link__title">
            <img
              class="wp-block-capitainewp-link__favicon"
              src={favicon}
              alt={title}
            />

            <RichText
              tagName="span"
              value={title}
              className="wp-block-capitainewp-link__site"
              onChange={(title) => setAttributes({ title })}
              placeholder="Nom du site"
              format="string"
            />
          </p>

          <RichText
            tagName="p"
            placeholder="Description"
            value={description}
            className="wp-block-capitainewp-link__desc"
            onChange={(description) => setAttributes({ description })}
          />
        </div>

        <div class="wp-block-capitainewp-link__meta">
          {isSelected ? (
            <TextControl
              tagName="span"
              value={url}
              className="wp-block-capitainewp-link__url"
              onChange={(url) => setAttributes({ url })}
              placeholder="https://capitainewp.io"
              format="string"
            />
          ) : (
            <span>{url}</span>
          )}
        </div>
      </div>
    </Fragment>
  )
}
