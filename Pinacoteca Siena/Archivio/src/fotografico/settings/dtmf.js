import {FormField} from '../../models'

export default {
    collection: 'dtmf',
    fields() {
        return [
            new FormField({ name: 'dtmf', label: 'DTM – Motivazione Data', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtmf',label:'DTM – Motivazione Data',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}