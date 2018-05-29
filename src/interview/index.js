import Inspector from './inspect'
import Preview from './preview'

const { registerBlockType } = wp.blocks

export default registerBlockType(
  'captainwp/interview',
  {
    title: 'Interview',
    description: "Afficher une Interview d'un membre de la communauté WordPress",
    category: 'common',
    icon: 'groups',
    keywords: [
      'plugin',
    ],
    attributes: {
      pluginSlug: {
        type: 'string',
      },
    },
    edit: ({ setAttributes, focus, attributes }) => {

      const onChangeSlug = event => {
        setAttributes( { pluginSlug: event.target.getAttribute('data-slug') } )
      };

      return [
        !! focus && (
          <Inspector onChangeSlug={onChangeSlug} pluginSlug={attributes.pluginSlug} />
        )
				,
        !! attributes.pluginSlug ? (
          <Preview pluginSlug={attributes.pluginSlug} />
        ) : (
          <p class="captain-choose">Recherchez une extension dans l'inspecteur</p>
        )
      ]
    },
    save: props => {
      // Rendered via PHP
      return null
    },
  },
)
