import { FormField, ManyToOneField } from "../../models";
import stim_f from './stim_f'
export default {
  collection: "stima_f",
  fields() {
    return [
      new FormField({
        name: "stis",
        label: "STIS - Stima euro",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "stis_lire",
        label: "STIS - Stima lire",
        type: "text",
        value: "",
      }),

      new FormField({
        name: "stid",
        label: "STID - Data",
        type: "text",
        value: "",
      }),
      new ManyToOneField({
        name: "stim_f",
        label: "STIM - Motivo",
        value: null,
        related: "stim_f",
        type: "manyToOne",
        voc: "close",
        invisible: "true",
        column: 3,

        preview: (item) => {
          return ` ${item?.stim_f}`;
        },
        fields: stim_f.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stim_f: { _contains: text } };
        },
      }),
      new FormField({ name: "note", label: "Note", type: "text", value: "" }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "dtzs", label: "DTZS – Specifiche data", sortable: false },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
