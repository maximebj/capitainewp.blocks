import "./style.scss"
import "./editor.scss"

import classnames from 'classnames'
import Inspector from './inspect'

const { registerBlockType } = wp.blocks
const { RichText } = wp.editor
const { Fragment } = wp.element

export default registerBlockType(
  'captainwp/button',
  {
    title: '+ Bouton',
    description: 'Bouton amélioré spécial Capitaine',
    category: 'common',
    icon: { background: '#48ADD8', foreground: "#fff", src: 'external' },
    keywords: [
      'button',
    ],
    attributes: {
      label: {
        type: 'string',
        source: 'text',
        selector: 'a',
      },
      url: {
        source: 'attribute',
        attribute: 'href',
        selector: 'a',
      },
      icon: {
        source: 'attribute',
        attribute: 'data-icon',
        selector: '.dashicons',
        default: 'download',
      },
      hasIcon: {
        type: 'boolean',
        default: true,
      },
      isBlank: {
        type: 'boolean',
        default: true,
      },
      buttonClass: {
        default: 'start',
      },
    },
    edit: props => {

      const { attributes: { url, buttonClass, hasIcon, icon, isBlank, label}, setAttributes } = props

      return (
        <Fragment>
          <Inspector { ...{ url, isBlank, buttonClass, hasIcon, setAttributes } } />
  
          <p className="wp-block-captainwp-button">
            <div className={ classnames( 'editor-button', `button--${buttonClass}`) }>
              { hasIcon && (
                <span className={ classnames( 'dashicons', `dashicons-${icon}`) }></span>
              ) }
              <RichText
                tagName="span"
                placeholder="Intitulé du bouton"
                value={ label }
                onChange={ label => setAttributes( { label } ) }
              />
            </div>
          </p>
        </Fragment>
      )
    },
    save: props => {

      const { buttonClass, hasIcon, icon, label, url, isBlank } = props.attributes

      return (
        <p>
          <a
            href={ url }
            target={ isBlank && '_blank' }
            className={ classnames( 'button', `button--${buttonClass}` ) }
            data-type={ buttonClass }
          >
            { !! hasIcon && (
              <span
                className={ classnames( 'dashicons', `dashicons-${icon}` ) }
                data-icon={ icon }
              >
              </span>
              )
            }
            <span>{ label }</span>
          </a>
        </p>
      )
    },
  },
);
