import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
import inv_stim from "./inv_stim";

export default {
    collection: 'inv_stima',
    fields() {
        return [
            new FormField({ name: 'inv_stis', label: 'Valore stima', type: 'text', value: '' }),
            new FormField({ name: 'inv_stid', label: 'Data stima', type: 'text', value: '' }),
            new FormField({ name: 'inv_stis_ass', label: 'Valore assicurativo stima', type: 'text', value: '' }),
            new ManyToOneField({
                name: "inv_stim",
                label: "Motivazione stima",
                value: null,
                related: "inv_stim",
                type: "manyToOne",
                column: "12",
                preview: (item) => {
                  return `${item?.inv_stim}`;
                },
                fields: inv_stim.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { inv_stim: { _contains: text } };
                },
              }),
        ]
    },
    tableFields() {
        return [
            {key:'inv_stis',label:'inv_stis',sortable: false},
            {key:'inv_stid',label:'inv_stid',sortable: false},
            {key:'inv_stis_ass',label:'inv_stis_ass',sortable: false},

        { key: "actions", label: "Azione", sortable: false },

            
        ]
    }
}