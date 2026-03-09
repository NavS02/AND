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
    collection: 'prcq',
    fields() {
        return [
            
            
            new FormField({ name: 'prcq', label: 'PRCQ-Qualificazione', type: 'text', value: '' }),
            
           
        ]
    }
}