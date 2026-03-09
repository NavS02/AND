import {FormField} from '../../models'

export default {
    collection: 'isrc',
    fields() {
        return [
            new FormField({ name: 'isrc', label: 'ISRC', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'isrc',label:'ISRC',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}