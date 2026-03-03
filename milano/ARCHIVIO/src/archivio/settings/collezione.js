import {FormField} from '../../models'

export default {
    collection: 'collezione',
    fields() {
        return [
            new FormField({ name: 'collezione', label: 'collezione', type: 'text', value: '' }),
            
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'collezione',label:'collezione',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}