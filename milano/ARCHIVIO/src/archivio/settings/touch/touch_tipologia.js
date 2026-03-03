import {FormField, OneToManyField} from '../../../models'

export default {
    collection: 'touch',
    fields() {
        return [
            new FormField({ name: 'tipologia', label: 'tipologia', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'tipologia',label:'tipologia',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}