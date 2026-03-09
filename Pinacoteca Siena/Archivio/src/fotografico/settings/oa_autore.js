import {FormField} from '../../models'

export default {
    collection: 'oa_dtsv_f',
    fields() {
        return [
            new FormField({ name: 'autn', label: 'Nome', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:true},
            {key:'autn',label:'Nome autore',sortable:true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}