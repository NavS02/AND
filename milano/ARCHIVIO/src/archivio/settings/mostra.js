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
    collection: 'mostra',
    fields() {
        return [
      
            new FormField({ name: 'mstt', label: 'Titolo', type: 'text', value: '' }),
            new FormField({ name: 'mstl', label: 'Luogo', type: 'text', value: '' }),
            new FormField({ name: 'mstd', label: 'Data', type: 'text', value: '' }),
            new FormField({ name: 'mstini', label: 'Data iniziale', type: 'text', value: '' }),
            new FormField({ name: 'mstfin', label: 'Data finale', type: 'text', value: '' }),
            new FormField({ name: 'mstval', label: 'Valore', type: 'text', value: '' }),

           
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