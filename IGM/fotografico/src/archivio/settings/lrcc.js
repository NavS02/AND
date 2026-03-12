import {FormField} from '../../models'

export default {
    collection: 'lrcc',
    fields() {
        return [
            new FormField({ name: 'lrcc', label: 'LRCC - Comune"', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'lrcc',label:'LRCC - Comune"',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}