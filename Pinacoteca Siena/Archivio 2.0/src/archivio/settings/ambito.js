import atbm from './ambito/atbm'
import atbr from './ambito/atbr'
import atbd from './ambito/atbd'

import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../models";
  
export default {
    collection: 'ambito',
    fields() {
        return [
          
          new ManyToOneField({
            name: "atbd",
            label: "ATBD-Denominazione",
            value: null,
            related: "atbd",
            type: "manyToOne",
    
            preview: (item) => {
              return `${item?.atbd}`;
            },
            fields: atbd.fields,
            filter: (text) => {
              if (text.trim() === "") return {};
              return { atbd: { _contains: text } };
            },
          }),
            new ManyToOneField({
                name: "atbr",
                label: "ATBR-Riferimento all\'intervento",
                value: null,
                related: "atbr",
                type: "manyToOne",
        
                preview: (item) => {
                  return `${item?.atbr}`;
                },
                fields: atbr.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { atbr: { _contains: text } };
                },
              }),
              new ManyToManyField({
                name: "atbm",
                label: "ATBM-Motivazione",
                value: [],
                related: "atbm",
                foreign_key: "atbm_id",
                column: "6",
                voc:"close",
                preview: (item) => {
                  return `${item?.atbm}`;
                },
                fields: atbm.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { atbm: { _contains: text } };
                },
              }),
        
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'atbm',label:'Atbm',sortable: true},
            {key:'atbr',label:'Atbr',sortable: true},
            
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}