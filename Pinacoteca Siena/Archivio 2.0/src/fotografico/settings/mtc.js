import {FormField} from '../../models'

export default {
    collection: 'MTC',
    fields() {
        return [
            new FormField({ name: 'mtc', label: 'MTC', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mtc',label:'MTC',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}