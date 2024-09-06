import { Fragment } from "@wordpress/element"

import Inspector from "./inspector"
import Block from "./block"
import Message from "../../components/message"

import "./editor.scss"

export default function Edit(props) {
  const {
    attributes: { definitionID },
    setAttributes,
  } = props

  return (
    <Fragment>
      <Inspector {...{ setAttributes }} />

      {definitionID ? (
        <Block {...{ definitionID }} />
      ) : (
        <Message label="Choisissez une définition dans l'inspecteur →" />
      )}
    </Fragment>
  )
}
