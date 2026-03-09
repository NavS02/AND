import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_armadio",
  fields() {
    return [
  
        new FormField({ name: "bib_armadio", label: "Armadio", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_armadio", label: "Armadio", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
