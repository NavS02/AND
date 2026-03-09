import {FormField} from '../../models'

export default {
    collection: 'stimf',
    fields() {
        return [
            new FormField({ name: 'stimf', label: 'stimf', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'stimf',label:'stimf',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}