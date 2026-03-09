import {
    FormField,

  } from "../../models";
export default {
    collection: 'autm_autore',
    fields() {
        return [
            new FormField({ name: 'autm_autore', label: 'AUTM-Tipo', type: 'text', value: '' }),
        ]
    }
}