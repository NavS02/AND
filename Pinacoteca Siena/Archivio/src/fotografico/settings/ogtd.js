import {FormField} from '../../models'

export default {
    collection: 'ogtd',
    fields() {
        return [
            new FormField({ name: 'ogtd', label: 'OGTD - Definizione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ogtd',label:'OGTD - Definizione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}