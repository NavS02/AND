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
    collection: 'isrt',
    fields() {
        return [
            
            
            new FormField({ name: 'isrt', label: 'Tipo di caratteri', type: 'text', value: '' }),
            
           
        ]
    }
}