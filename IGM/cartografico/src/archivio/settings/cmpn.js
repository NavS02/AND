import {FormField} from '../../models'

export default {
    collection: 'cmpn',
    fields() {
        return [
            new FormField({ name: 'cmpn_nome', label: 'CMPN - Compilatore', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'cmpn_nome',label:'CMPN - Compilatore',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}