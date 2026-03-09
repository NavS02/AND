import {FormField,ManyToOneField,RadioField} from '../../models'
import auts from "./auts"
import autr from "./autr"
import autm from "./autm"


export default {
    collection: 'fotografo',
    fields() {
        return [
            new FormField({ name: 'autj', label: 'AUTJ', type: 'text', value: '' }),
            new FormField({ name: 'auth', label: 'AUTH – Cod identificativo', type: 'text', value: '' }),
            // AUTP

            new FormField({ name: 'autn', label: 'AUTN – Nome Autore', type: 'text', value: '' }),
            new RadioField({
              name: "autp",
              label: "AUTP – Tipo",
      
              column: 4,
              type: "radio",
              value: "",
              inline: true,
              choices: [
                { value: "P", label: "P" },
                { value: "E", label: "E" },
                { value: "NR", label: "NR" },
              ],
            }),
            new FormField({ name: 'auta', label: 'AUTA – Cronologia ', type: 'text', value: '' }),
            new ManyToOneField({
                name: "auts",
                label: "AUTS – Specifiche",
                value: null,
                related: "auts",
                type: "manyToOne",
                column: "12",
        
                preview: (item) => {
                  return `${item?.auts}`;
                },
                fields: auts.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { auts: { _contains: text } };
                },
              }), 
              // new ManyToOneField({
              //   name: "autr",
              //   label: "AUTR – Ruolo",
              //   value: null,
              //   related: "autr",
              //   type: "manyToOne",
              //   column: "12",
        
              //   preview: (item) => {
              //     return `${item?.autr}`;
              //   },
              //   fields: autr.fields,
              //   filter: (text) => {
              //     if (text.trim() === "") return {};
              //     return { autr: { _contains: text } };
              //   },
              // }), 
      
            new ManyToOneField({
                name: "autm",
                label: "AUTM - Motivazione",
                value: null,
                related: "autm",
                type: "manyToOne",
                column: "12",
        
                preview: (item) => {
                  return `${item?.autm}`;
                },
                fields: autm.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { autm: { _contains: text } };
                },
              }),
              new FormField({ name: 'autz', label: 'AUTZ – Note', type: 'textarea', value: '' }),
            
            ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:true},
            {key:'autn',label:'Fotografo',sortable:true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}