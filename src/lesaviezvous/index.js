import "./style.scss"
import "./editor.scss"

import emoji from './emoji.js'

const { registerBlockType } = wp.blocks
const { RichText } = wp.editor

export default registerBlockType(
  'captainwp/lesaviezvous',
  {
    title: 'Le saviez-vous ?',
    description: 'Pour afficher une information factuelle',
    category: 'common',
    icon: 'smiley',
    keywords: [
      'fait',
      'lesaviezvous'
    ],
    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: '.fact__desc',
      },
    },
    edit: props => {

      const { attributes: { content }, setAttributes } = props

      return (
        <div className="fact">
          <div className="fact__picture">{ emoji }</div>
          <div className="fact__content">
            <p className="fact__title">Le saviez-vous ?</p>
            <RichText
              tagName="div"
              multiline="p"
              placeholder="Que doit-on savoir ?"
              value={ content }
              className='fact__desc'
              onChange={ content => setAttributes( { content } ) }
    				/>
          </div>
        </div>
      )
    },
    save: props => {

      const { content } = props.attributes

      return (
        <div className="fact">
          <div className="fact__picture">{ emoji }</div>
          <div className="fact__content">
            <p className="fact__title">Le saviez-vous ?</p>
            <div className="fact__desc">{ content }</div>
          </div>
        </div>
      )
    }
  }
)
