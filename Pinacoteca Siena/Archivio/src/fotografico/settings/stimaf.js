import {FormField,ManyToOneField,RadioField} from '../../models'
import stimf from "./stimf"


export default {
    collection: 'stimaf',
    fields() {
        return [
            new FormField({ name: 'stis', label: 'STIS', type: 'text', value: '' }),
            new FormField({ name: 'stid', label: 'STID', type: 'text', value: '' }),
            new ManyToOneField({
                name: "stimf",
                label: "stimf",
                value: null,
                related: "stimf",
                type: "manyToOne",
                column: "12",
        
                preview: (item) => {
                  return `${item?.stimf}`;
                },
                fields: stimf.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { stimf: { _contains: text } };
                },
              }), 
             
            ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'stis',label:'stis',sortable:false},
            {key:'stid',label:'stid',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}