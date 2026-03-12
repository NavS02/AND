import {FormField} from '../../models'

export default {
    collection: 'pvcs',
    fields() {
        return [
            new FormField({ name: 'pvcs', label: 'PVCS - Stato', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'pvcs',label:'PVCS - Stato',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}