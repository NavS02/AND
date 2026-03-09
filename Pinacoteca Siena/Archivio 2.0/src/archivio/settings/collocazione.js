import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../models";import { opera } from '.'

export default {
    collection: 'collocazione',
    fields() {
        return [
            new FormField({ name: 'ldcn', label: 'LDCN-Collocazione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ldcn',label:'Localizzazione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}