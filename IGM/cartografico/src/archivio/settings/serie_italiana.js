import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../models";
import Divider from "../../models/Divider";

export default {
  collection: "serie_italiana",
  fields() {
    return [
      new FormField({
        name: "foglio",
        label: "Foglio",
        type: "text",
        value: "",
        column: 4,
      }),
      new RadioField({
        name: "quadrante",
        label: "Quadrante",

        column: 4,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "I", label: "I" },
          { value: "II", label: "II" },
          {
            value: "III",
            label: "III",
          },
          {
            value: "IV",
            label: "IV",
          },
        ],
      }),

      new RadioField({
        name: "orientamento",
        label: "Orientamento",

        column: 4,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "NE", label: "NE" },
          { value: "SE", label: "SE" },
          {
            value: "SO",
            label: "SO",
          },
          {
            value: "NO",
            label: "NO",
          },
        ],
      }),
      new FormField({
        name: "nome",
        label: "Nome",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "anno",
        label: "Anno",
        type: "text",
        value: "",
        column: 4,
      }),

      new RadioField({
        name: "scala",
        label: "Scala",

        column: 4,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "1:25.000", label: "1:25.000" },
          { value: "1:50.000", label: "1:50.000" },
          {
            value: "1:100.000",
            label: "1:100.000",
          },
        ],
      }),
      new FormField({
        name: "note",
        label: "Note",
        type: "textarea",
        value: "",
        column: 8,
      }),
      new RadioField({
        name: "in_commercio",
        label: "In commercio",

        column: 4,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "no", label: "NO" },
          { value: "si", label: "SI" },
        ],
      }),
      new FormField({ name: "link", label: "Link", type: "text", value: "",edit:"false" }),
      new FormField({
        label: "Immagine",
        type: "uploadPHP2",
        value: "",
        name: "fotoSerie",
      }),
      // new FormField({
      //   name: "codita",
      //   label: "CodIta",
      //   type: "text",
      //   value: "",
      // }),
      // new FormField({
      //   name: "codtav",
      //   label: "CodTav",
      //   type: "text",
      //   value: "",
      // }),
      // new FormField({
      //   name: "codimm2",
      //   label: "CodImm2",
      //   type: "text",
      //   value: "",
      // }),
 
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: true },
      { key: "nome", label: "Nome", sortable: true },
      { key: "foglio", label: "Foglio", sortable: true },
      { key: "quadrante", label: "Quad", sortable: true },
      { key: "orientamento", label: "Orient", sortable: true },
      { key: "scala", label: "Scala", sortable: true },
      { key: "anno", label: "Anno", sortable: true },
      { key: "link", label: "Immagine", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
