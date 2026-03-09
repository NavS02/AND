import {FormField} from '../../models'

export default {
    collection: 'oa_dtsv_f',
    fields() {
        return [
            new FormField({ name: 'dtsv', label: 'DTSV', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtsv',label:'DTSV',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}