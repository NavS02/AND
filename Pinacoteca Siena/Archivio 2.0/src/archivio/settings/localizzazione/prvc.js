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
    collection: 'prvc',
    fields() {
        return [
            
            
            new FormField({ name: 'prvc', label: 'PRVC-Comune', type: 'text', value: '' }),
            
           
        ]
    }
}