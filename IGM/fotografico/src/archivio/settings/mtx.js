import {FormField} from '../../models'

export default {
    collection: 'mtx',
    fields() {
        return [
            new FormField({ name: 'mtx', label: 'MTX – Indicazione colore', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mtx',label:'MTX – Indicazione colore',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}