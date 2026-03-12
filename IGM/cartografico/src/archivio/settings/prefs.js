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
  collection: "pref_s",
  fields() {
    return [
      new FormField({
        name: "id_opera",
        label: "mstfinid opera",
        type: "text",
        value: "",
      }),
    ];
  },

  tableFields() {
    return [
      { key: "id_serie", label: "ID", sortable: false },
      { key: "nome", label: "Nome", sortable: false },
      { key: "foglio", label: "Foglio", sortable: false },
      { key: "quadrante", label: "Quad", sortable: false },
      { key: "orientamento", label: "Orient", sortable: false },
      { key: "scala", label: "Scala", sortable: false },
      { key: "anno", label: "Anno", sortable: false },
      { key: "link", label: "Immagine", sortable: false },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
