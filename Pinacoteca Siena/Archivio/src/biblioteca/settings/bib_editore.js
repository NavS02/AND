import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_editore",
  fields() {
    return [
  
        new FormField({ name: "bib_editore", label: "Editore", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_editore", label: "Editore", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
