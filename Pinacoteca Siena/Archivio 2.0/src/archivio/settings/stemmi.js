import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../models";
  import stmc from './stemmi/stmc'
import stmq from './stemmi/stmq'

export default {
    collection: 'stemmi',
    fields() {
        return [
            new ManyToOneField({
                name: "stmc",
                label: "STMC-Classe di appartenenza",
                value: null,
                related: "stmc",
                type: "manyToOne",
        
                preview: (item) => {
                  return `${item?.stmc}`;
                },
                fields: stmc.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { stmc: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "stmq",
                label: "STMQ-Qualificazione",
                value: null,
                related: "stmq",
                type: "manyToOne",
        
                preview: (item) => {
                  return `${item?.stmq}`;
                },
                fields: stmq.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { stmq: { _contains: text } };
                },
              }),
           //stmc waiting for select box 
           //stmq waiting for select box 
            new FormField({ name: 'stmi', label: 'STMI-Identificazione', type: 'text', value: '' }),
            new FormField({ name: 'stmu', label: 'STMU-Quantità', type: 'number', value: '' }),
            new FormField({ name: 'stmp', label: 'STMP-Posizione', type: 'text', value: '' }),
            new FormField({ name: 'stmd', label: 'STMD-Descrizione', type: 'text', value: '' }),
           
        ]
    },
    
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'stmi',label:'Stmi',sortable: true},
            {key:'stmu',label:'Stmu',sortable: true},
            {key:'stmp',label:'Stmp',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}