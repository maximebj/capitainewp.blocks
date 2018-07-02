import {debounce} from 'throttle-debounce'

const { Component, Fragment } = wp.element
const { SelectControl, TextControl } = wp.components

export default class SearchPost extends Component {

  state = {
    results: false,
  }

  onSearch = debounce( 300, search => {

    if( search.length < 3) {
      return
    }

    this.setState( { results: "Chargement..." } )

    const definitionsCollection = new wp.api.collections[this.props.type]()

    definitionsCollection.fetch({
      data: {
        per_page: 10,
        search: search,
      },
    })
    .then( results => {

      if(results.length == 0 ) {
        results = "Aucun résultat"
      }
      this.setState( { results: results } )
    } )
  } )

  render() {

    const { results } = this.state

    return (
      <Fragment>

        <TextControl
					type="search"
					placeholder="Chercher une définition"
					onChange={ value => this.onSearch( value ) }
				/>

        <div className="captain-results">
          { !! results && Array.isArray(results) ?
            (
              <ul>
                { results.map( result => {
                  return (
                    <li onClick={ () => this.props.onChange( result.id ) }>
                      { result.title.rendered }
                    </li>
                  )
                } ) }
              </ul>
            ) : (
              <p>{results}</p>
            )
          }
        </div>
      </Fragment>
    )
  }
}
