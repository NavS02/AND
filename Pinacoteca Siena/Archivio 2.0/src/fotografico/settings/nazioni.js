import {FormField,ManyToOneField} from '../../models'
export default {
    collection: 'nazioni',
    fields() {
        return [
          

              new FormField({ name: 'nazione', label: 'Stato', type: 'text', value: '' }),

          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'nazione',label:'Stato',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}