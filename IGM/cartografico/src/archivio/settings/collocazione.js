import {FormField} from '../../models'

export default {
    collection: 'carte_collocazione',
    fields() {
        return [
            new FormField({ name: 'ldcn', label: 'LDCN –Denominazione', type: 'text', value: '' }),
                       
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ldcn',label:'LDCN –Denominazione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}