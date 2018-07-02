const { Component } = wp.element
const { RichText } = wp.editor

export default class Preview extends Component {

  state = {
    people: false,
    picture: false
  }

  getPost = () => {

    const { peopleID } = this.props.attributes

    const postQuery = new wp.api.models.People( { id: peopleID } )

    postQuery.fetch().then( result => {

      this.setState( { people: result } )

      // Get picture
      const pictureQuery = new wp.api.models.Media( { id: result.meta.photo } )

      pictureQuery.fetch().then( result => {
        this.setState( { picture: result.media_details.sizes.thumbnail.source_url } )
      })
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

    const { attributes: { content }, setAttributes } = this.props
    const { people, picture } = this.state

    return (
      people ? (
        <div className="interview">

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
        <p className="captain-message">Chargement de la personne...</p>
      )
    )
  }

}
