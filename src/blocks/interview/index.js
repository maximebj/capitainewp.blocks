import "./style.scss"
import "./editor.scss"

import Inspector from './inspect'
import Preview from './preview'

const { registerBlockType } = wp.blocks

export default registerBlockType(
  'captainwp/interview',
  {
    title: 'Interview',
    description: "Afficher une Interview d'un membre de la communauté WordPress",
    category: 'common',
    icon: { background: '#48ADD8', foreground: "#fff", src: 'groups' },
    keywords: [ 'plugin' ],
    attributes: {
      pluginSlug: {
        type: 'string',
      },
    },
    edit: ( props ) => {

      const onChangeSlug = event => {
        setAttributes( { pluginSlug: event.target.getAttribute('data-slug') } )
      };

      return (

          <Inspector onChangeSlug={onChangeSlug} pluginSlug={attributes.pluginSlug} />

        { attributes.pluginSlug ? (
          <Preview pluginSlug={attributes.pluginSlug} />
        ) : (
          <p class="captain-message">Recherchez une extension dans l'inspecteur</p>
        ) }
      )
    },
    save: props => {
      return null
    }
  }
)
