import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"

import "./editor.scss"

export default function Edit(props) {
  return (
    <div {...useBlockProps()}>
      <InnerBlocks />
    </div>
  )
}
