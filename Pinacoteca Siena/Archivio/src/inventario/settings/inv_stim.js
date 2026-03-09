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
    collection: 'inv_stim',
    fields() {
        return [

            new FormField({ name: 'inv_stim', label: 'inv_stim', type: 'text', value: '' }),
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable: false},

            {key:'inv_stim',label:'inv_stim',sortable: false},
            {key:'actions',label:'Azione',sortable: false},
            
        ]
    }
}