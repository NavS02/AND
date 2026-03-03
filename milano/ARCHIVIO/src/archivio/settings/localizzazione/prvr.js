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
    collection: 'prvl',
    fields() {
        return [
            
            
            new FormField({ name: 'prvr', label: 'Regione', type: 'text', value: '' }),
            
           
        ]
    }
}