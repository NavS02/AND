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
    collection: 'adt',
    fields() {
        return [
            
            
            new FormField({ name: 'adt', label: 'Altre datazioni', type: 'text', value: '' }),
            
           
        ]
    }
}