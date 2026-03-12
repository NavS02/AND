import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
  ExternalLinkField,
} from "../../models";
export default {
  collection: "roff",
  fields() {
    return [
      
      new FormField({ name: "roff", label: "ROFF Stadio di realizzazione del bene in esame", type: "text", value: "" }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
    ];
  },
};
