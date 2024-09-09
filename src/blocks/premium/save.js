import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"

import "./style.scss"

export default function Save(props) {
  const blockProps = useBlockProps.save()

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  )
}
