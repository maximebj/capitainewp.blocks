import { useState, useEffect } from "@wordpress/element"
import { useSelect, useDispatch } from "@wordpress/data"

import {
  getHeadingsFromContent,
  updateHeadingsAnchors,
  buildHeadingHierarchy,
} from "./utils"

import ListItems from "./listitems"

export default function List(props) {
  const { headings, ordered, setAttributes } = props

  // State to store the headings tree
  const [headingsTree, setHeadingsTree] = useState([])

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

    const newHeadingsTree = getHeadingsFromContent(blocks)
    updateHeadingsAnchors(newHeadingsTree, updateBlockAttributes)
    setHeadingsTree(buildHeadingHierarchy(newHeadingsTree))
  }, [blocks, updateBlockAttributes])

  // Only update attribute if the new headingsTree is different from the current one
  useEffect(() => {
    if (JSON.stringify(headingsTree) === JSON.stringify(headings)) {
      return
    }

    setAttributes({ headings: headingsTree })
  }, [headingsTree])

  const ListTag = ordered ? "ol" : "ul"

  return (
    <ListTag className="wp-block-capitainewp-table-of-contents__list">
      <ListItems headingsTree={headingsTree} ordered={ordered} />
    </ListTag>
  )
}
