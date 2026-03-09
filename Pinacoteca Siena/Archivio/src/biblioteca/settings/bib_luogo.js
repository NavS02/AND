import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_luogo",
  fields() {
    return [
  
        new FormField({ name: "bib_luogo", label: "Luogo", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_luogo", label: "Luogo", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
