import dtm from './cronologia/dtm'
import adt from './cronologia/adt'
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
    collection: 'cronologia',
    fields() {
        return [
            
           new FormField({ name: 'dtzg', label: 'DTZG - Secolo', type: 'text', value: '' }),
          // waiting for select box dtzs
           new FormField({ name: 'dtsi', label: 'DTSI', type: 'number', value: '' }),
           new SelectField({
            name: "dtsv",
            label: "DTSV - Validità",
            type: "select",
            value: "",
            options: [
              { value: "", label: " " },
              { value: "ante", label: "ante" },
              { value: "post", label: "post" },
              { value: "ca", label: "ca" },
              { value: "(?)", label: "(?)" },


            ],
          }),
           new FormField({ name: 'dtsf', label: 'DTSF', type: 'number', value: '' }),
           new SelectField({
            name: "dtsl",
            label: "DTSL-Validità",
            type: "select",
            value: "",
            options: [
              { value: "", label: " " },
              { value: "ante", label: "ante" },
              { value: "post", label: "post" },
              { value: "ca", label: "ca" },
              { value: "(?)", label: "(?)" },


            ],
          }),
        //    CHIUSO

        // new ManyToManyField({
        //     name: "dtm",
        //     label: "DTM - Motivazione della datazione",
        //     value: [],
        //     related: "dtm",
        //     foreign_key: "dtm_id",
        //     preview: (item) => { return `${item?.id ?? '--'} - ${item?.dtm}` },

        //     fields: dtm.fields,
        //     filter: (text) => {
        //       if (text.trim() === "") return {};
        //       return { dtm: { _contains: text } };
        //     },
        //   }),
           

          new ManyToManyField({
            name: "dtm",
            label: "DTM - Motivazione della datazione",
            value: [],
    
            related: "dtm",
            foreign_key: "dtm_id",
            preview: (item) => {
              return `${item?.dtm} `;
            },
            fields: dtm.fields,
            filter: (text) => {
              if (text.trim() === "") return {};
              return { dtm: { _contains: text } };
            },
          }),

        // new ManyToManyField({
        //     name: "adt",
        //     label: 'ADT-Altre datazioni',
        //     value: [],
        //     related: "adt",
        //     foreign_key: "adt_id",
        //     preview: (item) => { return `${item?.id ?? '--'} - ${item?.adt}` },

        //     fields: adt.fields,
        //     filter: (text) => {
        //       if (text.trim() === "") return {};
        //       return { adt: { _contains: text } };
        //     },
        //   }),
           
           
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'dtzg',label:'Dtzg',sortable: true},
            {key:'dtzs',label:'Dtzs',sortable: true},
            {key:'dtsi',label:'Dtsi',sortable: true},
            {key:'dtsf',label:'Dtsf',sortable: true},
            {key:'dtsv',label:'Dtsv',sortable: true},
            {key:'dtm',label:'Dtsf',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }

}