import {FormField} from '../../models'

export default {
    collection: 'ogtt',
    fields() {
        return [
            new FormField({ name: 'OGTT', label: 'OGTT - Tipologia', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'OGTT',label:'OGTT - Tipologia',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}