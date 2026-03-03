import rstn from './restauro/rstn'
import rstr from './restauro/rstr'
import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Files,
    Image,
  } from "../../models";
  
export default {
    collection: 'roz',
    fields() {
        return [
            // new FormField({ name: 'id', label: 'id', type: 'text' }),
           
            new FormField({ name: 'rstd', label: 'Data', type: 'text', value: '' }),
            new FormField({ name: 'rste', label: 'Ente responsabile', type: 'text', value: '' }),
            
            new ManyToOneField({
                name: "rstn",
                label: "Nome operatore",
                value: null,
                related: "rstn",
                type: "manyToOne",
                sort:"rstn",

                preview: (item) => {
                  return `${item?.rstn}`;
                },
                fields: rstn.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { rstn: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "rstr",
                label: "Ente finanziatore",
                value: null,
                related: "rstr",
                type: "manyToOne",
                sort:"rstr",

                preview: (item) => {
                  return `${item?.rstr}`;
                },
                fields: rstr.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { rstr: { _contains: text } };
                },
              }),
            new FormField({ name: 'rsts', label: 'Situazione', type: 'text', value: '' }),
            new FormField({ name: 'rstl', label: 'Luogo', type: 'text', value: '' }), 
            new FormField({ name: 'rsdu', label: 'Uscita', type: 'text', value: '' }),
            new FormField({ name: 'rsdr', label: 'Ente finanziatore', type: 'text', value: '' }),
            new FormField({ name: 'rstnote', label: 'Note', type: 'text', value: '' }),
            new Files({ name: 'files', label: 'Files allegati', foreign_key:'directus_files_id', value:[],
            fit: 'contain', width: 100, height: 100, quality: 80,column:4 }),
            
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'restauroString',label:'RSTN-RSTD',sortable: true},
            {key:'rsts',label:'Rsts',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}


