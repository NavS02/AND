import {FormField} from '../../models'

export default {
    collection: 'pvcc',
    fields() {
        return [
            new FormField({ name: 'pvcc', label: 'PVCC - Comune', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'pvcc',label:'PVCC - Comune',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}