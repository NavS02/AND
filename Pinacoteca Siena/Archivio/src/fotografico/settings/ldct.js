import {FormField} from '../../models'

export default {
    collection: 'ldct',
    fields() {
        return [
            new FormField({ name: 'ldct', label: 'LDCT - Tipologia ', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ldct',label:'LDCT - Tipologia ',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}