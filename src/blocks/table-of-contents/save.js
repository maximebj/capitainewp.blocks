import { useBlockProps } from "@wordpress/block-editor"

import List from "./list"

export default function Save(props) {
  const { title, headings, ordered } = props.attributes

  // Don't save the table of contents if there are no headings
  if (headings.length === 0) {
    return null
  }

  return (
    <div {...useBlockProps.save()}>
      <p className="wp-block-capitainewp-table-of-contents__title">{title}</p>
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

      <List
        headings={headings}
        ordered={ordered}
        className="wp-block-capitainewp-table-of-contents__list"
      />
    </div>
  )
}
