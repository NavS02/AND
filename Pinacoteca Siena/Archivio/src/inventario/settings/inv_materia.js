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
  collection: "inv_materia",
  fields() {
    return [
      new FormField({
        name: "inv_materia",
        label: "Materia",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "inv_materia", label: "Materia", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
      
    ];
  },
};