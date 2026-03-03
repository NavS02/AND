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
    collection: 'committenza',
    fields() {
        return [

            new FormField({ name: 'cmmn', label: 'Nome', type: 'text', value: '' }),
            new FormField({ name: 'cmmd', label: 'Data', type: 'text', value: '' }),
            new FormField({ name: 'cmmmc', label: 'Circonstanza', type: 'text', value: '' }),
            new FormField({ name: 'cmmmf', label: 'Fonte', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'cmmn',label:'Cmmn',sortable: true},
            {key:'cmmd',label:'Cmmd',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}