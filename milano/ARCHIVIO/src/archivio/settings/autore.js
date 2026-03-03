import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
  import autm from './autm'
  import auts from './auts'
  import autr from './autr'

export default {
    collection: 'autore',
    fields() {
        return [
            new FormField({ name: 'autn', label: 'Autore', type: 'text', value: '' }),
            new FormField({ name: 'auta', label: 'Dati anagrafici', type: 'text', value: '' }),
            
            new ManyToOneField({
                name: "auts",
                label: "Riferimento all\'autore",
                value: null,
                related: "auts",
                type: "manyToOne",
                voc: "close",
                sort:"auts",
        
                preview: (item) => {
                  return `${item?.auts}`;
                },
                fields: auts.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { auts: { _contains: text } };
                },
              }),
            new ManyToOneField({
                name: "autr",
                label: "Riferimento all\'intervento",
                value: null,
                related: "autr",
                type: "manyToOne",
                sort:"autr",
        
                preview: (item) => {
                  return `${item?.autr}`;
                },
                fields: autr.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { autr: { _contains: text } };
                },
              }),

         


            new ManyToManyField({
                name: 'autm',
                label: 'Motivazione', value: [],
                related: 'autm',
                foreign_key: 'autm_id',
                voc:'close',
        sort:"autm",

                preview: (item) => { return `${item?.autm}` },
                fields: autm.fields,
                filter: (text) => {
                    if(text.trim()==='') return {}
                    return { tipo: { _contains: text } }
                },
            }),
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'autoreString',label:'AUTN',sortable: true},
            {key:'auta',label:'AUTA',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}