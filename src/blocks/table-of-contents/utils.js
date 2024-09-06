import { cleanForSlug } from "@wordpress/url"

// 1. Extract the headings from the content
export function getHeadingsFromContent(blocks) {
  const headings = []
  blocks.map((block) => {
    if (block.name === "core/heading" && block.attributes?.content.length > 0) {
      headings.push({
        clientId: block.clientId,
        level: block.attributes.level,
        content:
          typeof block.attributes.content === "string"
            ? block.attributes.content
            : block.attributes.content.text,
        slug: cleanForSlug(block.attributes.content),
      })
    }

    // Recursion in children blocks
    headings.push(...getHeadingsFromContent(block.innerBlocks))
  })
  return headings
}

// 2. Update the heading blocks anchors with title slug
export function updateHeadingsAnchors(headings, updateBlockAttributes) {
  headings.map((block) => {
    updateBlockAttributes(block.clientId, {
      anchor: block.slug,
    })
  })
}

// 3. Define the hierarchy of the headings
export function buildHeadingHierarchy(headings) {
  const hierarchy = []
  const levelMap = {}

  headings.forEach((heading) => {
    const { clientId, ...headingWithoutClientId } = heading
    const { level } = heading

    // Add the heading to the current level
    levelMap[level] = headingWithoutClientId

    // If the heading is not top level, find its parent
    if (level > 2) {
      const parentLevel = level - 1

      // Get the last heading of the parent level
      const parent = levelMap[parentLevel]

      if (parent) {
        // Initialize children array if it doesn't exist
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(headingWithoutClientId)
      }
    } else {
      // Top level heading, add to the hierarchy
      hierarchy.push(headingWithoutClientId)
    }
  })

  return hierarchy
}
