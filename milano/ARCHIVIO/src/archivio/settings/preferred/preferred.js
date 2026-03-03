import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../../models";


export default {
  collection: "preferred",
  fields() {
    return [
      new FormField({ name: "id", label: "ID", type: "text", value: "" }),

    ]
  },
  tableFields() {
    return [
      { key: "id_opera", label: "ID", sortable: false },
    ];
  },
};
