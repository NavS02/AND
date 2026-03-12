import {FormField} from '../../models'

export default {
    collection: 'cdgg',
    fields() {
        return [
            new FormField({ name: 'cdgg', label: 'CDGG – Cond. Giuridica', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'cdgg',label:'CDGG – Cond. Giuridica',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}