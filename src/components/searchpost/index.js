import {debounce} from 'throttle-debounce'

const { Component, Fragment } = wp.element
const { TextControl } = wp.components

export default class SearchPost extends Component {

  state = {
    results: false,
  }

  onSearch = debounce( 300, search => {

    if( search.length < 3 ) {
      return
    }

    this.setState( { results: "Chargement..." } )

    fetch( `/wp-json/wp/v2/${this.props.type}/?search=${encodeURI( search )}&per_page=20` )
    .then( response => response.json() )
    .then( results => {

      if( results.length == 0 ) {
        results = "Aucun résultat"
      }
      this.setState( { results } )
    } )
  } )

  render() {

    const { results } = this.state

    return (
      <Fragment>

        <TextControl
					type="search"
					placeholder={ this.props.placeholder }
					onChange={ value => this.onSearch( value ) }
				/>

        <div className="captain-results">
          { !! results && Array.isArray(results) ?
            (
              <ul>
                { results.map( result => {
                  return (
                    <li 
                      key={ result.id }
                      onClick={ () => this.props.onChange( result.id ) }
                    >
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
