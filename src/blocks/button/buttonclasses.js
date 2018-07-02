const { Component } = wp.element

const classes = [
  {
    className: 'start',
    color: "#83BD71"
  },
  {
    className: 'main',
    color: "#48ADD8"
  },
  {
    className:'premium',
    color: "#FF2952"
  },
  {
    className:'gold',
    color: "#FFC334"
  },
  {
    className:'soft',
    color: "#dddddd"
  },
]

export default class ButtonClasses extends Component {

  render() {
    return (
      <div className="blocks-color-palette">
        { classes.map( classes => {
          return (
            <div className="blocks-color-palette__item-wrapper">
              <button
                type="button"
                className="blocks-color-palette__item"
                style={{ 'color': classes.color }}
                value={ classes.className }
                onClick={ this.props.onChangeClass }
              >
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}
