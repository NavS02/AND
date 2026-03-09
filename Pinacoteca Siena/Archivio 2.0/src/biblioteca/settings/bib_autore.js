import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_autore",
  fields() {
    return [
  
        new FormField({ name: "bib_autore", label: "Autore", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_autore", label: "Autore", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
