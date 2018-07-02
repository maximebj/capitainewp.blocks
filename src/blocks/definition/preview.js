const { Component } = wp.element

export default class Preview extends Component {

  state = {
    definition: false,
    meta: false,
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
            { definition.meta.lesson[0] != "" &&
              <a href="{definition.meta.lesson[0]}" target="_blank" className="definition__button editor-button button--main">Cours dédié</a>
            }
            <div className="definition__icon"><span className="dashicons dashicons-book-alt"></span></div>
            <p className="definition__title">{definition.title.rendered}</p>
            <p className="definition__type">Définition</p>
          </header>
          <div className="definition__content">
            <p className="definition__desc">{definition.meta.description[0]}</p>
          </div>
          <div className="definition__meta">
            { definition.meta.translation[0] != "" &&
              <p>Traduction : <strong>{definition.meta.translation[0]}</strong></p>
            }
            { definition.meta.abbreviation[0] != "" &&
              <p>Abréviation : <strong>{definition.meta.abbreviation[0]}</strong></p>
            }
          </div>
        </div>
      ) : (
        <p class="captain-message">Chargement de la définition...</p>
      )
    )
  }
}
