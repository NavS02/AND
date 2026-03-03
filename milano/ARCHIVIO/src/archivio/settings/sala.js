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
    collection: "sala",
    fields() {
      return [
        new FormField({
          name: "sala",
          label: "Sala",
          type: "text",
          value: "",
        }),
      ];
    },
  
    tableFields() {
      return [
        { key: "id", label: "ID", sortable: false },
        { key: "sala", label: "Sala", sortable: false },
  
        { key: "actions", label: "Azioni", sortable: false },
      ];
    },
  };
  