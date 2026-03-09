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

export default {
  collection: "web",
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
        name: "numero",
        label: "Numero di ordine",
        type: "number",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "invn",
        label: "Numero Inventario",
        type: "text",
        value: "",
        column: 4,
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
        column: 2,
      }),
      new SelectField({
        name: "filtro",
        label: "Filtro",
        type: "select",
        column: 2,
        value: "",
        options: [
          { value: null, label: " " },
          {
            value: "Duecento",
            label: "Duecento",
          },    {
            value: "Trecento",
            label: "Trecento",
          },    {
            value: "Quattrocento",
            label: "Quattrocento",
          },    {
            value: "Cinquecento",
            label: "Cinquecento",
          },
          {
            value: "Seicento",
            label: "Seicento",
          },
        ],
      }),
      new FormField({
        name: "misure",
        label: "Misure",
        type: "text",
        value: "",
        column: 2,
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
        column: 6,
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
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
      // new FormField({
      //   label: "INGLESE",
      //   type: "biglabel",
      //   value: "",
      //   column: 12,
      // }),
      // new FormField({
      //   type: "divider",
      //   value: "",
      //   column: 12,
      // }),

      // new FormField({
      //   name: "titolo_eng",
      //   label: "Titolo",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "autore_eng",
      //   label: "Autore",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "materia_eng",
      //   label: "Materia",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "data_eng",
      //   label: "Data",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "descrizione_eng",
      //   label: "Descrizione",
      //   type: "richtext",
      //   value: "",
      //   edit: "true",
      // }),
      // new FormField({
      //   name: "piano_eng",
      //   label: "Piano",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),

      // new FormField({
      //   name: "sala_eng",
      //   label: "Sala",
      //   type: "text",
      //   value: "",
      //   column: 4,
      // }),

      // new FormField({
      //   label: "FRANCESE",
      //   type: "biglabel",
      //   value: "",
      //   column: 12,
      // }),
      // new FormField({
      //   type: "divider",
      //   value: "",
      //   column: 12,
      // }),

   
      // new FormField({
      //   name: "titolo_fra",
      //   label: "Titolo",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "autore_fra",
      //   label: "Autore",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "materia_fra",
      //   label: "Materia",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "data_fra",
      //   label: "Data",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
      // new FormField({
      //   name: "descrizione_fra",
      //   label: "Descrizione",
      //   type: "richtext",
      //   value: "",
      //   edit: "true",
      // }),
      // new FormField({
      //   name: "piano_fra",
      //   label: "Piano",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),

      // new FormField({
      //   name: "sala_fra",
      //   label: "Sala",
      //   type: "text",
      //   value: "",
      //   column: 6,
      // }),
    ];
  },

  tableFields() {
    return [
      { key: "id_opera", label: "ID Opera", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
      { key: "autore", label: "Autore", sortable: true },
      { key: "sgti", label: "Soggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
