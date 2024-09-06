import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";

import Toolbar from "./toolbar";
import List from "./list";

import "./editor.scss";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { title, ordered } = attributes;

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
				<List {...{ ordered, setAttributes }} />
			</div>
		</Fragment>
	);
}
