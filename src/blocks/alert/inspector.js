import { InspectorControls } from "@wordpress/block-editor"
import { PanelBody, ToggleControl } from "@wordpress/components"

export default function Inspector(props) {
  const { attributes, setAttributes } = props
  const { hasIcon } = attributes

  return (
    <InspectorControls>
      <PanelBody title={"Personnaliser"}>
        <ToggleControl
          label={"Afficher l’icône"}
          checked={hasIcon}
          onChange={() => setAttributes({ hasIcon: !hasIcon })}
        />
      </PanelBody>
    </InspectorControls>
  )
}
