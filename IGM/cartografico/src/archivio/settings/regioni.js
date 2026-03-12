import { FormField, ManyToOneField } from "../../models";
import directus_roles from "./directus_roles";

export default {
  collection: "",
  fields() {
    return [
     
      new FormField({ name: "regione", label: "regione", type: "text", value: "" }),
    ]
  },

  tableFields() {
    return [
      { key: "regione", label: "regione", sortable: false },
      { key: "nazioni", label: "nazione", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
