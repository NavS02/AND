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
    collection: 'opere',
    fields() {
        return [
            new FormField({ name: 'ogtd_oa', label: 'OGTD-Definizione dell\'oggetto', type: 'text', value: '' }),
           
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