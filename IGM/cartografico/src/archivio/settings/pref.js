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
  collection: "pref_c",
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
      { key: "id_carta", label: "Codice carta", sortable: false },
      { key: "scala_cartografica_numero", label: "Scala numero", sortable: false },
      { key: "scala_cartografica_grafica", label: "Scala grafica", sortable: false },
      { key: "numero_categorico", label: "Codice categorico", sortable: false },
      { key: "INVN", label: "Numero inventario", sortable: false },
      { key: "SGLT", label: "Titolo", sortable: false },
      { key: "DTSI", label: "DA", sortable: false },
      { key: "DTSF", label: "A", sortable: false },
      { key: "date_created", label: "Data", sortable: false },

      { key: "actions", label: "Azioni", sortable: false },
    ];
  },
};
