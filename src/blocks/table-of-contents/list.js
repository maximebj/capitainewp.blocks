import { useState, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";

import {
	getHeadingsFromContent,
	updateHeadingsAnchors,
	buildHeadingHierarchy,
} from "./utils";

import ListItems from "./listitems";

export default function List(props) {
	const { ordered, setAttributes } = props;

	const [headingsTree, setHeadingsTree] = useState([]);

	// Get all blocks on the page
	const blocks = useSelect((select) => {
		return select("core/block-editor").getBlocks();
	});

	// The fonction to update the blocks attributes
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	// Find and update the headings anchors
	useEffect(() => {
		if (!blocks || !updateBlockAttributes) {
			return;
		}

		const headings = getHeadingsFromContent(blocks);
		updateHeadingsAnchors(headings, updateBlockAttributes);
		setHeadingsTree(buildHeadingHierarchy(headings));
	}, [blocks, updateBlockAttributes]);

	// Save the markup
	useEffect(() => {
		const summary = document.querySelector(
			".wp-block-capitainewp-table-of-contents__list",
		).innerHTML;
		setAttributes({ summary });
	}, [headingsTree]);

	const ListTag = ordered ? "ol" : "ul";

	return (
		<ListTag className="wp-block-capitainewp-table-of-contents__list">
			<ListItems {...{ headingsTree, ordered }} />
		</ListTag>
	);
}
