import { useBlockProps, RichText } from "@wordpress/block-editor"
import { useSelect, useDispatch } from "@wordpress/data"
import { Fragment, useEffect } from "@wordpress/element"

import {
  getHeadingsFromContent,
  updateHeadingsAnchors,
  buildHeadingHierarchy,
} from "./utils"

import Toolbar from "./toolbar"
import List from "./list"

import "./editor.scss"

export default function Edit(props) {
  const { attributes, setAttributes } = props
  const { title, ordered, headings } = attributes

  // Get all blocks from the editor
  const blocks = useSelect((select) => {
    return select("core/block-editor").getBlocks()
  })

  // The function to update the blocks attributes
  const { updateBlockAttributes } = useDispatch("core/block-editor")

  // Find and update the headings anchors
  useEffect(() => {
    if (!blocks || !updateBlockAttributes) {
      return
    }

    // Extract the list of headings from the content and build the hierarchy
    const newHeadingsList = getHeadingsFromContent(blocks)
    const newHeadingTree = buildHeadingHierarchy(newHeadingsList)

    // Only update state if the new headingsTree is different from the current one
    if (JSON.stringify(newHeadingTree) !== JSON.stringify(headings)) {
      updateHeadingsAnchors(newHeadingsList, updateBlockAttributes)
      setAttributes({ headings: newHeadingTree })
    }
  }, [blocks, updateBlockAttributes])

  return (
    <Fragment>
      <Toolbar {...{ attributes, setAttributes }} />

      <div {...useBlockProps()}>
        <RichText
          tagName="p"
          value={title}
          className="wp-block-capitainewp-table-of-contents__title"
          onChange={(title) => setAttributes({ title })}
        />
        <div className="wp-block-capitainewp-table-of-contents__fold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-up"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>

        {!headings.length && (
          <p className="wp-block-capitainewp-table-of-contents__none">
            Pas de titre pour le moment
          </p>
        )}

        <List
          headings={headings}
          ordered={ordered}
          className="wp-block-capitainewp-table-of-contents__list"
        />
      </div>
    </Fragment>
  )
}
