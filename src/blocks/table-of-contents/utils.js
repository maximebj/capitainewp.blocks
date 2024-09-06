import { cleanForSlug } from "@wordpress/url";

// 1. Extract the headings from the content
export function getHeadingsFromContent(blocks) {
	const headings = [];
	blocks.map((block) => {
		if (block.name === "core/heading" && block.attributes?.content.length > 0) {
			headings.push({
				clientId: block.clientId,
				level: block.attributes.level,
				content: block.attributes.content.text,
				slug: cleanForSlug(block.attributes.content),
			});
		}

		// Recursion in children blocks
		headings.push(...getHeadingsFromContent(block.innerBlocks));
	});
	return headings;
}

// 2. Update the heading blocks anchors with title slug
export function updateHeadingsAnchors(headings, updateBlockAttributes) {
	headings.map((block) => {
		updateBlockAttributes(block.clientId, {
			anchor: block.slug,
		});
	});
}

// 3. Define the hierarchy of the headings
export function buildHeadingHierarchy(headings) {
	const hierarchy = [];
	const levelMap = {};

	headings.forEach((heading) => {
		const { level } = heading;

		// Initialize the level in the map if it doesn't exist
		if (!levelMap[level]) {
			levelMap[level] = [];
		}

		// Add the heading to the current level
		levelMap[level].push(heading);

		// If the heading is not top level, find its parent
		if (level > 2) {
			const parentLevel = level - 1;

			// Get the last heading of the parent level
			const parent = levelMap[parentLevel]?.[levelMap[parentLevel].length - 1];

			if (parent) {
				// Initialize children array if it doesn't exist
				if (!parent.children) {
					parent.children = [];
				}
				parent.children.push(heading);
			}
		} else {
			// Top level heading, add to the hierarchy
			hierarchy.push(heading);
		}
	});

	return hierarchy;
}
