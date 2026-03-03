import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../../models";
import sti_tipo from '../stima/sti_tipo'
import stim from '../stima/stim'

export default {
    collection: 'stima',
    fields() {
        return [

            new FormField({ name: 'stis', label: 'Stima', type: 'text', value: '' }),
            new FormField({ name: 'stis_assicurazione', label: 'Stima assicurazione', type: 'text', value: '' }),
            new FormField({ name: 'stid', label: 'Data della stima', type: 'text', value: '' }),
            
            new ManyToOneField({
                name: "sti_tipo",
                label: "Tipologia Oggetti",
                value: null,
                related: "sti_tipo",
                type: "manyToOne",
        sort:"sti_tipo",

                voc:'open',
                preview: (item) => {
                  return `${item?.sti_tipo}`;
                },
                fields: sti_tipo.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { sti_tipo: { _contains: text } };
                },
              }),

              new ManyToOneField({
                name: "stim",
                label: "Motivazione della stima",
                value: null,
                related: "stim",
                type: "manyToOne",
        sort:"stim",

                voc:'open',
                preview: (item) => {
                  return `${item?.stim}`;
                },
                fields: stim.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { stim: { _contains: text } };
                },
              }),
        ]
    },
    tableFields() {
        return [
        ]
    }
}