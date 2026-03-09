import {FormField} from '../../models'

export default {
    collection: 'oa_sclo',
    fields() {
        return [
            new FormField({ name: 'sclo', label: 'SCLO', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'sclo',label:'SCLO',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}