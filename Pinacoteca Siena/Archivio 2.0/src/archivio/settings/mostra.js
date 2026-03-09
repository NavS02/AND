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
    collection: 'mostra',
    fields() {
        return [
      
            new FormField({ name: 'mstt', label: 'MSTT-Titolo', type: 'text', value: '' }),
            new FormField({ name: 'mstl', label: 'MSTL-Luogo', type: 'text', value: '' }),
            new FormField({ name: 'mstd', label: 'MSTD-Data', type: 'text', value: '' }),
            new FormField({ name: 'mstini', label: 'MSTINI-Data iniziale', type: 'text', value: '' }),
            new FormField({ name: 'mstfin', label: 'MSTFIN-Data finale', type: 'text', value: '' }),
            new FormField({ name: 'mstval', label: 'MSTVAL-Valore', type: 'text', value: '' }),

           
        ]
    },
            
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mstt',label:'Mstt',sortable: true},
            {key:'mstd',label:'Mstd',sortable: true},
            {key:'mstfin',label:'Mstfin',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}