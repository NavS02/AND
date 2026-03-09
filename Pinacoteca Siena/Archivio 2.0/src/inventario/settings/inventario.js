import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../models";

import inv_oggetto from "./inv_oggetto";
import inv_materia from "./inv_materia";
import inv_stima from "./inv_stima";
import inv_collocazione from "./inv_collocazione";
import oa from "./oa";

export default {
  collection: "inventario",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 12,
      }),
      new FormField({
        name: "invn",
        label: "INVN",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "IBS",
        label: "IBS",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "inventario_1930",
        label: "Inventario 1930",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "inventario_1973",
        label: "Inventario 1973",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "nctn",
        label: "NCTN",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "altri_codici",
        label: "Altri codici",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "quantita",
        label: "Quantità",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "dismesso",
        label: "Dismesso",
        type: "toggle",
        value: "",
        column: 2,
      }),
 

      new ManyToOneField({
        name: "inv_oggetto",
        label: "Oggetto",
        value: null,
        related: "inv_oggetto",
        type: "manyToOne",
        column: "4",
        preview: (item) => {
          return `${item?.inv_oggetto}`;
        },
        fields: inv_oggetto.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { inv_oggetto: { _contains: text } };
        },
      }),

      new FormField({
        name: "soggetto",
        label: "Soggetto",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "autore",
        label: "Autore",
        type: "text",
        value: "",
        column: "4",
      }),

      new ManyToManyField({
        name: "inv_materia",
        label: "Materia",
        value: [],
        column: "4",
        related: "inv_materia",
        collection: "inv_materia",
        foreign_key: "inv_materia_id",
        preview: (item) => {
          return `${item?.inv_materia}`;
        },
        fields: inv_materia.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { inv_materia: { _contains: text } };
        },
      }),

      new FormField({
        name: "data",
        label: "Cronologia",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "misure",
        label: "Misure",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "descrizione",
        label: "Descrizione",
        type: "textarea",
        value: "",
      }),
      new ManyToOneField({
        name: "inv_collocazione",
        label: "Collocazione",
        value: null,
        related: "inv_collocazione",
        type: "manyToOne",
        column: "12",
        preview: (item) => {
          return `${item?.inv_collocazione}`;
        },
        fields: inv_collocazione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { inv_collocazione: { _contains: text } };
        },
      }),
      // new FormField({
      //   name: "inv_piano",
      //   label: "Piano",
      //   type: "text",
      //   value: "",
      //   column: 3,
      // }),

      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "ubi_specifica",
        label: "Specifiche",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "deposito",
        label: "Deposito",
        type: "toggle",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "provenienza",
        label: "Provenienza",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "acquisizione",
        label: "Acquisizione",
        type: "text",
        value: "",
        column: 4,
      }),
      new ManyToManyField({
        name: "inv_stima",
        label: "Stima",
        value: [],
        column: 4,
        related: "inv_stima",
        collection: "inv_stima",
        foreign_key: "inv_stima_id",
        preview: (item) => {
          return `${item?.inv_stis}`;
        },
        fields: inv_stima.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stis: { _contains: text } };
        },
      }),

      new FormField({
        name: "prestito",
        label: "Prestito esterno",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "proprieta",
        label: "Proprieta",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "note",
        label: "Note",
        type: "textarea",
        value: "",
        column: 12,
      }),
     
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: true },
      { key: "invn", label: "INVN", sortable: false },
      { key: "inventario_1930", label: "INV_1930", sortable: false },
      { key: "inventario_1973", label: "INV_1973", sortable: false },
      { key: "IBS", label: "IBS", sortable: false },
      { key: "autore", label: "Autore", sortable: true },
      { key: "soggetto", label: "Soggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
      { key: "opera", label: "Opera", sortable: false },
    ];
  },
};
