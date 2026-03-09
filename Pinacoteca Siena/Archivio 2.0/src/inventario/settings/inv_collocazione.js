import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../../models";
import inv_ubicazione from "./inv_ubicazione";
import inv_sala from "./inv_sala";

export default {
    collection: 'inv_',
    fields() {
        return [

            new ManyToOneField({
                name: "inv_sala",
                label: "Sala",
                value: null,
                related: "inv_sala",
                type: "manyToOne",
                column: "4",
        
                preview: (item) => {
                  return `${item?.inv_sala}`;
                },
                fields: inv_sala.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { inv_sala: { _contains: text } };
                },
              }),
              new FormField({
                name: "inv_piano",
                label: "Piano",
                type: "text",
                value: "",
              }),
              new ManyToOneField({
                name: "inv_ubicazione",
                label: "Ubicazione",
                value: null,
                related: "inv_ubicazione",
                type: "manyToOne",
                column: "4",
        
                preview: (item) => {
                  return `${item?.inv_ubicazione}`;
                },
                fields: inv_ubicazione.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { inv_ubicazione: { _contains: text } };
                },
              }),           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable: false},

            {key:'inv_sala',label:'Sala',sortable: false},
            {key:'inv_ubicazione',label:'Ubicazione',sortable: false},
            {key:'actions',label:'Azione',sortable: false},
            
        ]
    }
}