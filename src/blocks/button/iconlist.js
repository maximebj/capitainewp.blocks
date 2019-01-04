import classnames from 'classnames'
import dashIconList from './dashiconlist'

const { Component } = wp.element

export default class IconList extends Component {

  render() {

    return (
      <div class="captain-icons">
        { dashIconList.map( icon => {
          return (
            <span
              className={ classnames('dashicons', `dashicons-${icon}`) }
              onClick={ () => this.props.onChange( icon ) }
            >
            </span>
          )
        })}
      </div>
    )
  }
}
