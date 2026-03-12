import {FormField} from '../../models'

export default {
    collection: 'mtct_F',
    fields() {
        return [
            new FormField({ name: 'mtct_F', label: 'MTCT – Tecnica', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mtct_F',label:'MTCT – Tecnica',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}