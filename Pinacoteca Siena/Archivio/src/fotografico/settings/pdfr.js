import {FormField} from '../../models'

export default {
    collection: 'pdfr',
    fields() {
        return [
            new FormField({ name: 'pdfr', label: 'PDFR - Ruolo', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'pdfr',label:'PDFR - Ruolo',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}