const { Component } = wp.element;

export default class Preview extends Component {

  state = {
    definition: false
  }

  getPost(id) {
    const api = new wp.api.models.Definitions({ id: id })

    api.fetch()
    .then( result => {
      console.log(result)
      this.setState( { definition: result } )
    })
  }

  componentWillMount() {
    this.getPost(this.props.definitionID)
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.definitionID != this.props.definitionID ) {
      this.getPost( nextProps.definitionID )
    }
  }

  render() {

    const { definition } = this.state

    return (
      definition ? (
        <div className="definition">
          <header className="definition__header">
            { definition.acf.lesson != "" &&
            <a href="{definition.acf.lesson}" target="_blank" className="definition__button editor-button button--main">Cours dédié</a>
            }
            <div className="definition__icon"><span className="dashicons dashicons-book-alt"></span></div>
            <p className="definition__title">{definition.title.rendered}</p>
            <p className="definition__type">Définition</p>
          </header>
          <div className="definition__content">
            <div className="definition__desc">{definition.acf.description}</div>
          </div>
          <div className="definition__meta">
            { definition.acf.translation != "" &&
              <p>Traduction : <strong>{definition.acf.translation}</strong></p>
            }
            { definition.acf.abbreviation != "" &&
              <p>Abréviation : <strong>{definition.acf.abbreviation}</strong></p>
            }
          </div>
        </div>
      ) : (
        <p class="captain-message">Chargement de la définition...</p>
      )
    )
  }

}
