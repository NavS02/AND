import {FormField,ManyToOneField} from '../../models'
export default {
    collection: 'rifst',
    fields() {
        return [
          

              new FormField({ name: 'rifst', label: 'RIFST - Rif. Stampa', type: 'text', value: '' }),

          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'rifst',label:'RIFST - Rif. Stampa',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}