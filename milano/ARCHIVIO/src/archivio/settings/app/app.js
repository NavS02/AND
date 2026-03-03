import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
} from "../../../models";
import app_salaLabel from "./app_salaLabel";

export default {
  collection: "app",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 4,
      }),
      new Files({
        name: "altre_immagini",
        label: "Altre immagini",
        foreign_key: "directus_files_id",
        value: [],
        fit: "contain",
        width: 100,
        height: 100,
        quality: 80,
        column: 4,
      }),
      new FormField({
        name: "pubblicata",
        label: "Pubblicata",
        type: "toggle",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "titolo",
        label: "Titolo",
        type: "text",
        value: "",
        column: 12,
      }),
      new FormField({
        name: "invn",
        label: "Numero Inventario",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "dida",
        label: "Didascalia immagine",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "autn",
        label: "Autore",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "auta",
        label: "Dati Anagrafici",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "auts",
        label: "Riferimento all’autore",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),

      new FormField({
        name: "autore",
        label: "Autore",
        type: "text",
        value: "",
        column: 12,
      }),

      new FormField({
        name: "sgti",
        label: "Soggetto",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "ogtd",
        label: "Oggetto",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "materia",
        label: "Materia",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "data",
        label: "Data",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "descrizione",
        label: "Descrizione",
        type: "richtext",
        value: "",
        edit: "true",
      }),
      new FormField({
        name: "collezione",
        label: "Collezione",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "tipologia",
        label: "Tipologia",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "tcl",
        label: "Tipo di Localizzazione",
        type: "text",
        value: "",
        column: 4,
        edit: "false",

      }),

      new FormField({
        name: "prvc",
        label: "Comune",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "prcd",
        label: "Denominazione",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "provenienza",
        label: "Provenienza",
        type: "text",
        value: "",
        column: 12,
      }),
      new FormField({
        name: "piano",
        label: "Piano",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),

      new FormField({
        name: "sala",
        label: "Sala",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new ManyToOneField({
        name: "salaLabel",
        label: "APP Sala",
        value: null,
        related: "app_salaLabel",
        column: "2",
        type: "manyToOne",
        sort:"sala_nome",

        voc: "close",
        preview: (item) => {
          return `${item?.sala_nome}`;
        },
        fields: app_salaLabel.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { sala_nome: { _contains: text } };
        },
      }),
      new Image({
        name: "collocazione_sala",
        label: "Immagine sala",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 4,
      }),
      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "invn", label: "Inventario \t", sortable: true },
      { key: "id_opera", label: "ID Opera", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
      { key: "autore", label: "Autore", sortable: true },
      { key: "sgti", label: "Soggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
