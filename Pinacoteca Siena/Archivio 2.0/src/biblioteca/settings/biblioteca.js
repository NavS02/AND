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
import Divider from "../../models/Divider";
import bib_autore from "./bib_autore";
import bib_curatore from "./bib_curatore";
import bib_armadio from "./bib_armadio";
import bib_collocazione from "./bib_collocazione";
import bib_editore from "./bib_editore";
import bib_luogo from "./bib_luogo";

export default {
  collection: "biblioteca",
  fields() {
    return [
      new FormField({
        name: "bib_inventario",
        label: "Inventario",
        type: "text",
        value: "",
        column: 3,

      }),
      new FormField({
        name: "bib_data_inventario",
        label: "Data inventario",
        type: "text",
        value: "",
        column: 3,

      }),
      new FormField({
        name: "collocazione_2",
        label: "Collocazione",
        type: "text",
        value: "",
        column: 3,

      }),
     
      new ManyToOneField({
        name: "bib_armadio",
        label: "Armadio",
        value: null,
        related: "bib_armadio",
        type: "manyToOne",
        column: 3,
        sort:"bib_armadio",
        voc: "open",

        preview: (item) => {
          return `${item?.bib_armadio}`;
        },
        fields: bib_armadio.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bib_armadio: { _contains: text } };
        },
      }),
      new FormField({
        name: "bib_titolo",
        label: "Titolo",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "bib_in",
        label: "In (Catalogo - Rivista - Atti)",
        type: "text",
        value: "",
      }),
  
      new ManyToOneField({
        name: "bib_luogo2",
        label: "Luogo",
        value: null,
        related: "bib_luogo",
        type: "manyToOne",
        column: 3,
        sort:"bib_luogo",
        voc: "open",

        preview: (item) => {
          return `${item?.bib_luogo}`;
        },
        fields: bib_luogo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bib_luogo: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "bib_editore2",
        label: "Editore",
        value: null,
        related: "bib_editore",
        type: "manyToOne",
        column: 3,
        sort:"bib_editore",
        voc: "open",

        preview: (item) => {
          return `${item?.bib_editore}`;
        },
        fields: bib_editore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bib_editore: { _contains: text } };
        },
      }),
  
    
      new FormField({
        name: "bib_anno",
        label: "Anno",
        type: "number",
        value: "",
        column:3

      }),
      new FormField({
        name: "bib_pagine",
        label: "Pagine",
        type: "number",
        value: "",
        column:3

      }),
    

      new ManyToManyField({
        name: "bib_autore",
        label: "Autore",
        value: [],
        column: 6,
        sort:"bib_autore",
        related: "bib_autore",
        foreign_key: "bib_autore_id",
        preview: (item) => {
          return `${item?.bib_autore}`;
        },
        fields: bib_autore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bib_autore: { _contains: text } };
        },
      }),
      new ManyToManyField({
        name: "bib_curatore",
        label: "Curatore",
        value: [],
        column: 6,
        sort:"bib_curatore",

        related: "bib_curatore",
        foreign_key: "bib_curatore_id",
        preview: (item) => {
          return `${item?.bib_curatore}`;
        },
        fields: bib_curatore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { bib_curatore: { _contains: text } };
        },
      }),
 
      
      new FormField({
        name: "bib_note",
        label: "Note",
        type: "textarea",
        value: "",
      }),
    ];
  },

  tableFields() {
    return [
      { key: "id", label: "ID", sortable: true },
      { key: "bib_inventario", label: "Inventario", sortable: true },
      { key: "bib_titolo", label: "Titolo", sortable: true },
      { key: "bib_autore", label: "Autore", sortable: true },
      { key: "bib_curatore", label: "Curatore", sortable: true },
      { key: "bib_anno", label: "Anno", sortable: true },
      { key: "collocazione_2", label: "Collocazione", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
      { key: "prestito", label: "Prestito ", sortable: false },
    ];
  },
};
