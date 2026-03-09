import { FormField, ManyToOneField } from "../../models";
import isrc from './isrc';
import isrl from './isrl';
import isrs from './isrs';
import isrt from './isrt';
export default {
  collection: "iscrizione",
  fields() {
    return [
      new ManyToOneField({
        name: "isrc",
        label: "ISRC",
        value: null,
        related: "isrc",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.isrc}`;
        },
        fields: isrc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isrc: { _contains: text } };
        },
      }),     new ManyToOneField({
        name: "isrl",
        label: "isrl",
        value: null,
        related: "isrl",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.isrl}`;
        },
        fields: isrl.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isrl: { _contains: text } };
        },
      }),  new ManyToOneField({
        name: "isrs",
        label: "isrs",
        value: null,
        related: "isrs",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.isrs}`;
        },
        fields: isrs.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isrs: { _contains: text } };
        },
      }), new ManyToOneField({
        name: "isrt",
        label: "isrt",
        value: null,
        related: "isrt",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.isrt}`;
        },
        fields: isrt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isrt: { _contains: text } };
        },
      }),

      new FormField({
        name: "isrp",
        label: "ISRP – Posizione",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "isra",
        label: "ISRA - Autore",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "isri",
        label: "ISRI – Trascrizione",
        type: "textarea",
        value: "",
      }),
      new FormField({
        name: "ognac",
        label: "OGNAC",
        type: "number",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "isep", label: "Posizione", sortable: true },
      { key: "isea", label: "Autore", sortable: true },
      { key: "isez", label: "Descrizione", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
