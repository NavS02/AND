import {FormField} from '../../models'

export default {
    collection: 'acqt',
    fields() {
        return [
            new FormField({ name: 'acqt_f', label: 'ACQT – Tipo Acquisizione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'acqt_f',label:'ACQT – Tipo Acquisizione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}