import {FormField} from '../../models'

export default {
    collection: 'lrcs',
    fields() {
        return [
            new FormField({ name: 'lrcs', label: 'LRCS - Stato', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'lrcs',label:'LRCS - Stato',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}