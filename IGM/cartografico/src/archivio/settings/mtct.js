import {FormField} from '../../models'

export default {
    collection: 'MTCT',
    fields() {
        return [
            new FormField({ name: 'MTCT', label: 'MTCT – Tecnica', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'MTCT',label:'MTCT – Tecnica',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}