import classnames from 'classnames'
import Inspector from './inspect'

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

export default registerBlockType(
  'captainwp/button',
  {
    title: 'Bouton',
    description: 'Bouton amélioré spécial Capitaine',
    category: 'common',
    icon: 'external',
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
        source: 'attribute',
        attribute: 'data-type',
        selector: 'a',
        default: 'start',
      },
    },
    edit: props => {

      const onChangeLabel = value => {
        props.setAttributes( { label: value } )
      };

      const onChangeURL = value => {
        props.setAttributes( { url: value } );
      };

      const onChangeIcon = value => {
        props.setAttributes( { icon: value } );
      };

      const toggleTarget = () => {
        props.setAttributes( { isBlank: ! props.attributes.isBlank } );
      }

      const toggleHasIcon = () => {
        props.setAttributes( { hasIcon: ! props.attributes.hasIcon } );
      }

      const onChangeClass = event => {
        props.setAttributes( { buttonClass: event.target.value } );
      }

      return [
        !! props.focus && (
          <Inspector { ...{ onChangeClass, onChangeIcon, onChangeURL, toggleHasIcon, toggleTarget, ...props} } />
        )
				,
        <p className={ props.className }>
          <div className={ classnames('editor-button', `button--${props.attributes.buttonClass}`) }>
            { !! props.attributes.hasIcon && (
              <span className={ classnames('dashicons', `dashicons-${props.attributes.icon}`) }></span>
              )
            }
            <RichText
              tagName="span"
              placeholder="Intitulé du bouton"
              value={ props.attributes.label }
              onChange={ onChangeLabel }
              focus = { props.focus }
            />
          </div>
        </p>
      ]
    },
    save: props => {
      return (
        <p>
          <a
            href={ props.attributes.url }
            target={ props.attributes.isBlank && '_blank' }
            className={ classnames('button', `button--${props.attributes.buttonClass}`) }
            data-type={ props.attributes.buttonClass }
          >
            { !! props.attributes.hasIcon && (
              <span
                className={ classnames('dashicons', `dashicons-${props.attributes.icon}`) }
                data-icon={ props.attributes.icon }
              >
              </span>
              )
            }
            <span>{ props.attributes.label }</span>
          </a>
        </p>
      )
    },
  },
);
