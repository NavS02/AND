import {FormField} from '../../models'

export default {
    collection: 'dtzs',
    fields() {
        return [
            new FormField({ name: 'dtzs', label: 'DTZS – Specifiche data', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzs',label:'DTZS – Specifiche data',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}