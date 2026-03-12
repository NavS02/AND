import {FormField} from '../../models'

export default {
    collection: 'mtcm_F',
    fields() {
        return [
            new FormField({ name: 'mtcm_F', label: 'MTCM - Materia', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mtcm_F',label:'MTCM - Materia',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}