import {FormField} from '../../models'

export default {
    collection: 'pref_b',
    fields() {
        return [
            new FormField({ name: 'id_bib', label: 'ID', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id_bib',label:'ID',sortable:false},
            {key:'invn',label:'Inventario',sortable:false},
            {key:'titolo',label:'Titolo',sortable:false},
            {key:'autore',label:'Autore',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}