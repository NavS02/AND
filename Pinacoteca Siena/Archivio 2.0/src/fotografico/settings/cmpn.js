import {FormField} from '../../models'

export default {
    collection: 'cmpn',
    fields() {
        return [
            new FormField({ name: 'cmpn', label: 'Nome', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'nome',label:'Nome',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}