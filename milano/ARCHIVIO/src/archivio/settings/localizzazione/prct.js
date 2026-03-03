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
    collection: 'prct',
    fields() {
        return [
            
            
            new FormField({ name: 'prct', label: 'Tipologia', type: 'text', value: '' }),
            
           
        ]
    }
}