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
    collection: 'mtc',
    fields() {
        return [
            // new FormField({ name: 'id', label: 'id', type: 'text' }),
            // new FormField({ name: 'ognac', label: 'Ognac', type: 'number', value: '' }),
            new FormField({ name: 'mtc', label: 'MTC-Materia e tecnica', type: 'text', value: '' }),
            // new FormField({ name: 'date_created', label: 'date_created', type: 'text' }),
            // new FormField({ name: 'date_updated', label: 'date_updated', type: 'text' }),
            // new FormField({ name: 'user_created', label: 'user_created', type: 'text' }),
            // new FormField({ name: 'user_updated', label: 'user_updated', type: 'text' }),
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'mtc',label:'mtc',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }

}
