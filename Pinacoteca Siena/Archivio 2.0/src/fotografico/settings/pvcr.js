import {FormField} from '../../models'

export default {
    collection: 'pvcr',
    fields() {
        return [
            new FormField({ name: 'pvcr', label: 'PVCR - Regione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'pvcr',label:'PVCR - Regione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}