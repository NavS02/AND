import {FormField} from '../../models'

export default {
    collection: 'editore_carte',
    fields() {
        return [
            new FormField({ name: 'edit', label: 'EDIT - Editore', type: 'text', value: '' }),
            new FormField({ name: 'editc', label: 'EDITC - Città', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'edit',label:'EDIT - Editore',sortable:false},
            {key:'editc',label:'EDITC - Città',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}