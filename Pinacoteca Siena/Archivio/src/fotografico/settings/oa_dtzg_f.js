import {FormField} from '../../models'

export default {
    collection: 'oa_dtzg_f',
    fields() {
        return [
            new FormField({ name: 'dtzg', label: 'DTZG - Periodo', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzg',label:'DTZG',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}