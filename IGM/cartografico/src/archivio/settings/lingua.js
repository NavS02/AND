import {FormField} from '../../models'

export default {
    collection: 'lingua_carte',
    fields() {
        return [
            new FormField({ name: 'lingua', label: 'Lingua', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'lingua',label:'Lingua',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}