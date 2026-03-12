import {FormField} from '../../models'

export default {
    collection: 'dtzs_carte',
    fields() {
        return [
            new FormField({ name: 'dtzs_carte', label: 'DTZS – Specifiche data', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzs_carte',label:'DTZS – Specifiche data',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}