import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";import { opera } from '..'

export default {
    collection: 'stim_stima',
    fields() {
        return [
            new FormField({ name: 'stim', label: 'STIM-Motivazione della Stima', type: 'text', value: '' }),
        
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'nome',label:'Nome',sortable: true},
            {key:'opere',label:'Opere',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}