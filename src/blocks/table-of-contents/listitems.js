import Item from "./item"

export default function List(props) {
  const { headingsTree, ordered } = props

  return headingsTree.length > 0 ? (
    headingsTree.map((heading) => (
      <Item key={heading.slug} heading={heading} ordered={ordered} />
    ))
  ) : (
    <li className="wp-block-capitainewp-table-of-contents__none">
      Pas de titre pour le moment
    </li>
  )
}
