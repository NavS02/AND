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
    collection: "piano",
    fields() {
      return [
        new FormField({
          name: "piano",
          label: "Piano",
          type: "text",
          value: "",
        }),
      ];
    },
  
    tableFields() {
      return [
        { key: "id", label: "ID", sortable: false },
        { key: "piano", label: "Piano", sortable: false },
  
        { key: "actions", label: "Azioni", sortable: false },
      ];
    },
  };
  