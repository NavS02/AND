import {FormField} from '../../models'

export default {
    collection: 'autr',
    fields() {
        return [
            new FormField({ name: 'autr', label: 'AUTR – Ruolo', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'autr',label:'AUTR – Ruolo *',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}