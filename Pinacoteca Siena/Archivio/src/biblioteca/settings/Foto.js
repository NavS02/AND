// import {
//   FormField,
//   SelectField,
//   ManyToManyField,
//   RadioField,
//   ManyToOneField,
//   File,
//   Files,
//   Image,
//   ExternalLinkField,
// } from "../../models";
// import Divider from "../../models/Divider";

// // M20
// import ogtd from "./ogtd";
// import ogtt from "./ogtt";
// import dtzs from "./dtzs";
// import lrcs from "./lrcs";
// import lrcc from "./lrcc";
// import lrcr from "./lrcr";
// import immagine from "./immagine";
// import dtmf from "./dtmf";
// import mtx from "./mtx";
// import mtct from "./mtct";
// import mtcm from "./mtcm";
// import frm from "./frm";
// import acqt from "./acqt";
// import collocazione from "./collocazione";
// import restauri from "./restauri";
// import fotografo from "./fotografo";
// import cdgg from "./cdgg";
// import cmpn from "./cmpn";
// import stimaf from "./stimaf";

export default {
  collection: "Foto",
  fields() {
    return [
      new FormField({
        label: "IMMAGINE DIGITALE",
        type: "biglabel",
        value: "",
        name: "IMMAGINE DIGITALE",
      }),
      // new FormField({
      //   label: "Immagine",
      //   type: "uploadPHP",
      //   value: "",
      //   name: "Immagine",
      // }),
  
      new ManyToManyField({
        name: "immagine",
        label: "Immagine",
        value: [],
        column: 12,

        related: "immagine",
        foreign_key: "immagine_id",
        preview: (item) => {
          return ``;
        },
        fields: immagine.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { link: { _contains: text } };
        },
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "ARCHIVIO",
        type: "biglabel",
        value: "",
        name: "ARCHIVIO",
      }),
      new ManyToOneField({
        name: "collocazione",
        label: "LC - Collocazione",
        value: null,
        related: "archivi",
        type: "manyToOne",
        column: 4,
        voc: "close",

        preview: (item) => {
          return `${item?.ldcn}`;
        },
        fields: collocazione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ldcn: { _contains: text } };
        },
      }),
      new FormField({
        name: "ubfp",
        label: "UBFP – Fondo",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "ubfc",
        label: "UBFC – Collocazione specificha",
        type: "text",
        value: "",
        column: 4,
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "CODICI",
        type: "biglabel",
        value: "",
        name: "CODICI",
      }),

      new FormField({
        name: "tsk",
        label: "TSK - Tipo Scheda",
        type: "text",
        default: "F",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "lir",
        label: "LIR – Livello di Ricerca",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "nctr",
        label: "NCTR – Num regione",
        type: "text",
        column: 3,
      }),
      new FormField({
        name: "nctn",
        label: "NCTN – Num cat.",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "invn",
        label: "INVN – Nome inventario",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "invd",
        label: "INVD – Data",
        type: "text",
        value: "",
        column: 1,
      }),

      new SelectField({
        name: "ctg",
        label: "CTG - Categoria",
        type: "select",
        column: 4,
        value: "",
        options: [
          { value: "", label: " " },
          {
            value: "documentazione del patrimonio storico artistico",
            label: "Documentazione del patrimonio storico artistico",
          },
        ],
      }),
      new SelectField({
        name: "amb",
        label: "AMB – amb. MIBACT",
        type: "select",
        column: 4,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "1", label: "archeologico" },
          {
            value: "2",
            label: "architettonico e paesaggistico",
          },
          { value: "3", label: "etnoantropologico" },
          { value: "4", label: "storico artistico" },
        ],
      }),

      // new ManyToOneField({
      //   name: "foto_madre",
      //   label: "Madre:",
      //   value: null,
      //   related: "Foto",
      //   type: "manyToOne",
      //   voc:"close",
      //   invisible:"true",
      //   column: 3,

      //   preview: (item) => {
      //     return ` ${item?.invn}. ${item?.sglt}`;
      //   },
      //   fields: Foto.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { invn: { _contains: text } };
      //   },
      // }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "OGGETTO",
        type: "biglabel",
        value: "",
        name: "OGGETTO",
      }),
      new ManyToOneField({
        name: "ogtdf",
        label: "OGTD - Definizione",
        value: null,
        related: "ogtdf",
        type: "manyToOne",
        column: 4,

        preview: (item) => {
          return `${item?.ogtdf}`;
        },
        fields: ogtd.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtdf: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "ogtt",
        label: "OGTT - Tipologia",
        value: null,
        related: "ogtt_F",
        type: "manyToOne",
        column: 4,

        preview: (item) => {
          return `${item?.ogtt}`;
        },
        fields: ogtt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtt: { _contains: text } };
        },
      }),

      new FormField({
        name: "ogcs",
        label: "OGCS - Note",
        type: "textarea",
        value: "",
        column: 6,
      }),

      new FormField({
        name: "qntn",
        label: "QNTN – q.tà Esemplari",
        type: "number",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "qnti",
        label: "QNTI – q.tà Elementi",
        type: "number",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "qnts",
        label: "QNTS – Quantità  non rilevata",
        type: "toggle",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "qnte",
        label: "QNTE – Note sulla quantità",
        type: "textarea",
        value: "",
        column: 12,
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "SOGGETTO",
        type: "biglabel",
        value: "",
        name: "SOGGETTO",
      }),
      new FormField({
        name: "sgti",
        label: "SGTI – Soggetto",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "sgtd",
        label: "SGTD - Indicazioni sul soggetto",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "sglt",
        label: "SGLT – Titolo proprio",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "sgll",
        label: "SGLL – Titolo parallelo",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "sgla",
        label: "SGLA – Titolo attribuito",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "sgls",
        label: "SGLS –Specifiche titolo",
        type: "text",
        value: "",
        column: 4,
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "CRONOLOGIA",
        type: "biglabel",
        value: "",
        name: "CRONOLOGIA",
      }),
      new SelectField({
        name: "dtzg",
        label: "DTZG - periodo",
        type: "select",
        column: 3,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "XIX", label: "XIX" },
          { value: "XIX-XX", label: "XIX-XX" },
          { value: "XX", label: "XX" },
          { value: "XX-XXI", label: "XX-XXI" },
          { value: "XXI", label: "XXI" },
        ],
      }),
      new ManyToOneField({
        name: "dtzs",
        label: "DTZS – Specifiche data",
        value: null,
        related: "dtzs_f",
        type: "manyToOne",
        voc: "close",
        column: 3,

        preview: (item) => {
          return `${item?.dtzs}`;
        },
        fields: dtzs.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzs: { _contains: text } };
        },
      }),
      new FormField({
        name: "dtsi",
        label: "DTSI – DA",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "dtsf",
        label: "DTSF - A",
        type: "text",
        value: "",
        column: 3,
      }),
      new ManyToOneField({
        name: "dtmf",
        label: "DTM – Motivazione Data",
        value: null,
        related: "dtmf",
        type: "manyToOne",
        column: 3,

        preview: (item) => {
          return `${item?.dtmf}`;
        },
        fields: dtmf.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtmf: { _contains: text } };
        },
      }),
 
      new FormField({
        name: "dtt",
        label: "DTT – Note Data",
        type: "text",
        value: "",
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI CULTURALI",
        type: "biglabel",
        value: "",
        name: "DATI CULTURALI",
      }),
      new ManyToManyField({
        name: "fotografo",
        label: "Fotografo",
        value: [],
        column: 4,

        related: "fotografo",
        foreign_key: "fotografo_id",
        preview: (item) => {
          return `${item?.autn}`;
        },
        fields: fotografo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autn: { _contains: text } };
        },
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "OCCASIONE DELLA RIPRESA",
        type: "biglabel",
        value: "",
        name: "OCCASIONE DELLA RIPRESA",
      }),
      new ManyToOneField({
        name: "lrcs",
        label: "LRCS – Stato",
        value: null,
        related: "lrcs_f",
        type: "manyToOne",
        column: 4,

        preview: (item) => {
          return `${item?.lrcs}`;
        },
        fields: lrcs.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { lrcs: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "lrcr",
        label: "LRCR - Regione",
        value: null,
        related: "lrcr_f",
        type: "manyToOne",
        column: 4,

        preview: (item) => {
          return `${item?.lrcr}`;
        },
        fields: lrcr.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { lrcr: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "lrcc",
        label: "LRCC - Comune",
        value: null,
        related: "lrcc_f",
        type: "manyToOne",
        column: 4,

        preview: (item) => {
          return `${item?.lrcc}`;
        },
        fields: lrcc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { lrcc: { _contains: text } };
        },
      }),

      new FormField({
        name: "lro",
        label: "LRO – Occasione ripresa",
        type: "text",
        column: 4,

        value: "",
      }),
      new FormField({
        name: "lrd",
        label: "LRD – Data Ripresa",
        type: "text",
        column: 4,

        value: "",
      }),
      new FormField({
        name: "edit",
        label: "EDIT – Edizione",
        type: "text",
        column: 4,

        value: "",
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI FISICI",
        type: "biglabel",
        value: "",
        name: "DATI FISICI",
      }),
      new ManyToOneField({
        name: "mtx",
        label: "MTX – Indicazione colore",
        value: null,
        related: "mtx",
        type: "manyToOne",
        column: 3,
        voc: "close",

        preview: (item) => {
          return `${item?.mtx}`;
        },
        fields: mtx.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtx: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "mtct",
        label: "MTCT – Tecnica",
        value: null,
        related: "mtct_F",
        type: "manyToOne",
        column: 3,

        preview: (item) => {
          return `${item?.mtct_F}`;
        },
        fields: mtct.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtct_F: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "mtcm",
        label: "MTCM – Materia",
        value: null,
        related: "mtcm_F",
        type: "manyToOne",
        column: 3,

        preview: (item) => {
          return `${item?.mtcm_F}`;
        },
        fields: mtcm.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtcm_F: { _contains: text } };
        },
      }),
      new FormField({
        name: "misp",
        label: "MISP – Riferimento",
        type: "text",
        value: "",
        column: 3,
      }),
      new RadioField({
        name: "misu",
        label: "MISU - Unità di misura",

        column: 3,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "cm", label: "cm" },
          { value: "m", label: "m" },
          { value: "mm", label: "mm" },
        ],
      }),
      new SelectField({
        name: "misz",
        label: "MISZ - Tipo",
        type: "select",
        column: 3,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "altezzaxlunghezza", label: "altezza x lunghezza" },
          {
            value: "altezzaxlunghezzaxspessore",
            label: "altezza x lunghezza x spessore",
          },
          { value: "circonferenza", label: "circonferenza" },
          { value: "diametro", label: "diametro" },
          { value: "spessore", label: "spessore" },
        ],
      }),
      new FormField({
        name: "mism",
        label: "MISM - Valore",
        type: "text",
        value: "",
        column: 3,
      }),
      new SelectField({
        name: "mnr",
        label: "MNR - Misure non rilevate/misure varie",
        type: "select",
        column: 3,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "MNR", label: "MNR" },
          { value: "MV", label: "MV" },
        ],
      }),

      new ManyToOneField({
        name: "frm",
        label: "FRM - Formato",
        value: null,
        related: "frm",
        type: "manyToOne",
        column: 3,

        preview: (item) => {
          return `${item?.frm}`;
        },
        fields: frm.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { frm: { _contains: text } };
        },
      }),
      new FormField({
        name: "misv",
        label: "MISV - Varie",
        type: "text",
        value: "",
        column: 3,
      }),
      // new FormField({
      //   name: "mts",
      //   label: "mts",
      //   type: "textarea",
      //   value: "",
      //   column: "12",
      // }),
      // new FormField({
      //   name: "fil",
      //   label: "fil",
      //   type: "text",
      //   value: "",
      // }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "STATO DI CONSERVAZIONE",
        type: "biglabel",
        value: "",
        name: "STATO DI CONSERVAZIONE",
      }),
      new SelectField({
        name: "stcc",
        label: "STCC – Generale",
        type: "select",
        column: "12",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "buono", label: "buono" },
          { value: "discreto", label: "discreto" },
          { value: "mediocre", label: "mediocre" },
          { value: "cattivo", label: "cattivo" },
          { value: "NR", label: "NR" },
        ],
      }),
      new FormField({
        name: "stcs",
        label: "STCS - Specifiche",
        type: "textarea",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "stcn",
        label: "STCN - Note",
        type: "textarea",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "std",
        label: "STD - Modalita di conservazione",
        type: "textarea",
        value: "",
        column: 4,
      }),

      new ManyToManyField({
        name: "restauri",
        label: "RST - Restauri",
        value: [],
        column: "12",

        related: "restauri",
        foreign_key: "restauri_id",
        preview: (item) => {
          return `${item?.rsti}`;
        },
        fields: restauri.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rsti: { _contains: text } };
        },
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI AMMINISTRATIVI",
        type: "biglabel",
        value: "",
        name: "DATI AMMINISTRATIVI",
      }),
      new ManyToOneField({
        name: "cdgg",
        label: "CDGG – Cond. Giuridica",
        value: null,
        related: "cdggf",
        type: "manyToOne",
        column: 4,
        voc: "close",

        preview: (item) => {
          return `${item?.cdgg}`;
        },
        fields: cdgg.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { cdgg: { _contains: text } };
        },
      }),
      new FormField({
        name: "cdgs",
        label: "CDGS – Specifica",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "bpt",
        label: "BPT – Provv. Tutela",
        type: "toggle",
        value: "",
        column: 4,
      }),

      new ManyToOneField({
        name: "acqt",
        label: "ACQT – Tipo Acquisizione",
        value: null,
        related: "acqtf",
        type: "manyToOne",
        column: 3,

        preview: (item) => {
          return `${item?.acqtf}`;
        },
        fields: acqt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acqtf: { _contains: text } };
        },
      }),
      new FormField({
        name: "acqn",
        label: "ACQN – Nome",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "acqd",
        label: "ACQD –Data",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "inpr",
        label: "INPR - Data dell'immisione nel patrimonio",
        type: "date",
        value: "",
        column: 4,
      }),

      new RadioField({
        name: "adsp",
        label: "ADSP – Profilo Accesso",

        column: 4,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
        ],
      }),
      new SelectField({
        name: "adsm",
        label: "ADSM - Motivazione",
        type: "select",
        column: 4,
        value: "",

        options: [
          { value: "", label: " " },
          {
            value: "1",
            label: "scheda contenente dati liberamente accessibili",
          },
          { value: "2", label: "scheda contenente dati personali" },
          { value: "3", label: "scheda di bene di proprietà privata" },
          { value: "4", label: "scheda di bene a rischio" },
          {
            value: "5",
            label: "scheda di bene non adeguatamente sorvegliabile",
          },
        ],
      }),

      new FormField({
        name: "cprn",
        label: "CPRN – Nome dir. autore",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "cpri",
        label: "CPRI – Indirizzo",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "cprd",
        label: "CPRD – Data scadenza",
        type: "text",
        value: "",
        column: 4,
      }),
      // new Divider({ type: "divider" }),

      // new FormField({
      //   label: "DOCUMENTAZIONE",
      //   type: "biglabel",
      //   value: "",
      //   name: "DOCUMENTAZIONE",
      // }),
      new FormField({
        name: "ftan",
        label: "FTAN – Codice",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "ftat",
        label: "FTAT – Tipo",
        type: "text",
        value: "",
        column: 4,
      }),
      new ManyToManyField({
        name: "stima",
        label: "Stima",
        value: [],
        column: "4",

        related: "stimaf",
        foreign_key: "stimaf_id",
        preview: (item) => {
          return `${item?.stid}`;
        },
        fields: stimaf.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stimaf: { _contains: text } };
        },
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "COMPILAZIONE",
        type: "biglabel",
        value: "",
        name: "COMPILAZIONE",
      }),
      new ManyToOneField({
        name: "cmpn",
        label: "CMPN - Compilatore",
        value: null,
        related: "cmpn",
        type: "manyToOne",
        column: 3,
        voc: "open",

        preview: (item) => {
          return `${item?.nome}`;
        },
        fields: cmpn.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { nome: { _contains: text } };
        },
      }),

      new FormField({
        name: "cmpd",
        label: "CMPD - Data",
        type: "number",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "fur",
        label: "FUR - Funzionario",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "rsr",
        label: "RSR - Referente verifica scientifica",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "aggd",
        label: "AGGD - Anno di aggiornamento",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "agge",
        label: "AGGE – Ente",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "aggn",
        label: "AGGN - Responsabile ricerca e redazione",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "aggr",
        label: "AGGR - Referente verifica scientifica",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "aggf",
        label: "AGGF - Funzionario responsabile",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "aggs",
        label: "AGGS - Note",
        type: "textarea",
        value: "",
        column: 12,
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "invn", label: "NUM.INVENTARIO (INVN)", sortable: false },
      { key: "sgti", label: "SOGGETTO (SGTI)", sortable: false },
      { key: "dtsf", label: "DA (DTSF)", sortable: false },
      { key: "dtsi", label: "A (DTSI)", sortable: false },
      { key: "edit", label: "EDITORE (EDIT)", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
