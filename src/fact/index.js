const { registerBlockType } = wp.blocks
const { RichText } = wp.editor

export default registerBlockType(
  'captainwp/fact',
  {
    title: 'Le saviez-vous ?',
    description: 'Pour afficher une information factuelle',
    category: 'common',
    icon: 'smiley',
    keywords: [
      'fait'
    ],
    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: '.fact__desc',
      },
    },
    edit: props => {

      const onChangeContent = value => {
        props.setAttributes( { content: value } )
      }

      return (
        <div className="fact">
          <img className="fact__picture" src={ capitaineGlobals.theme_url+"/img/emoji.svg" } alt="Le saviez-vous ?" />
          <div className="fact__content">
            <p className="fact__title">Le saviez-vous ?</p>
            <RichText
              tagName="div"
              multiline="p"
              placeholder="Que doit-on savoir ?"
              value={ props.attributes.content }
              className='fact__desc'
              onChange={ onChangeContent }
              focus = { props.focus }
    				/>
          </div>
        </div>
      )
    },
    save: props => {
      return (
        <div className="fact">
          <img className="fact__picture" src={ capitaineGlobals.theme_url+"/img/emoji.svg" } alt="Le saviez-vous ?" />
          <div className="fact__content">
            <p className="fact__title">Le saviez-vous ?</p>
            <div className="fact__desc">{ props.attributes.content }</div>
          </div>
        </div>
      )
    }
  }
)
