import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../../models";


export default {
    collection: 'biblio',
    fields() {
        return [
            new FormField({ name: 'tsk', label: 'Tipo scheda', type: 'text', value: 'BIB' }),
            new FormField({ name: 'bibh', label: 'Codice', type: 'text', value: '' }),
            new FormField({ name: 'biba', label: 'Autore', type: 'text', value: '' }),
            new FormField({ name: 'bibc', label: 'Curatore', type: 'text', value: '' }),
            new FormField({ name: 'bibg', label: 'Titolo libro / revista', type: 'text', value: '' }),
            new FormField({ name: 'bibt', label: 'Titolo contributo', type: 'text', value: '' }),
            new FormField({ name: 'bibl', label: 'Luogo di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibz', label: 'Editore', type: 'text', value: '' }),
            new FormField({ name: 'bibd', label: 'Anno di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibe', label: 'Numero di edizione', type: 'text', value: '' }),
            new FormField({ name: 'bibs', label: 'Specifiche', type: 'text', value: '' }),
            new FormField({ name: 'bibv', label: 'Volume', type: 'text', value: '' }),
            new FormField({ name: 'bibp', label: 'Pagina / Numero catalogo', type: 'text', value: '' }),
            new FormField({ name: 'bibh', label: 'Sigla per citazione', type: 'text', value: '' }),
            new FormField({ name: 'cmpd', label: 'Data compilazione', type: 'text', value: '' }),
            new FormField({ name: 'cmpn', label: 'Nome compilatore', type: 'text', value: '' }),
           
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