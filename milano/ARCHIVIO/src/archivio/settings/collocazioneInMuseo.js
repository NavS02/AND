import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
  import sala from './sala'
  import piano from './piano'

export default {
    collection: 'collocazioneInMuseo',
    fields() {
        return [
            
            new ManyToOneField({
                name: "sala",
                label: "Sala",
                value: null,
                related: "sala",
                type: "manyToOne",
                voc: "open",
        sort:"sala",

        
                preview: (item) => {
                  return `${item?.sala}`;
                },
                fields: sala.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { sala: { _contains: text } };
                },
              }),
            new ManyToOneField({
                name: "piano",
                label: "Piano",
                value: null,
                related: "piano",
        sort:"piano",

                type: "manyToOne",
        
                preview: (item) => {
                  return `${item?.piano}`;
                },
                fields: piano.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { piano: { _contains: text } };
                },
              }),

         
        ]
    },
    tableFields() {
        return [
            {key:'collocazioneString',label:'Collocazione',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}