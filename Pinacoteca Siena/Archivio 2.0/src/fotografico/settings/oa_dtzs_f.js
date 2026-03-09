import {FormField} from '../../models'

export default {
    collection: 'oa_dtzs_f',
    fields() {
        return [
            new FormField({ name: 'dtzs', label: 'DTZS – Specifiche data', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzs',label:'DTZS',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}