import classnames from 'classnames'
import dashIconList from './dashiconlist'

const { Component } = wp.element

export default class IconList extends Component {

  render() {

    return (
      <div class="captain-buttons">
        { dashIconList.map( value => {
          return (
            <span
              className={ classnames('dashicons', `dashicons-${value}`) }
              onClick={ () => this.props.onChangeIcon(icon) }
            >
            </span>
          )
        })}
      </div>
    )
  }
}
