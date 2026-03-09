import {FormField} from '../../models'

export default {
    collection: 'isrs',
    fields() {
        return [
            new FormField({ name: 'isrs', label: 'isrs', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'isrs',label:'isrs',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}