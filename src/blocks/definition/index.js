import "./style.scss"
import "./editor.scss"

import Inspector from './inspect'
import Preview from './preview'

const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

export default registerBlockType(
  'captainwp/definition',
  {
    title: 'Définition',
    description: 'Afficher une définition',
    category: 'common',
    icon: { background: '#48ADD8', foreground: "#fff", src: 'book-alt' },
    keywords: [
      'definition',
    ],
    attributes: {
      definitionID: {
        type: 'string',
      },
    },
    edit: ( props ) => {

      const { attributes, setAttributes } = props
      const { definitionID } = attributes

      return (
        <Fragment>
          <Inspector { ...{ attributes, setAttributes } } />
          { definitionID ? (
            <Preview { ...{ attributes } } />
          ) : (
            <p class="captain-message">Choisissez une définition dans l'inspecteur</p>
          ) }
        </Fragment>
      )
    },
    save: props => {
      return null
    }
  }
)
