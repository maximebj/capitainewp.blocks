import { useBlockProps, RichText } from "@wordpress/block-editor"
import { Fragment } from "@wordpress/element"
import classnames from "classnames"

import Inspector from "./inspector"

import "./editor.scss"

export default function Edit(props) {
  const { attributes, setAttributes } = props
  const { buttonClass, hasIcon, icon, label } = attributes

  return (
    <Fragment>
      <Inspector {...{ attributes, setAttributes }} />

      <p {...useBlockProps()}>
        <div className={classnames("editor-button", `button--${buttonClass}`)}>
          {hasIcon && (
            <span
              className={classnames("dashicons", `dashicons-${icon}`)}
            ></span>
          )}
          <RichText
            tagName="span"
            placeholder="Intitulé du bouton"
            value={label}
            onChange={(label) => setAttributes({ label })}
          />
        </div>
      </p>
    </Fragment>
  )
}
