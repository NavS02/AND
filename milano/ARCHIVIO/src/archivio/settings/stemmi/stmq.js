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
    collection: 'stmq',
    fields() {
        return [
            
            
            new FormField({ name: 'stmq', label: 'Qualificazione', type: 'text', value: '' }),
            
           
        ]
    }
}