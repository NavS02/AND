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
  collection: "pref",
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
      { key: "id_opera", label: "ID", sortable: false },
      { key: "invn", label: "Inventario", sortable: true },
      { key: "image", label: "Immagine", sortable: true },
      { key: "sglt", label: "Soggetto", sortable: true },
      { key: "dtsi ", label: "DA ", sortable: true },
      { key: "dtsf", label: "A", sortable: true },
      { key: "date_created", label: "Data", sortable: false },

      { key: "actions", label: "Azioni", sortable: false },
    ];
  },
};
