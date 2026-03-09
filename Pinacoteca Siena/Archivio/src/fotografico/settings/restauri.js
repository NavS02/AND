import {FormField} from '../../models'

export default {
    collection: 'restauri',
    fields() {
        return [
            // (?)
            new FormField({ name: 'rstp', label: 'RSTP - Riferimento alla parte', type: 'text', value: '' }),
            new FormField({ name: 'rsti', label: 'RSTI - Tipo di intervento', type: 'text', value: '' }),
            new FormField({ name: 'rstd', label: 'RSTD - Riferimento cronologico', type: 'text', value: '' }),
            new FormField({ name: 'rstt', label: 'RSTT - Descrizione intervento', type: 'textarea', value: '' }),
            new FormField({ name: 'rste', label: 'RSTE - Ente Responsabile', type: 'text', value: '' }),
            new FormField({ name: 'rstr', label: 'RSTR - Ente finanziatore / sponsor', type: 'text', value: '' }),
            new FormField({ name: 'rstn', label: 'RSTN - Responsabile intervento / nome operatore', type: 'text', value: '' }),
            new FormField({ name: 'rsto', label: 'RSTO - Note', type: 'textarea', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'rsti',label:'RSTI - Tipo di intervento',sortable:false},
            {key:'rstn',label:'RSTN - Responsabile intervento',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}