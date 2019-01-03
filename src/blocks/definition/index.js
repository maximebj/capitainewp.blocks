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
    keywords: [ 'dictionnaire' ],
    attributes: {
      definitionID: {
        type: 'integer',
      },
    },
    edit: ( props ) => {

      const { attributes: { definitionID }, setAttributes } = props

      return (
        <Fragment>
          <Inspector { ...{ setAttributes } } />

          { definitionID ? (
            <Preview { ...{ definitionID } } />
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
