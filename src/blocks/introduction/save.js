import { useBlockProps } from "@wordpress/block-editor"

export default function Save(props) {
  const { content } = props.attributes

  return (
    <div {...useBlockProps.save()}>
      <p>{content}</p>
    </div>
  )
}
