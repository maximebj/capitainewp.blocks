const { Component } = wp.element;

export default class Preview extends Component {

  state = {
    definition: false
  }

  componentWillMount() {
    this.updatePreview(this.props.definitionID)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.definitionID != this.props.definitionID) {
      this.updatePreview(nextProps.definitionID)
    }
  }

  updatePreview(id) {
    const api = new wp.api.models.Definitions({ id: id })

    api.fetch()
    .then( result => {
      this.setState( { definition: result } )
    })
  }

  render() {
    return (
      this.state.definition ? (
        <div className="definition">
          <header className="definition__header">
            { this.state.definition.acf.lesson != "" &&
            <a href="{this.state.definition.acf.lesson}" target="_blank" className="definition__button editor-button button--main">Cours dédié</a>
            }
            <div className="definition__icon"><span className="dashicons dashicons-book-alt"></span></div>
            <p className="definition__title">{this.state.definition.title.rendered}</p>
            <p className="definition__type">Définition</p>
          </header>
          <div className="definition__content">
            <div className="definition__desc">{this.state.definition.acf.description}</div>
          </div>
          <div className="definition__meta">
            { this.state.definition.acf.translation != "" &&
              <p>Traduction : <strong>{this.state.definition.acf.translation}</strong></p>
            }
            { this.state.definition.acf.abbreviation != "" &&
              <p>Abréviation : <strong>{this.state.definition.acf.abbreviation}</strong></p>
            }
          </div>
        </div>
      ) : (
        <p class="captain-choose">Chargement de la définition...</p>
      )
    )
  }

}
