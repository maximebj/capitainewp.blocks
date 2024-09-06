import { registerBlockType } from "@wordpress/blocks"

import "./style.scss"

import Edit from "./edit"
import Save from "./save"

registerBlockType("capitainewp/aparte", {
  edit: Edit,
  save: Save,
})
