import SearchPost from '../../components/searchpost'

const { Component } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody } = wp.components

export default class Inspector extends Component {

  render() {

    const { setAttributes } = this.props

    return (
      <InspectorControls>

        <PanelBody title="Choix de la définition">

          <SearchPost
						onChange={ definitionID => setAttributes( { definitionID } ) }
            type="definitions"
            placeholder="Chercher une définition"
					/>

        </PanelBody>

      </InspectorControls>
    )
  }
}
