import SearchPost from '../../components/searchpost'

const { Component } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody } = wp.components

export default class Inspector extends Component {

  render() {

    const { attributes: { peopleID }, setAttributes } = this.props

    return (
      <InspectorControls>

        <PanelBody title="Choix de la personne">

          <SearchPost
						onChange={ peopleID => setAttributes( { peopleID } ) }
            type="People"
					/>

        </PanelBody>

      </InspectorControls>
    )
  }
}
