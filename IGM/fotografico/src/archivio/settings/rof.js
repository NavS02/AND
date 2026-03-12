import {
  FormField,
  ManyToOneField,
} from "../../models";
import roff from "./roff";
import rofo from "./rofo";
export default {
  collection: "rof",
  fields() {
    return [
      new ManyToOneField({
        name: "roff",
        label: "ROFF - Stadio di realizzazione del bene in esame",
        value: null,
        related: "roff",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.roff}`;
        },
        fields: roff.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { roff: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "rofo",
        label: "ROFO - Definizione fotografia di rifferimento",
        value: null,
        related: "rofo",
        type: "manyToOne",
        column: 12,
        voc: "open",

        preview: (item) => {
          return `${item?.rofo}`;
        },
        fields: rofo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rofo: { _contains: text } };
        },
      }),

      new FormField({
        name: "rofx",
        label: "ROFX - Riferimento scheda",
        type: "text",
        value: " ",
      }),
    ];
  },
  tableFields() {
    return [{ key: "id", label: "ID", sortable: false }];
  },
};
