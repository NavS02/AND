import { FormField, ManyToOneField } from "../../models";
//fntp
import fntp from "./fntp";

export default {
  collection: "fonte",
  fields() {
    return [
      new ManyToOneField({
        name: "fntp",
        label: "Tipo",
        value: null,
        related: "fntp",
        type: "manyToOne",
        sort:"fntp",


        preview: (item) => {
          return `${item?.fntp}`;
        },
        fields: fntp.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { fntp: { _contains: text } };
        },
      }),
        new FormField({ name: "fnta", label: "Autore", type: "text", value: "" }),
      new FormField({ name: "fntt", label: "Denominazione", type: "text", value: "" }),
      new FormField({ name: "fntd", label: "Data", type: "text", value: "" }),
      new FormField({ name: "fntf", label: "Foglio / Carta", type: "text", value: "" }),
      new FormField({ name: "fntn", label: "Nome Archivio", type: "text", value: "" }),
      new FormField({ name: "fnts", label: "Posizione", type: "text", value: "" }),
      new FormField({ name: "fnti", label: "Codice", type: "text", value: "" }),
    ];
  },

  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "fnta", label: "Fnta", sortable: true },
      { key: "fntt", label: "Fntt", sortable: true },
      { key: "fntd", label: "Fntd", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
