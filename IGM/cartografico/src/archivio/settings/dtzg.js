import {FormField} from '../../models'

export default {
    collection: 'dtzg_carte',
    fields() {
        return [
            new FormField({ name: 'dtzg_carte', label: 'DTZG - periodo', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzg_carte',label:'DTZG - periodo',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}