import { FormField, ManyToOneField } from "../../models";

export default {
  collection: "directus_roles",
  fields() {
    return [
  
        new FormField({ name: "name", label: "Nome", type: "text", value: "" }),
      ];
  },

  tableFields() {
    return [
      { key: "name", label: "Nome", sortable: false },
      { key: "users", label: "Utenti", sortable: false },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
