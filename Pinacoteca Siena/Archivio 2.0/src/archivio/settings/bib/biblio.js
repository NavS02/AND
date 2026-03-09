import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";

export default {
    collection: 'biblio',
    fields() {
        return [
            new FormField({ name: 'tsk', label: 'TSK-Tipo scheda', type: 'text', value: 'BIB' }),
            new FormField({ name: 'bibh', label: 'BIBH-Codice', type: 'text', value: '' }),
            new FormField({ name: 'biba', label: 'BIBA-Autore', type: 'text', value: '' }),
            new FormField({ name: 'bibc', label: 'BIBC-Curatore', type: 'text', value: '' }),
            new FormField({ name: 'bibg', label: 'BIBG-Titolo libro / revista', type: 'text', value: '' }),
            new FormField({ name: 'bibt', label: 'BIBT-Titolo contributo', type: 'text', value: '' }),
            new FormField({ name: 'bibl', label: 'BIBL-Luogo di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibz', label: 'BIBZ-Editore', type: 'text', value: '' }),
            new FormField({ name: 'bibd', label: 'BIBD-Anno di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibe', label: 'BIBE-Numero di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibs', label: 'BIBS-Specifiche', type: 'text', value: '' }),
            new FormField({ name: 'bibv', label: 'BIBV-Volume', type: 'text', value: '' }),
            new FormField({ name: 'bibp', label: 'BIBP-Pagina / Numero catalogo', type: 'text', value: '' }),
            new FormField({ name: 'cmpd', label: 'CMPD-Data compilazione', type: 'text', value: '' }),
            new FormField({ name: 'cmpn', label: 'CMPN-Nome compilatore', type: 'text', value: '' }),
           
        ]
    },
        
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'biba',label:'Biba',sortable: true},
            {key:'bibc',label:'Bibc',sortable: true},
             {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}