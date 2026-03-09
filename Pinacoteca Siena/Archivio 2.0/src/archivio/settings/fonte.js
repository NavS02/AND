import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../models";
import fntp from "./fntp";

export default {
  collection: "fonte",
  fields() {
    return [
      new ManyToOneField({
        name: "fntp",
        label: "FNTP-Tipo",
        value: null,
        related: "fntp",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.fntp}`;
        },
        fields: fntp.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { fntp: { _contains: text } };
        },
      }),
        new FormField({ name: "fnta", label: "FNTA-Autore", type: "text", value: "" }),
      new FormField({ name: "fntt", label: "FNTT-Denominazione", type: "text", value: "" }),
      new FormField({ name: "fntd", label: "FNTD-Data", type: "text", value: "" }),
      new FormField({ name: "fntf", label: "FNTF-Foglio / Carta", type: "text", value: "" }),
      new FormField({ name: "fntn", label: "FNTN-Nome Archivio", type: "text", value: "" }),
      new FormField({ name: "fnts", label: "FNTS-Posizione", type: "text", value: "" }),
      new FormField({ name: "fnti", label: "FNTI-Codice", type: "text", value: "" }),
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
