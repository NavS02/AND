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
  collection: "rofo",
  fields() {
    return [
      
      new FormField({ name: "rofo", label: "ROFO - Definizione fotografia di rifferimento", type: "text", value: "" }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
    ];
  },
};
