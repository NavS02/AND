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
import touch_tipologia from "./touch_tipologia";
import touch_comune from "./touch_comune";
import touch_chiesa from "./touch_chiesa";

export default {
  collection: "touch",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 8,
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
        name: "tcl",
        label: "Tipo di Localizzazione",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),

      new FormField({
        name: "prvc",
        label: "Comune",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "prcd",
        label: "Denominazione",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
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
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
        type: "text",
        value: "",
        column: 6,
        edit: "false",
      }), 
      new ManyToOneField({
        name: "tipologia",
        label: "Tipologia",
        value: null,
        related: "touch_tipologia",
        column: 6,
        type: "manyToOne",
        sort:"tipologia",

        voc: "close",
        preview: (item) => {
          return `${item?.tipologia}`;
        },
        fields: touch_tipologia.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { tipologia: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "comune",
        label: "Comune",
        value: null,
        related: "touch_comune",
        column: 6,
        type: "manyToOne",
        sort:"comune",

        voc: "close",
        preview: (item) => {
          return `${item?.comune}`;
        },
        fields: touch_comune.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { comune: { _contains: text } };
        },
      }),
      new FormField({
        name: "provenienza",
        label: "Provenienza",
        type: "text",
        value: "",
        column: 12,
        edit: "true",
      }),
      new ManyToOneField({
        name: "chiesa",
        label: "Chiesa",
        value: null,
        related: "touch_chiesa",
        column: 12,
        type: "manyToOne",
        sort:"nome",

        voc: "close",
        preview: (item) => {
          return `${item?.nome}`;
        },
        fields: touch_chiesa.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { nome: { _contains: text } };
        },
      }),
      
    ];
  },
  tableFields() {
    return [
      { key: "id_opera", label: "Opera", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
      { key: "autore", label: "Autore", sortable: true },
      { key: "sgti", label: "Soggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
