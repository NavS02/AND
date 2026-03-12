import {FormField} from '../../models'

export default {
    collection: 'MTCM',
    fields() {
        return [
            new FormField({ name: 'MTCM', label: 'MTCM – Materia', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'MTCM',label:'MTCM – Materia',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}