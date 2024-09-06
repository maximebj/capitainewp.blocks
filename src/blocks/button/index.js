import { registerBlockType } from "@wordpress/blocks"

import "./style.scss"

import Edit from "./edit"
import Save from "./save"

registerBlockType("capitainewp/button", {
  edit: Edit,
  save: Save,
})
