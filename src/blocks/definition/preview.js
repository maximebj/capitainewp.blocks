const { Component } = wp.element

export default class Preview extends Component {

  state = {
    definition: false
  }

  getPost = () => {

    const { definitionID } = this.props.attributes

    const postQuery = new wp.api.models.Definitions( { id: definitionID } )

    postQuery.fetch().then( result => {
      this.setState( { definition: result } )
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
        <div className="definition">
          <header className="definition__header">
            { definition.meta.lesson != "" &&
              <a href="{definition.meta.lesson}" target="_blank" className="definition__button editor-button button--main">Cours dédié</a>
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
        <p class="captain-message">Chargement de la définition...</p>
      )
    )
  }
}
