export default function Item(props) {
  const { heading, ordered } = props

  // The node component calls itself if there are children
  const subItems = heading.children?.map((heading) => (
    <Item key={heading.slug} heading={heading} ordered={ordered} />
  ))

  const link = "#" + heading.slug
  const ListTag = ordered ? "ol" : "ul"

  return (
    <li key={heading.slug}>
      <a href={link}>{heading.content}</a>
      {subItems && <ListTag>{subItems}</ListTag>}
    </li>
  )
}
