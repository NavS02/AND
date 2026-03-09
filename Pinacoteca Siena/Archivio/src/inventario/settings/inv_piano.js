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
  collection: "inv_piano",
  fields() {
    return [
      new FormField({
        name: "inv_piano",
        label: "Piano",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "inv_piano", label: "Piano", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
