import IconList from './iconlist'

const { Component } = wp.element
const { InspectorControls } = wp.editor
const { PanelBody, ToggleControl, ColorPalette, TextControl } = wp.components

export default class Inspector extends Component {

  render() {

    const { url, isBlank, buttonClass, hasIcon, setAttributes } = this.props

    const colors = [
      { name: 'start',   color: "#83BD71" },
      { name: 'main',    color: "#48ADD8" },
      { name: 'premium', color: "#FF2952" },
      { name: 'gold',    color: "#FFC334" },
      { name: 'soft',    color: "#dddddd" },
    ]

    return (
      <InspectorControls>
        <PanelBody title="Attributs du lien">
          <TextControl
            type="url"
            value={ url }
            onChange={ url => setAttributes( { url } ) }
            placeHolder="https://"
          />
        
          <ToggleControl
            label='Nouvel onglet'
            checked={ isBlank }
            onChange={ () => setAttributes( { isBlank : ! isBlank } ) }
          />
        </PanelBody>

        <PanelBody title='Type de bouton'>
          <ColorPalette 
            colors={ colors } 
            value={ buttonClass }
            onChange={ color => setAttributes( { buttonClass: _.find( colors, { color } ).name } ) }
            disableCustomColors={ true }
          />
        </PanelBody>

        <PanelBody title="Icône">
          
          <ToggleControl
            label='Afficher une icône ?'
            checked={ hasIcon }
            onChange={ () => setAttributes( { hasIcon : ! hasIcon } ) }
          />

          {
            hasIcon && (
              <IconList onChangeIcon={ icon => setAttributes( { icon } ) } />
            )
          }
        </PanelBody>
        

      </InspectorControls>
    )
  }
}
