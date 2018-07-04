import SearchPost from '../../components/searchpost'

const { Component } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody, TextControl } = wp.components

export default class Inspector extends Component {

  render() {

    const { favicon, setAttributes } = this.props

    return (
      <InspectorControls>

        <PanelBody title="Choix du Favicon">

          <TextControl
            placeholder='http://capitainewp.local/wp-content/themes/captain/img/favicon.png'
            value={ favicon }
            onChange={ favicon => setAttributes( { favicon } ) }
          />

        </PanelBody>

      </InspectorControls>
    )
  }
}
