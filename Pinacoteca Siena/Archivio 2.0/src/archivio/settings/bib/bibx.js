import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";

export default {
    collection: 'bibx',
    fields() {
        return [

            new FormField({ name: 'bibx', label: 'BIBX-Genere', type: 'text', value: '' }),
            
           
        ]
    },
        
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'biba',label:'Biba',sortable: true},
            {key:'bibc',label:'Bibc',sortable: true},
             {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}