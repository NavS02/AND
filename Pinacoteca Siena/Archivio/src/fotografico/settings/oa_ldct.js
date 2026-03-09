import {FormField} from '../../models'

export default {
    collection: 'oa_ldct',
    fields() {
        return [
            new FormField({ name: 'ldct', label: 'LDCT', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ldct',label:'LDCT',sortable:true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}