import {FormField} from '../../models'

export default {
    collection: 'autore_carte',
    fields() {
        return [
            new FormField({ name: 'AUTN', label: 'AUTN - Autore', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'AUTN',label:'AUTN - Autore',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}