import { BlockControls } from "@wordpress/block-editor"
import { ToolbarGroup, ToolbarButton } from "@wordpress/components"

import types from "./types"

export default function Toolbar(props) {
  const { attributes, setAttributes } = props
  const { type } = attributes

  return (
    <BlockControls>
      <ToolbarGroup>
        {types.map((option) => {
          return (
            <ToolbarButton
              icon={option.icon}
              label={option.title}
              className={`capitainewp-toolbar-icon-${option.slug}`}
              onClick={() =>
                setAttributes({ type: option.slug, title: option.title })
              }
              isPressed={option.slug == type}
            />
          )
        })}
      </ToolbarGroup>
    </BlockControls>
  )
}
