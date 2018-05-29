import SearchPosts from './searchposts'

const { Component } = wp.element;

const {
  InspectorControls,
} = wp.blocks;

const {
  PanelBody,
} = wp.components;

export default class Inspector extends Component {

  constructor( props ) {
    super( ...arguments )
  }

  render() {
    return (
      <InspectorControls key="inspector">

        <PanelBody title="Choix de la définition">

          <SearchPosts onChangeID={this.props.onChangeID} definitionID={this.props.definitionID } />

        </PanelBody>

      </InspectorControls>
    );
  }

}
