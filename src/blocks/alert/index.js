import { registerBlockType, createBlock } from "@wordpress/blocks"

import Edit from "./edit"
import Save from "./save"

import types from "./types"

import "./style.scss"

registerBlockType("capitainewp/alert", {
  attributes: {
    type: {
      source: "attribute",
      selector: ".wp-block-capitainewp-alert",
      attribute: "data-type",
      default: types[0].slug,
    },
    title: {
      source: "text",
      type: "string",
      selector: ".wp-block-capitainewp-alert__title",
      default: types[0].title,
    },
    hasIcon: {
      type: "boolean",
      default: true,
    },
    content: {
      type: "array",
      source: "children",
      selector: ".wp-block-capitainewp-alert__content",
    },
  },
  edit: Edit,
  save: Save,
  styles: [
    {
      name: "default",
      label: "Fond coloré",
      isDefault: true,
    },
    {
      name: "line",
      label: "Ligne supérieure",
    },
  ],
  transforms: {
    from: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: function (attributes) {
          return createBlock("capitainewp/alert", {
            content: attributes.content,
          })
        },
      },
    ],
    to: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: function (attributes) {
          return createBlock("core/paragraph", {
            content: attributes.content,
          })
        },
      },
    ],
  },
})
