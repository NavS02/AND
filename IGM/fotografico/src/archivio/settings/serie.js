import {FormField} from '../../models'

export default {
    collection: 'serie',
    fields() {
        return [
            new FormField({ name: 'sfit', label: 'SFIT - Titolo della serie', type: 'text', value: '' }),
            
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'sfit',label:'SFIT - Titolo della serie',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}