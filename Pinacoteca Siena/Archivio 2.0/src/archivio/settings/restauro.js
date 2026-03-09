import rstn from "./restauro/rstn";
import rstr from "./restauro/rstr";
import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../models";
import Divider from "../models/Divider";

export default {
  collection: "roz",
  fields() {
    return [
      // new FormField({ name: 'id', label: 'id', type: 'text' }),

      new FormField({ name: "rstd", label: "RSTD-Data", type: "text", value: "" }),
      new FormField({
        name: "rsts",
        label: "RSTS-Situazione",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "rste",
        label: "RSTE-Ente responsabile",
        type: "text",
        value: "",
      }),

      new ManyToOneField({
        name: "rstn",
        label: "RSTN-Nome operatore",
        value: null,
        related: "rstn",
        type: "manyToOne",
        preview: (item) => {
          return `${item?.rstn}`;
        },
        fields: rstn.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rstn: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "rstr",
        label: "RSTR-Ente finanziatore",
        value: null,
        related: "rstr",
        type: "manyToOne",
        preview: (item) => {
          return `${item?.rstr}`;
        },
        fields: rstr.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rstr: { _contains: text } };
        },
      }),
      new Divider({ type: "divider" }),

      new FormField({ name: "rstl", label: "RSTL-Luogo", type: "text", value: "" }),

      new FormField({ name: "rsdu", label: "RSDU-Uscita", type: "text", value: "" }),
      new FormField({
        name: "rsdr",
        label: "RSDR-[Ente finanziatore]",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "rstnote",
        label: "Note",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: false },
      { key: "rstd", label: "Rste", sortable: true },
      { key: "rstn", label: "Rstn", sortable: true },
      { key: "rsts", label: "Rsts", sortable: true },
      { key: "actions", label: "Actions", sortable: false },
    ];
  },
};
