const { Component } = wp.element
const { RichText } = wp.editor
const { Spinner } = wp.components

export default class Preview extends Component {

  state = {
    people: false,
    picture: false
  }

  getPost = () => {

    const { peopleID, content } = this.props

    fetch( `/wp-json/wp/v2/peoples/${peopleID}` )
    .then( response => response.json() )
    .then( post => {
      this.setState( { definition: post } )

      // Featured Media
			if ( typeof post.featured_media != "undefined" && post.featured_media != 0 ) {
				fetch( `/wp-json/wp/v2/media/${post.featured_media}` )
				.then( response => response.json() )
				.then( picture => {
					this.setState( { picture: featuredImage.media_details.sizes.large.source_url } )
				} )
      }
      
    } )
  }

  isFirstLetterVowel = name => {
    return ['a', 'e', 'i', 'o', 'u', 'y'].indexOf(name[0].toLowerCase()) !== -1 ? "d'" : "de "
  }

  componentWillMount() {
    this.getPost()
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.peopleID != this.props.peopleID ) {
      this.getPost()
    }
  }

  render() {

    const { content, setAttributes } = this.props
    const { people, picture } = this.state

    return (
      people ? (
        <div className="wp-block-captainwp-interview interview">

          { picture &&
            <div className="interview__picture">
              <img src={picture} alt={people.title.rendered} />
            </div>
          }

          <div className="interview__awards">
            { people.meta.skill1 &&
              <div className="interview__award interview__award--left">
                <span className="dashicons dashicons-tickets"></span> {people.meta.skill1}
              </div>
            }

            { people.meta.skill2 &&
              <div className="interview__award interview__award--right">
                <span className="dashicons dashicons-awards"></span> {people.meta.skill2}
              </div>
            }
          </div>

          <p className="interview__title">
            Le conseil {' '}
            {this.isFirstLetterVowel(people.title.rendered)}
            <span>{people.title.rendered}</span>
          </p>

          { people.meta.work != "" &&
            <p className="interview__work">{people.meta.work}</p>
          }

          <RichText
            tagName="div"
            multiline="p"
            className='interview__desc'
            value={ content }
            onChange={ content => setAttributes( { content } ) }
            placeholder="Écrivez le contenu du conseil ici !"
            format="string"
  				/>

          <div className="interview__meta">
            { people.meta.twitter != "" &&
              <span>
                Suivez-moi sur Twitter : <a href="https://twitter.com/{people.meta.twitter}" target="_blank">@{people.meta.twitter}</a>
              </span>
            }
            { people.meta.website != "" &&
              <span>
                {' '} • Mon site : <a href="{people.meta.website}" target="_blank">{people.meta.website_name}</a>
              </span>
            }
          </div>

        </div>
      ) : (
        <p class="captain-message">
          <Spinner />
          Chargement de l'interview...
        </p>
      )
    )
  }

}
