import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Files,
    Image,
  } from "../../../models";
  
  export default {
    collection: "app",
    fields() {
      return [
       
        new FormField({
          name: "sala_nome",
          label: "Nome sala",
          type: "text",
          value: "",
          column: 12,
        }),
       
      ];
    },
    tableFields() {
      return [
        { key: "sala_nome", label: "Nome sala", sortable: false },
      ];
    },
  };
  