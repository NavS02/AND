import {FormField} from '../../models'

export default {
    collection: 'ogtt',
    fields() {
        return [
            new FormField({ name: 'ogtt', label: 'OGTT - Tipologia', type: 'text', value: '' }),
            
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ogtt',label:'OGTT - Tipologia',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}