import {FormField} from '../../models'

export default {
    collection: 'pvcp',
    fields() {
        return [
            new FormField({ name: 'pvcp', label: 'PVCP- Provincia', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'pvcp',label:'PVCP- Provincia',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}