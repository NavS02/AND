import {FormField} from '../../models'

export default {
    collection: 'lrcr_f',
    fields() {
        return [
            new FormField({ name: 'lrcr', label: 'LRCR - Regione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'lrcr',label:'LRCR - Regione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}