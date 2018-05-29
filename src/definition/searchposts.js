import {debounce} from 'throttle-debounce'

const { Component } = wp.element

export default class SearchPosts extends Component {

  state = {
    results: false,
  }

    // this.onSearch = this.onSearch.bind(this)
    // this.performSearch = debounce(300, this.performSearch)

  onSearch( event ) {
    this.performSearch( event.target.value)
  }

  performSearch( search ) {

    if( search.length < 3) {
      return
    }

    this.setState( { results: "Chargement..." } )

    const definitionsCollection = new wp.api.collections.Definitions()

    definitionsCollection.fetch({
      data: {
        per_page: 100,
        search: search,
      },
    })
    .then( results => {

      if(results.length == 0 ) {
        results = "Aucun résultat"
      }
      this.setState( { results: results } )
    })
  }

  render() {
    return (
      <div>
        <input
          type="search"
          placeholder="Chercher une définition"
          className="blocks-text-control__input"
          onChange={ this.onSearch }
        />

        <div className="captain-results">

          { !! this.state.results && Array.isArray(this.state.results) ?
            (
              <ul>
                { this.state.results.map( result => {
                  return (
                    <li
                      data-ID={ result.id }
                      onClick={ this.props.onChangeID }
                    >
                      { result.title.rendered }
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p>{this.state.results}</p>
            )
          }
        </div>
      </div>
    )
  }
}
