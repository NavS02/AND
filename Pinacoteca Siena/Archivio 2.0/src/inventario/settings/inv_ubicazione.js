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
  collection: "inv_ubicazione",
  fields() {
    return [

      new FormField({
        name: "inv_ubicazione",
        label: "Ubicazione",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "inv_ubicazione", label: "Ubicazione", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};