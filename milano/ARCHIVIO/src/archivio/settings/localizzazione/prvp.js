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
    collection: 'prvp',
    fields() {
        return [
            
            
            new FormField({ name: 'prvp', label: 'Provincia', type: 'text', value: '' }),
            
           
        ]
    }
}