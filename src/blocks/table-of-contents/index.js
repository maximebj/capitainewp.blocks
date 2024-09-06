import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";

import Edit from "./edit";
import Save from "./save";

registerBlockType("capitainewp/table-of-contents", {
	attributes: {
		title: {
			source: "text",
			type: "string",
			selector: ".wp-block-capitainewp-table-of-contents__title",
			default: "Sommaire du cours",
		},
		summary: {
			source: "html",
			selector: ".wp-block-capitainewp-table-of-contents__list",
		},
		ordered: {
			type: "boolean",
			default: true,
		},
	},
	edit: Edit,
	save: Save,
});
