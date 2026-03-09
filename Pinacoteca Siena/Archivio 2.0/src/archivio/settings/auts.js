import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Image,
  } from "../models";
export default {
    collection: 'auts',
    fields() {
        return [
            new FormField({ name: 'auts_autore', label: 'AUTS-Riferimento all\'autore', type: 'text', value: '' }),
        ]
    }
}