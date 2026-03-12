import {FormField} from '../../models'

export default {
    collection: 'sotto_serie',
    fields() {
        return [
            new FormField({ name: 'ssit', label: 'SSIT - Titolo della sottoserie', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ssit',label:'SSIT - Titolo della sottoserie',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}