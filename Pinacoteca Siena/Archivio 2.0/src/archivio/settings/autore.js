import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../models";
import autm from "./autm";
import auts from "./auts";
import autr from "./autr";

export default {
  collection: "autore",
  fields() {
    return [
      new FormField({
        name: "autn",
        label: "AUTN-Autore",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "auta",
        label: "AUTA-Dati anagrafici",
        type: "text",
        value: "",
      }),

      new ManyToOneField({
        name: "auts_autore",
        label: "AUTS-Riferimento all'autore",
        value: null,
        related: "auts_autore",
        type: "manyToOne",
        voc: "open",

        preview: (item) => {
          return `${item?.auts_autore}`;
        },
        fields: auts.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { auts_autore: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "autr_autore",
        label: "AUTR-Riferimento all'intervento",
        value: null,
        related: "autr_autore",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.autr_autore}`;
        },
        fields: autr.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autr_autore: { _contains: text } };
        },
      }),

      new ManyToManyField({
        name: "autm_autore",
        label: "AUTM-Motivazione",
        value: [],
        related: "autm_autore",
        foreign_key: "autm_autore_id",
        preview: (item) => {
          return `${item?.id ?? "--"} - ${item?.autm_autore}`;
        },
        fields: autm.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autm_autore: { _contains: text } };
        },
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "autn", label: "AUTN", sortable: true },
      { key: "auta", label: "AUTA", sortable: true },
      { key: "autm_autore", label: "AUTM", sortable: false },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
