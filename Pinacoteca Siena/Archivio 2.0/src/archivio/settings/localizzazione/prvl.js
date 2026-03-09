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
    collection: 'prvl',
    fields() {
        return [
            
            
            new FormField({ name: 'prvl', label: 'PRVL-Località', type: 'text', value: '' }),
            
           
        ]
    }
}