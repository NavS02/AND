import {FormField, OneToManyField} from '../../models'
import { opera } from '.'

export default {
    collection: 'opere',
    fields() {
        return [
            new FormField({ name: 'roff', label: 'roff', type: 'text', value: '' }),
          
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'nome',label:'Nome',sortable: true},
            {key:'opere',label:'Opere',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}