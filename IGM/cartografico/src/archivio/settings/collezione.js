import {FormField} from '../../models'

export default {
    collection: 'collezione_carte',
    fields() {
        return [
            new FormField({ name: 'collezione', label: 'Collezione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'collezione',label:'Collezione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}