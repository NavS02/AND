import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
export default {
  collection: "inv_oggetto",
  fields() {
    return [
      new FormField({
        name: "inv_oggetto",
        label: "Oggetto",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "inv_oggetto", label: "Oggetto", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};