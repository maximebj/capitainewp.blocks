const { registerBlockType } = wp.blocks
const { RichText } = wp.editor

export default registerBlockType(
  'captainwp/aparte',
  {
    title: 'Aparté',
    description: 'Un bloc bleu pour une belle aparté',
    category: 'common',
    icon: 'format-status',
    keywords: [],
    attributes: {
      title: {
        type: 'array',
        source: 'children',
        selector: '.aparte__title',
      },
      content: {
        type: 'array',
        source: 'children',
        selector: '.aparte__content',
      },
    },
    edit: props => {

      const onChangeContent = value => {
        props.setAttributes( { content: value } )
      }
      const onChangeTitle = value => {
        props.setAttributes( { title: value } )
      }

      return (
        <div className='aparte'>
          <RichText
            tagName="p"
            value={ props.attributes.title || 'Aparté : ' }
            className='aparte__title'
            onChange={ onChangeTitle }
  				/>

          <RichText
            tagName="div"
            multiline="p"
            placeholder="Contenu de l'apparté"
            value={ props.attributes.content }
            className='aparte__content'
            onChange={ onChangeContent }
            focus = { props.focus }
  				/>
        </div>
      )
    },
    save: props => {
      return (
        <div className="aparte">
          <p className="aparte__title">{ props.attributes.title }</p>
          <div className="aparte__content">{ props.attributes.content }</div>
        </div>
      )
    },
  },
)
