import {FormField} from '../../models'

export default {
    collection: 'immagine',
    fields() {
        return [
            new FormField({ name: 'image', label: 'Image', type: 'text',edit:"false",download:"true", value: '' }),
            new FormField({ name: '', label: 'Image', type: 'uploadPHP', value: '' }),
            new FormField({ name: 'fvcp', label: 'FVCP - Programma', type: 'text', value: '' }),
            new FormField({ name: 'fvcu', label: 'FVCC - Profondità', type: 'text', value: '' }),
            new FormField({ name: 'fvcm', label: 'FVCM - Misura', type: 'text', value: '' }),
            new FormField({ name: 'fvcv', label: 'FVCV - Note', type: 'textarea', value: '' }),
            new FormField({ name: 'fvm', label: 'FVM - Memoria', type: 'text', value: '' }),
            new FormField({ name: 'mts', label: 'MTS - Specifiche', type: 'text', value: '' }),
            new FormField({ name: 'link', label: 'LINK', type: 'text', value: '' }),
            new FormField({ name: 'volume', label: 'VOLUME', type: 'text', value: '' }),
            new FormField({ name: 'nome_immagine', label: 'Nome immagine', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'fvcp',label:'FVCP',sortable:false},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}