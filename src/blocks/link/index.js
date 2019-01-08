import "./style.scss"
import "./editor.scss"

import Inspector from './inspect'

const { registerBlockType } = wp.blocks
const { RichText } = wp.editor
const { Fragment } = wp.element

export default registerBlockType(
  'captainwp/link',
  {
    title: 'Lien',
    description: 'Un lien amélioré vers un autre site',
    category: 'common',
    icon: { background: '#48ADD8', foreground: "#fff", src: 'admin-links' },
    keywords: [],
    attributes: {
      title: {
        type: 'string',
        source: 'text',
        selector: '.link__site',
      },
      description: {
        type: 'array',
        source: 'children',
        selector: '.link__desc',
      },
      url: {
        source: 'text',
        selector: '.link__url',
      },
      label: {
        source: 'text',
        selector: '.link__button',
        default: 'Voir le site',
      },
      favicon: {
        source: 'attribute',
        selector: '.link__favicon',
        attribute: 'src',
        default: 'http://capitainewp.local/wp-content/themes/captain/img/favicon.png'
      }
    },
    edit: props => {

      const { attributes: { title, description, url, label, favicon }, setAttributes} = props

      return (
        <Fragment>
          <Inspector { ...{ favicon, setAttributes } } />

          <div className="wp-block-captainwp-link link">
            <div className="link__content">
              <RichText
                tagName="span"
                value={ label }
                className="link__button button button--main"
                onChange={ label => setAttributes( { label } ) }
                placeholder="Voir le site"
                format="string"
              />

              <p class="link__title">
                <img class="link__favicon" src={favicon} alt={title} />

                <RichText
                  tagName="span"
                  value={ title }
                  className="link__site"
                  onChange={ title => setAttributes( { title } ) }
                  placeholder="Nom du site"
                  format="string"
        				/>
              </p>

              <RichText
                tagName="p"
                placeholder="Description"
                value={ description }
                className='link__desc'
                onChange={ description => setAttributes( { description } ) }
      				/>
            </div>

            <div class="link__meta">
              <RichText
                tagName="span"
                value={ url }
                className="link__url"
                onChange={ url => setAttributes( { url } ) }
                placeholder="https://capitainewp.io"
                format="string"
              />
            </div>
          </div>
        </Fragment>
      )
    },
    save: props => {

      const { title, description, url, label, favicon } = props.attributes

      return (
        <div className="link">
          <div className="link__content">
            <a href={url} target="_blank" className="link__button button button--main" rel="noreferrer noopener">{label}</a>
            <p className="link__title">
              <a href={url} target="_blank" rel="noreferrer noopener">
                <img className="link__favicon" alt={title} src={favicon} />
                <span class="link__site">{title}</span>
              </a>
            </p>
            <p className="link__desc">{description}</p>
          </div>
          <div className="link__meta">
            <span className="link__url">{url}</span>
            <a data-pocket-label="pocket" data-pocket-count="none" class="pocket-btn" data-lang="en" data-save-url={url}></a>
            <script dangerouslySetInnerHTML={{__html: `type="text/javascript">!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");`}}></script>
          </div>
        </div>
      )
    },
  }
)
