import {
    FormField,
  } from "../../models";

export default {
    collection: 'fonte',
    fields() {
        return [
      
            new FormField({ name: 'fntp', label: 'Tipo', type: 'text', value: '' }),
           
           
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