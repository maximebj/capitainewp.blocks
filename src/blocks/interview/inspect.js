import SearchPost from '../../components/searchpost'

const { Component } = wp.element
const { InspectorControls } = wp.blockEditor
const { PanelBody } = wp.components

export default class Inspector extends Component {

  render() {

    const { setAttributes } = this.props

    return (
      <InspectorControls>

        <PanelBody title="Choix de la personne">

          <SearchPost
						onChange={ peopleID => setAttributes( { peopleID } ) }
            type="peoples"
            placeholder="Chercher une personne"
					/>

        </PanelBody>

      </InspectorControls>
    )
  }
}
