import {FormField} from '../../models'

export default {
    collection: 'isrt',
    fields() {
        return [
            new FormField({ name: 'isrt', label: 'isrt', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'isrt',label:'isrt',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}