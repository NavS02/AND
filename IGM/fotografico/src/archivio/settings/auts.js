import {FormField} from '../../models'

export default {
    collection: 'auts',
    fields() {
        return [
            new FormField({ name: 'auts', label: 'AUTS - Specifiche', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'auts',label:'AUTS - Specifiche',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}