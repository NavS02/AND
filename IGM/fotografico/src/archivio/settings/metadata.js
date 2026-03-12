import {FormField} from '../../models'

export default {
    collection: 'Foto',
    fields() {
        return [
            new FormField({ name: 'metadati_archivio', label: 'Archivio', type: 'text', value: '' }),
            new FormField({ name: 'metadati_software', label: 'Software', type: 'text', value: '' }),
            new FormField({ name: 'metadati_data_foto', label: 'Data della prima scansione', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'metadati_software',label:'Software',sortable:false},
            {key:'metadati_data_foto',label:'Data della prima scansione',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}