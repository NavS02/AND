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
    collection: 'stmc',
    fields() {
        return [
            
            
            new FormField({ name: 'stmc', label: 'Classe di appartenenza', type: 'text', value: '' }),
            
           
        ]
    }
}