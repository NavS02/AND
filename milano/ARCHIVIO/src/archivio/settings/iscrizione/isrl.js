import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../../models";

export default {
    collection: 'iscrizione',
    fields() {
        return [
            
            new FormField({ name: 'isrl', label: 'Lingua', type: 'text', value: '' }),
           
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