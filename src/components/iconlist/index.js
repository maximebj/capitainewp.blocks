import classnames from "classnames"

import dashIconList from "./dashicons"

import "./style.scss"

export default function IconList(props) {
  const { onChange } = props

  return (
    <div class="capitainewp-icons">
      {dashIconList.map((icon) => {
        return (
          <span
            className={classnames("dashicons", `dashicons-${icon}`)}
            onClick={() => onChange(icon)}
          ></span>
        )
      })}
    </div>
  )
}
