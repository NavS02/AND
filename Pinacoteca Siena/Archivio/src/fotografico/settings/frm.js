import {FormField} from '../../models'

export default {
    collection: 'frm',
    fields() {
        return [
            new FormField({ name: 'frm', label: 'FRM - Formato', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'frm',label:'FRM - Formato',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}