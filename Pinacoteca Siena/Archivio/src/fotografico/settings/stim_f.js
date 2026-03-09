import {FormField,ManyToOneField} from '../../models'
export default {
    collection: 'stim_f',
    fields() {
        return [
          

              new FormField({ name: 'stim_f', label: 'STIM - Motivazione', type: 'text', value: '' }),

          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'stim_f',label:'STIM - Motivazione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}