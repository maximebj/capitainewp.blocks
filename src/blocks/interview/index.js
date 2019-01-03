import "./style.scss"
import "./editor.scss"

import Inspector from './inspect'
import Preview from './preview'

const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

export default registerBlockType(
  'captainwp/interview',
  {
    title: 'Interview',
    description: "Afficher une Interview d'un membre de la communauté WordPress",
    category: 'common',
    icon: { background: '#48ADD8', foreground: "#fff", src: 'groups' },
    keywords: [ 'people' ],
    attributes: {
      peopleID: {
        type: 'integer',
      },
      content: {
        type: 'string',
      }
    },
    edit: ( props ) => {

      const { attributes, setAttributes } = props
      const { peopleID, content } = attributes

      return (
        <Fragment>
          <Inspector { ...{ setAttributes } } />

          { peopleID ? (
            <Preview { ...{ peopleID, content, setAttributes } } />
          ) : (
            <p class="captain-message">Recherchez une personne dans l'inspecteur</p>
          ) }
        </Fragment>
      )
    },
    save: props => {
      return null
    }
  }
)
