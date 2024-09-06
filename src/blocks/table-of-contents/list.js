export default function List(props) {
  const { headings, ordered, className } = props

  const ListTag = ordered ? "ol" : "ul"

  if (headings.length === 0) {
    return null
  }

  return (
    <ListTag className={className}>
      {headings.map((heading) => (
        <li key={heading.slug}>
          <a href={"#" + heading.link}>{heading.content}</a>
          {heading.children && (
            <List headings={heading.children} ordered={ordered} />
          )}
        </li>
      ))}
    </ListTag>
  )
}
