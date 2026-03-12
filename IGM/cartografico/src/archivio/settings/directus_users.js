import { FormField, ManyToOneField } from "../../models";
import directus_roles from "./directus_roles";

export default {
  collection: "directus_users",
  fields() {
    return [
      new FormField({
        name: "first_name",
        label: "Nome",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "last_name",
        label: "Cognome",
        type: "text",
        value: "",
      }),
      new FormField({ name: "email", label: "Email", type: "text", value: "" }),
      new FormField({
        name: "password",
        label: "Password",
        type: "text",
        value: "",
      }),
      new ManyToOneField({
        name: "role",
        label: "Role",
        value: null,
        related: "directus_roles",
        type: "manyToOne",
        voc: "close",

        preview: (item) => {
          return `${item?.name}`;
        },
        fields: directus_roles.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { name: { _contains: text } };
        },
      }),
    ];
  },

  tableFields() {
    return [
      { key: "first_name", label: "Nome", sortable: false },
      { key: "last_name", label: "Cognome", sortable: false },
      { key: "email", label: "Email", sortable: false },
      { key: "role", label: "Ruolo", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
