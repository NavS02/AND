import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
  import isrc from './iscrizione/isrc'
import isrl from './iscrizione/isrl'
import isrs from './iscrizione/isrs'
import isrt from './iscrizione/isrt'

export default {
    collection: 'iscrizione',
    fields() {
        return [
            new ManyToOneField({
                name: "isrc",
                label: "Classe di appartenenza",
                value: null,
                related: "isrc",
                type: "manyToOne",
                voc:"open",
                sort:"isrc",
        
                preview: (item) => {
                  return `${item?.isrc}`;
                },
                fields: isrc.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { isrc: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "isrl",
                label: "Lingua",
                value: null,
                related: "isrl",
                type: "manyToOne",
                sort:"isrl",
        
                preview: (item) => {
                  return `${item?.isrl}`;
                },
                fields: isrl.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { isrl: { _contains: text } };
                },
              }),



              new ManyToOneField({
                name: "isrs",
                label: "Tecnica di scrittura",
                value: null,
                related: "isrs",
                type: "manyToOne",
                sort:"isrs",
        
                preview: (item) => {
                  return `${item?.isrs}`;
                },
                fields: isrs.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { isrs: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "isrt",
                label: "Tipo di caratteri",
                value: null,
                related: "isrt",
                type: "manyToOne",
                sort:"isrt",
        
                preview: (item) => {
                  return `${item?.isrt}`;
                },
                fields: isrt.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { isrt: { _contains: text } };
                },
              }),



            new FormField({ name: 'isrp', label: 'Posizione', type: 'text', value: '' }),
            new FormField({ name: 'isra', label: 'Autore', type: 'text', value: '' }),
            new FormField({ name: 'isri', label: 'Trascrizione', type: 'textarea', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'isrp',label:'Isrp',sortable: true},
            {key:'isra',label:'Isra',sortable: true},
            {key:'isri',label:'Isri',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}