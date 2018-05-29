import Inspector from './inspect'
import Preview from './preview'

const { registerBlockType } = wp.blocks

export default registerBlockType(
  'captainwp/definition',
  {
    title: 'Définition',
    description: 'Afficher une définition',
    category: 'common',
    icon: 'book-alt',
    keywords: [
      'definition',
    ],
    attributes: {
      definitionID: {
        type: 'string',
      },
    },
    edit: ({ setAttributes, focus, attributes }) => {

      const onChangeID = event => {
        setAttributes( { definitionID: event.target.getAttribute('data-ID') } )
      }

      return [
        !! focus && (
          <Inspector onChangeID={onChangeID} definitionID={attributes.definitionID} />
        )
				,
        !! attributes.definitionID ? (
          <Preview definitionID={attributes.definitionID} />
        ) : (
          <p class="captain-choose">Choisissez une définition dans l'inspecteur</p>
        )
      ]
    },
    save: props => {
      // Rendered via PHP
      return null
    },
  },
)
