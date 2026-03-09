import {FormField} from '../../models'

export default {
    collection: 'isrl',
    fields() {
        return [
            new FormField({ name: 'isrl', label: 'isrl', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'isrl',label:'isrl',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}