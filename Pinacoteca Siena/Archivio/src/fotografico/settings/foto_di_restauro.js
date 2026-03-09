import {FormField,ManyToOneField} from '../../models'
export default {
    collection: 'foto_di_restauro',
    fields() {
        return [
          

              new FormField({ name: 'foto_di_restauro', label: 'Foto', type: 'text', value: '' }),

          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'foto_di_restauro',label:'Foto',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}