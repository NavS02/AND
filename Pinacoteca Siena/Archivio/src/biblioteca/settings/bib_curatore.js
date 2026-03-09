import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_curatore",
  fields() {
    return [
  
        new FormField({ name: "bib_curatore", label: "Curatore", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_curatore", label: "Curatore", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
