import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
  CheckboxField,
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
        column: 6,
      }),
      new FormField({
        name: "dida",
        label: "Didascalia immagine",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "visits",
        label: "Visite",
        type: "number",
        value: "",
        column: 2,
        edit: "false",

      }),
      new FormField({
        name: "numero",
        label: "Numero di ordine",
        type: "number",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "invn",
        label: "Numero Inventario",
        type: "text",
        value: "",
        column: 2,
        edit: "false",
      }),

      new FormField({
        name: "pubblicata",
        label: "Pubblicata",
        type: "toggle",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "capolavoro",
        label: "Capolavoro",
        type: "toggle",
        value: "",
        column: 2,
      }),
      new CheckboxField({
        name: "tipo_visita",
        label: "Tipo visita",
        value: [],
        column: 2,
        inline: false,
        options: [
          { value: "adulti", label: "adulti" },
          { value: "ragazzi", label: "ragazzi" },
        ],
      }),
      new File({ name: "audio_adulti", label: "Audio adulti", column: 5 }),
      new File({ name: "audio_ragazzi", label: "Audio ragazzi", column: 5 }),

      new FormField({
        name: "titolo",
        label: "Titolo",
        type: "text",
        value: "",
        column: 12,
      }),

      new FormField({
        name: "autore",
        label: "Autore",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "autn",
        label: "Autore",
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
        name: "sgti",
        label: "Soggetto",
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
      }),

      new FormField({
        name: "sala",
        label: "Sala",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
        type: "text",
        value: "",
        column: 4,
      }),

      new FormField({
        label: "INGLESE",
        type: "biglabel",
        value: "",
        column: 12,
      }),
      new FormField({
        type: "divider",
        value: "",
        column: 12,
      }),

      new File({ name: "audio_adulti_eng", label: "Audio adulti", column: 6 }),
      new File({
        name: "audio_ragazzi_eng",
        label: "Audio ragazzi",
        column: 6,
      }),

      new FormField({
        name: "titolo_eng",
        label: "Titolo",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "autore_eng",
        label: "Autore",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "materia_eng",
        label: "Materia",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "data_eng",
        label: "Data",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "descrizione_eng",
        label: "Descrizione",
        type: "richtext",
        value: "",
        edit: "true",
      }),
      new FormField({
        name: "piano_eng",
        label: "Piano",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "sala_eng",
        label: "Sala",
        type: "text",
        value: "",
        column: 4,
      }),

      new FormField({
        label: "FRANCESE",
        type: "biglabel",
        value: "",
        column: 12,
      }),
      new FormField({
        type: "divider",
        value: "",
        column: 12,
      }),

      new File({ name: "audio_adulti_fra", label: "Audio adulti", column: 6 }),
      new File({
        name: "audio_ragazzi_fra",
        label: "Audio ragazzi",
        column: 6,
      }),

      new FormField({
        name: "titolo_fra",
        label: "Titolo",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "autore_fra",
        label: "Autore",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "materia_fra",
        label: "Materia",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "data_fra",
        label: "Data",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "descrizione_fra",
        label: "Descrizione",
        type: "richtext",
        value: "",
        edit: "true",
      }),
      new FormField({
        name: "piano_fra",
        label: "Piano",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "sala_fra",
        label: "Sala",
        type: "text",
        value: "",
        column: 6,
      }),




      new FormField({
        label: "SPAGNOLO",
        type: "biglabel",
        value: "",
        column: 12,
      }),
      new FormField({
        type: "divider",
        value: "",
        column: 12,
      }),

      new File({ name: "audio_adulti_spa", label: "Audio adulti", column: 6 }),
      new File({
        name: "audio_ragazzi_spa",
        label: "Audio ragazzi",
        column: 6,
      }),

      new FormField({
        name: "titolo_spa",
        label: "Titolo",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "autore_spa",
        label: "Autore",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "materia_spa",
        label: "Materia",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "data_spa",
        label: "Data",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "descrizione_spa",
        label: "Descrizione",
        type: "richtext",
        value: "",
        edit: "true",
      }),
      new FormField({
        name: "piano_spa",
        label: "Piano",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "sala_spa",
        label: "Sala",
        type: "text",
        value: "",
        column: 6,
      }),



    ];
  },

  tableFields() {
    return [
      { key: "numero", label: "Numero \t", sortable: true },
      { key: "id_opera", label: "ID Opera", sortable: true },
      { key: "tipo_visita", label: "Tipo visita", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
      { key: "autore", label: "Autore", sortable: true },
      { key: "sgti", label: "Soggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
