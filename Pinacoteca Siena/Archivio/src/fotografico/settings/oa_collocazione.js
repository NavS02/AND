import {FormField,ManyToOneField} from '../../models'
import nazione from './nazioni'
import comune from './comuni'
import oa_ldct from './oa_ldct'
export default {
    collection: 'oa_collocazione_f',
    fields() {
        return [
            new ManyToOneField({
                name: "oa_pvcs",
                label: "PVCS - Stato",
                value: null,
                related: "nazioni",
                type: "manyToOne",
                voc:"close",
                column: 12,
        
                preview: (item) => {
                  return `${item?.nazione}`;
                },
                fields: nazione.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { nazione: { _contains: text } };
                },
              }),

              new FormField({ name: 'oa_pvcp', label: 'PVCP - Provinza', type: 'text', value: '' }),

              new ManyToOneField({
                name: "oa_pvcc",
                label: "PVCS - Comune",
                value: null,
                related: "comuni",
                type: "manyToOne",
                voc:"close",
                column: 12,
        
                preview: (item) => {
                  return `${item?.comune}`;
                },
                fields: comune.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { comune: { _contains: text } };
                },
              }),


            
            new FormField({ name: 'oa_pvcf', label: 'PVCF - Frazione', type: 'text', value: '' }),

            new FormField({ name: 'oa_ldcn', label: 'LDCN - Localizzazione', type: 'text', value: '' }),
           
            
            new ManyToOneField({
                name: "oa_ldct",
                label: "LDCT - Tipologia",
                value: null,
                related: "oa_ldct",
                type: "manyToOne",
                voc:"close",
                column: 12,
        
                preview: (item) => {
                  return `${item?.ldct}`;
                },
                fields: oa_ldct.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { ldct: { _contains: text } };
                },
              }),
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:true},
            {key:'oa_ldcn',label:'LDCN',sortable:true},
            {key:'oa_pvcp',label:'PVCP',sortable:true},
            {key:'oa_pvcf',label:'PVCF',sortable:true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}