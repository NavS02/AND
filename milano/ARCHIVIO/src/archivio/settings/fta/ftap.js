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
    collection: "ftap",
    fields() {
      return [
        
        new FormField({ name: "ftap", label: "Tipo", type: "text", value: "" }),
      ];
    },
  
    tableFields() {
      return [
        { key: "id", label: "ID", sortable: false },
        { key: "ftan", label: "ftan", sortable: true },
        { key: "ftad", label: "Ftad", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
      ];
    },
  };
  