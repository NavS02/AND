import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "bib_collocazione",
  fields() {
    return [
  
        new FormField({ name: "bib_collocazione", label: "Collocazione", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_collocazione", label: "Collocazione", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
