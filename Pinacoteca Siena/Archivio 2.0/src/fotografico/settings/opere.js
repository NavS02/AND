import { FormField,ManyToOneField } from "../../models";
import mtc from "./mtc";
export default {
  collection: "opere",
  fields() {
    return [
      new FormField({ name: "ogto", label: "OGTO", type: "text", value: "" }),
      new FormField({ name: "sgto", label: "SGTO", type: "text", value: "" }),
      new FormField({ name: "cito", label: "CITO", type: "text", value: "" }),
      new FormField({ name: "luogo", label: "luogo", type: "text", value: "" }),
      new FormField({
        name: "id_opera",
        label: "ID OPERA",
        type: "number",
        value: "",
      }),
      new FormField({
        name: "inventario_OA",
        label: "INVENTARIO OA",
        type: "text",
        value: "",
      }),
      new ManyToOneField({
        name: "mtc",
        label: "MTC",
        value: null,
        related: "mtc",
        type: "manyToOne",
        column: 12,
        voc: "close",

        preview: (item) => {
          return `${item?.mtc}`;
        },
        fields: mtc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtc: { _contains: text } };
        },
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "ogtt", label: "OGTT - Tipologia", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
