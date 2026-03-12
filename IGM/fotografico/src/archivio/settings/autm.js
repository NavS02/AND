import {FormField} from '../../models'

export default {
    collection: 'autm',
    fields() {
        return [
            new FormField({ name: 'autm', label: 'AUTM - Motivazione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'autm',label:'AUTM - Motivazione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}