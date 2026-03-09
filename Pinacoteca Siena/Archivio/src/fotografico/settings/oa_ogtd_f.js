import {FormField} from '../../models'

export default {
    collection: 'oa_ogtd_f',
    fields() {
        return [
            new FormField({ name: 'ogtd', label: 'OGTD - Definizione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:true},
            {key:'ogtd',label:'OGTD - Definizione',sortable:true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}