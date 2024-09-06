import { InspectorControls } from "@wordpress/block-editor"
import { PanelBody } from "@wordpress/components"

import SearchPost from "../../components/searchpost"

export default function Inspector(props) {
  const { setAttributes } = props

  return (
    <InspectorControls>
      <PanelBody title="Choix de la personne">
        <SearchPost
          onChange={(peopleID) => setAttributes({ peopleID })}
          postType="peoples"
          placeholder="Chercher une personne"
        />
      </PanelBody>
    </InspectorControls>
  )
}
