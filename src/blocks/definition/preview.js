const { Component } = wp.element
const { Spinner } = wp.components

import classnames from 'classnames'

export default class Preview extends Component {

  state = {
    definition: false
  }

  getPost = () => {

    const { definitionID } = this.props

    fetch( `/wp-json/wp/v2/definitions/${definitionID}` )
    .then( response => response.json() )
    .then( post => {
      this.setState( { definition: post } )
    } )
  }

  componentWillMount() {
    this.getPost()
  }

  componentDidUpdate(lastProps, lastStates) {
    if( lastProps.definitionID != this.props.definitionID ) {
      this.getPost()
    }
  }

  render() {

    const { definition } = this.state

    return (
      definition ? (
        <div className={ classnames( "wp-block-captainwp-definition", "definition") }>
          <header className="definition__header">
            { definition.meta.lesson != "" &&
              <a href="#" target="_blank" className="definition__button editor-button button--main">Cours dédié</a>
            }
            <div className="definition__icon"><span className="dashicons dashicons-book-alt"></span></div>
            <p className="definition__title">{definition.title.rendered}</p>
            <p className="definition__type">Définition</p>
          </header>
          <div className="definition__content">
            <p className="definition__desc">{definition.meta.description}</p>
          </div>
          <div className="definition__meta">
            { definition.meta.translation != "" &&
              <p>Traduction : <strong>{definition.meta.translation}</strong></p>
            }
            { definition.meta.abbreviation != "" &&
              <p>Abréviation : <strong>{definition.meta.abbreviation}</strong></p>
            }
          </div>
        </div>
      ) : (
        <p class="captain-message">
          <Spinner />
          Chargement de la définition...
        </p>
      )
    )
  }
}
