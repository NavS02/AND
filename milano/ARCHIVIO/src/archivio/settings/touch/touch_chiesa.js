import {
    FormField,
    SelectField,
    ManyToManyField,
    RadioField,
    ManyToOneField,
    File,
    Files,
    Image,
  } from "../../../models";
  
export default {
    collection: 'touch_chiesa',
    fields() {
        return [
            new Image({
                name: "icona",
                label: "Icona",
                fit: "contain",
                width: 100,
                height: 100,
                quality: 10,
                column: 12,
              }),
            new FormField({ name: 'nome', label: 'Nome', type: 'text', value: '' }),
            new FormField({ name: 'comune', label: 'Comune', type: 'text', value: '' }),
            new FormField({
                name: "descrizione_breve",
                label: "Descrizione",
                type: "richtext",
                value: "",
              }),
              new FormField({
                name: "mappa",
                label: "Mappa",
                type: "map",
                value: "",
              }),
        ]
    },
    tableFields() {
        return [
            {key:'nome',label:'Nome',sortable: false},

            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}