import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_utente",
  fields() {
    return [
  
        new FormField({ name: "bib_nome", label: "Nome", type: "text", value: "",column:6 }),
        new FormField({ name: "bib_cognome", label: "Cognome", type: "text", value: "" ,column:6}),
        new FormField({ name: "bib_ufficio", label: "Ufficio", type: "text", value: "",column:4 }),
        new FormField({ name: "bib_email", label: "email", type: "text", value: "",column:4}),
        new FormField({ name: "bib_telefono", label: "telefono", type: "text", value: "",column:4 }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_nome", label: "Nome", sortable: true },
      { key: "bib_cognome", label: "Cognome", sortable: true },
      { key: "bib_ufficio", label: "Ufficio", sortable: true },
      { key: "bib_email", label: "email", sortable: true },
      { key: "bib_telefono", label: "Telefono", sortable: faltruese },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
