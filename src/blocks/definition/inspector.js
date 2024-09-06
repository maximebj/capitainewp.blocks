import { InspectorControls } from "@wordpress/block-editor"
import { PanelBody } from "@wordpress/components"

import SearchPost from "../../components/searchpost"

export default function Inspector(props) {
  const { setAttributes } = props

  return (
    <InspectorControls>
      <PanelBody title="Choix de la définition">
        <SearchPost
          onChange={(definitionID) => setAttributes({ definitionID })}
          postType="definitions"
          placeholder="Chercher une définition"
        />
      </PanelBody>
    </InspectorControls>
  )
}
