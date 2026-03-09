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
    collection: 'inventario',
    fields() {
        return [
            new FormField({ name: 'invn', label: 'INVN-Numero', type: 'text', value: '' }),
            new FormField({ name: 'invd', label: 'INVD-Data', type: 'text', value: '' }),
            new FormField({ name: 'invc', label: 'INVC-Collocazione', type: 'text', value: '' }),
           
        ]
    }
}