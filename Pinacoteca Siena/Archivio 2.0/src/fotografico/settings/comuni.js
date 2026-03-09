import {FormField,ManyToOneField} from '../../models'
export default {
    collection: 'comuni',
    fields() {
        return [
          

              new FormField({ name: 'comune', label: 'Comune', type: 'text', value: '' }),

          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'comune',label:'Comune',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}