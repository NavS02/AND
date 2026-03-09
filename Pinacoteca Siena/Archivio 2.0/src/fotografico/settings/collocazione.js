import {
    FormField,
    ManyToOneField,
  } from "../../models";
  import pvcs from './pvcs'
  import pvcr from './pvcr'
  import pvcp from './pvcp'
  import pvcc from './pvcc'
  import ldct from './ldct'

export default {
    collection: 'archivi',
    fields() {
        return [
           
            new ManyToOneField({
                name: "pvcs",
                label: "PVCS - Stato",
                value: null,
                related: "pvcs",
                type: "manyToOne",
                column: 12,
                voc:'open',
        
                preview: (item) => {
                  return `${item?.pvcs}`;
                },
                fields: pvcs.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { pvcs: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "pvcr",
                label: "PVCR - Regione",
                value: null,
                related: "pvcr",
                type: "manyToOne",
                voc:'open',
        
                preview: (item) => {
                  return `${item?.pvcr}`;
                },
                fields: pvcr.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { pvcr: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "pvcp",
                label: "PVCP - Provincia",
                value: null,
                related: "pvcp",
                type: "manyToOne",
                voc:'open',
        
                preview: (item) => {
                  return `${item?.pvcp}`;
                },
                fields: pvcp.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { pvcp: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "pvcc",
                label: "PVCC - Comune",
                value: null,
                related: "pvcc",
                type: "manyToOne",
                voc:'open',
        
                preview: (item) => {
                  return `${item?.pvcc}`;
                },
                fields: pvcc.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { pvcc: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "ldct",
                label: "LDCT - Tipologia",
                value: null,
                related: "ldct",
                type: "manyToOne",
                voc:'open',
        
                preview: (item) => {
                  return `${item?.ldct}`;
                },
                fields: ldct.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { ldct: { _contains: text } };
                },
              }),

              new FormField({ name: 'ldcn', label: 'LDCN –Denominazione', type: 'text', value: '' }),
              new FormField({ name: 'ldcu', label: 'LDCU – Indirizzo', type: 'text', value: '' }),
              new FormField({ name: 'ldcm', label: 'LDCM - Museo', type: 'text', value: '' }),
              
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'ldcn',label:'LDCN –Denominazione',sortable: true},
            {key:'ldcm',label:'LDCM - Museo',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
        ]
    }
}