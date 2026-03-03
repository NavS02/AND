import {FormField, OneToManyField} from '../../../models'

export default {
    collection: 'touch',
    fields() {
        return [
            new FormField({ name: 'comune', label: 'Comune', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'comune',label:'comune',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}