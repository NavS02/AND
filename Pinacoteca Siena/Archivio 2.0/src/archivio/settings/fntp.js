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
    collection: 'fonte',
    fields() {
        return [
      
            new FormField({ name: 'fntp', label: 'FNTP-Tipo', type: 'text', value: '' }),
           
           
        ]
    },
            
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'fnta',label:'Fnta',sortable: true},
            {key:'fntt',label:'Fntt',sortable: true},
            {key:'fntd',label:'Fntd',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}