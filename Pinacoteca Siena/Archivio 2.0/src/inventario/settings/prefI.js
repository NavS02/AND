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
  collection: "prefI",
  fields() {
    return [
      new FormField({
        name: "id_opera",
        label: "id opera",
        type: "text",
        value: "",
      }),
    ];
  },

  tableFields() {
    return [
      { key: "id_opera", label: "ID scheda", sortable: false },
      { key: "date_created", label: "Data", sortable: false },

      { key: "actions", label: "Azioni", sortable: false },
    ];
  },
};
