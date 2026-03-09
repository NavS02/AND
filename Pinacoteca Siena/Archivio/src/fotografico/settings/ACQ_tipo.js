import {FormField} from '../../models'

export default {
    collection: 'acqt',
    fields() {
        return [
            new FormField({ name: 'ACQ_tipo', label: 'ACQ – Tipo ', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ACQ_tipo',label:'ACQ – Tipo ',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}