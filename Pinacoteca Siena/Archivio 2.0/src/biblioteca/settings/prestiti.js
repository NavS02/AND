import { FormField, ManyToOneField,Divider } from "../../models";

export default {
  collection: "prestiti",
  fields() {
    return [
      new FormField({
        name: "LIBRO",
        label: "LIBRO",
        type: "biglabel",
        value: "",
        column: 12,
      }),

      new FormField({
        name: "libro_id",
        label: "ID ",
        type: "text",
        value: "",
        column: 2,
        edit: "false",
      }),
      new FormField({
        name: "libro_inventario",
        label: "Inventario ",
        type: "text",
        value: "",
        column: 2,
        edit: "false",
      }),
      new FormField({
        name: "libro_titolo",
        label: "Titolo ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_autore",
        label: "Autore ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_curatore",
        label: "Curatore ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_anno",
        label: "Anno ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_collocazione",
        label: "Collocazione ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_luogo",
        label: "Luogo ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "libro_armadio",
        label: "Armadio ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new Divider({ type: "divider"}),

      new FormField({
        name: "UTENTE",
        label: "UTENTE",
        type: "biglabel",
        value: "",
        column: 12,
      }),
      
      new FormField({
        name: "utente_nome",
        label: "Nome ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "utente_cognome",
        label: "Cognome ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "utente_ufficio",
        label: "Ufficio ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "utente_email",
        label: "Email ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new FormField({
        name: "utente_telefono",
        label: "Telefono ",
        type: "text",
        value: "",
        column: 4,
        edit: "false",
      }),
      new Divider({ type: "divider"}),

      new FormField({
        name: "fine_prestito",
        label: "Fine prestito",
        type: "date",
        value: "",
        column: 12,
        edit: "true",
      }),
    ];
  },

  tableFields() {
    return [
      { key: "libro_id", label: "ID LIBRO", sortable: true },
      { key: "libro_titolo", label: "TITOLO", sortable: true },
      { key: "libro_autore", label: "AUTORE", sortable: true },
      { key: "libro_collocazione", label: "COLLOCAZIONE", sortable: true },
      { key: "utente_nome", label: "NOME", sortable: true },
      { key: "utente_cognome", label: "COGNOME", sortable: true },
      { key: "fine_prestito", label: "FINE", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
