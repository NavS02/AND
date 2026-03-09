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
            
            
            new FormField({ name: 'tcl', label: 'TCL-Tipo di localizzazione', type: 'text', value: '' }),
            
           
        ]
    }
}