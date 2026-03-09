import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../models";
  import prvl from './localizzazione/prvl'
  import tcl from './localizzazione/tcl'
  import prvr from './localizzazione/prvr'
  import prvp from './localizzazione/prvp'
  import prvc from './localizzazione/prvc'
  import prct from './localizzazione/prct'
  import prcq from './localizzazione/prcq'


  
export default {
    collection: 'localizzazione',
    fields() {
        return [

            new ManyToOneField({
                name: "tcl",
                label: "TCL-Tipo di Localizzazione",
                value: null,
                related: "tcl",
                type: "manyToOne",
                voc: "close",
                preview: (item) => {
                  return `${item?.tcl}`;
                },
                fields: tcl.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { tcl: { _contains: text } };
                },
              }),

            new FormField({ name: 'prvs', label: 'PRVS-Stato', type: 'text', value: '' }),
            new ManyToOneField({
                name: "prvr",
                label: "PRVR-Regione",
                value: null,
                related: "prvr",
                type: "manyToOne",
                voc: "close",
                preview: (item) => {
                  return `${item?.prvr}`;
                },
                fields: prvr.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prvr: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "prvp",
                label: "PRVP-Provincia",
                value: null,
                related: "prvp",
                type: "manyToOne",
                voc: "close",
                preview: (item) => {
                  return `${item?.prvp}`;
                },
                fields: prvp.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prvp: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "prvc",
                label: "PRVC-Comune",
                value: null,
                related: "prvc",
                type: "manyToOne",
                voc: "close",
                preview: (item) => {
                  return `${item?.prvc}`;
                },
                fields: prvc.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prvc: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "prvl",
                label: "PRVL-Località",
                value: null,
                related: "prvl",
                type: "manyToOne",
                voc: "open",
                preview: (item) => {
                  return `${item?.prvl}`;
                },
                fields: prvl.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prvl: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "prct",
                label: "PRCT-Tipologia",
                value: null,
                related: "prct",
                type: "manyToOne",
                voc: "open",
                preview: (item) => {
                  return `${item?.prct}`;
                },
                fields: prct.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prct: { _contains: text } };
                },
              }),
              new ManyToOneField({
                name: "prcq",
                label: "PRCQ-Qualificazione",
                value: null,
                related: "prcq",
                type: "manyToOne",
                voc: "open",
                preview: (item) => {
                  return `${item?.prcq}`;
                },
                fields: prcq.fields,
                filter: (text) => {
                  if (text.trim() === "") return {};
                  return { prcq: { _contains: text } };
                },
              }),


            new FormField({ name: 'prcd', label: 'PRCD-Denominazione', type: 'text', value: '' }),
            new FormField({ name: 'prcc', label: 'PRCC-Complesso monumentale di appartenenza', type: 'text', value: '' }),
            new FormField({ name: 'prcu', label: 'PRCU-Via', type: 'text', value: '' }),
            new FormField({ name: 'prcm', label: 'PRCM-Denominazione raccolta', type: 'text', value: '' }),
            new FormField({ name: 'prcs', label: 'PRCS-Specifiche', type: 'text', value: '' }),
            new FormField({ name: 'prdi', label: 'PRDI-Data ingresso', type: 'text', value: '' }),
            new FormField({ name: 'prdu', label: 'PRDU-Data uscita', type: 'text', value: '' }),
        ]
    },
    tableFields() {
        return [
            {key:'id',label:'ID',sortable:false},
            {key:'prcd',label:'prcd',sortable: true},
            {key:'actions',label:'Actions',sortable: false},
            
        ]
    }
}