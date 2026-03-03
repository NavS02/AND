import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../models";
import biblio from "./bib/biblio";
import bibx from "./bib/bibx";

export default {
  collection: "bib",
  fields() {
    return [
      new ManyToOneField({
        name: "bibx",
        label: "Genere",
        value: null,
        related: "bibx",
        type: "manyToOne",
        sort:"bibx",

        voc: "close",
        preview: (item) => {
          return `${item?.bibx}`;
        },
        fields: bibx.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bibx: { _contains: text } };
        },
      }),
      


      new FormField({ name: "biba", label: "Autore", type: "text", value: "" }),
      new FormField({ name: "bibd", label: "Anno di edizione", type: "text", value: "" }),
      new FormField({ name: "bibn", label: "Volume, pagine, numero", type: "text", value: "" }),
      new FormField({ name: "bibi", label: "Volume, tavole, figure", type: "text", value: "" }),
      new FormField({ name: "bil", label: "Citazione completa", type: "textarea", value: "" }),
      new ManyToManyField({
        name: "biblio",
        label: "Bibliografia completa",
        value: [],
        related: "biblio",
        foreign_key: "biblio_id",
        sort:"biblio",

        preview: (item) => {
          return `${item?.id ?? "--"} - ${item?.bibg}`;
        },
        fields: biblio.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bibg: { _contains: text } };
        },
      }),
    ];
  },

  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "biba", label: "Biba", sortable: true },
      { key: "bibd", label: "Bibd", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
