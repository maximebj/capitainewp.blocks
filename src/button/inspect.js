import ButtonClasses from './buttonclasses'
import IconList from './iconlist'

const { Component } = wp.element
const {
  InspectorControls,
  BlockDescription,
  UrlInput,
} = wp.editor
const {
  PanelBody,
  PanelRow,
  FormToggle,
} = wp.components

export default class Inspector extends Component {

  render() {
    return (
      <InspectorControls>
        <h3>Attributs du lien</h3>
        <p>URL</p>

        <UrlInput
          className="url"
          value={ this.props.attributes.url }
          onChange={ this.props.onChangeURL }
        />

        <PanelRow>
          <label
            htmlFor="target-form-toggle"
            className="blocks-base-control__label"
          >
            Nouvel onglet
          </label>
          <FormToggle
            id="target-form-toggle"
            label='Nouvel onglet'
            checked={ !! this.props.attributes.isBlank }
            onChange={ this.props.toggleTarget }
          />
        </PanelRow>

        <PanelBody
          title='Type de bouton'
        >

          <ButtonClasses onChangeClass={this.props.onChangeClass} />
        </PanelBody>

        <PanelBody
          title='Icône'
        >

          <PanelRow>
            <label
              htmlFor="icon-form-toggle"
              className="blocks-base-control__label"
            >
              Afficher une icône ?
            </label>
            <FormToggle
              id="icon-form-toggle"
              label='Afficher une icône ?'
              checked={ !! this.props.attributes.hasIcon }
              onChange={ this.props.toggleHasIcon }
            />
          </PanelRow>

          {
            !! this.props.attributes.hasIcon && (
              <IconList onChangeIcon={ this.props.onChangeIcon } />
            )
          }

        </PanelBody>

      </InspectorControls>
    )
  }
}
