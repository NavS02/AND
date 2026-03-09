import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
  ExternalLinkField,
} from "../../models";
import Divider from "../../models/Divider";

// M20
import ogtd from "./ogtd";
import ogtt from "./ogtt";
import dtzs from "./dtzs";
import lrcs from "./lrcs";
import lrcc from "./lrcc";
import lrcr from "./lrcr";
import immagine from "./immagine";
import dtmf from "./dtmf";
import mtx from "./mtx";
import mtct from "./mtct";
import mtcm from "./mtcm";
import frm from "./frm";
import acqt from "./acqt";
import collocazione from "./collocazione";
import fotografo from "./fotografo";
import cdgg from "./cdgg";
import oa_ogtd from "./oa_ogtd_f";
import oa_dtzg from "./oa_dtzg_f";
import oa_dtsv from "./oa_dtsv_f";
import oa_dtzs from "./oa_dtzs_f";
import oa_MTC from "./oa_MTC";
import oa_sclo from "./oa_sclo";
import oa_collocazione from "./oa_collocazione";
import oa_autore from "./oa_autore";
import foto_di_restauro from "./foto_di_restauro";
import rifst from "./rifst";
import ACQ_tipo from "./ACQ_tipo";
import stima_f from "./stima_f";

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
        column: 8,

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
      new FormField({
        name: "icona",
        label: "Icona (Dato da verificare)",
        type: "text",
        value: "",
        edit: "false",

        column: 4,
        color: "#c99e1a",
        bold: true,
      }),
      new Divider({ type: "divider", special: true }),

      new FormField({
        label: "OPERA D'ARTE",
        type: "biglabel",
        value: "",
        name: "OPERA",
        color: "#c99e1a",
      }),
      new FormField({
        name: "opera_MNS",
        label: "Opera in Museo Nazionale di Siena",
        type: "toggle",
        value: "",
        column: 12,
      }),
      new FormField({
        name: "oa_sgti",
        label: "SGTI – Soggetto",
        type: "text",
        value: "",

        column: 6,
        color: "#c99e1a",
        bold: true,
      }),
      new FormField({
        name: "oa_sgtt",
        label: "SGTT - Titolo",
        type: "text",
        value: "",

        column: 6,
        color: "#c99e1a",
        bold: true,
      }),
      new ManyToOneField({
        name: "oa_ogtd",
        label: "OGTD - Definizione",
        value: null,
        related: "oa_ogtd_f",
        type: "manyToOne",
        column: 6,
        color: "#c99e1a",
        bold: true,
        voc: "close",

        preview: (item) => {
          return `${item?.ogtd}`;
        },
        fields: oa_ogtd.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtd: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "oa_mtc",
        label: "MTC – Tecnica",
        value: null,
        related: "oa_MTC",
        type: "manyToOne",
        column: 6,
        color: "#c99e1a",
        bold: true,
        voc: "close",

        preview: (item) => {
          return `${item?.mtc}`;
        },
        fields: oa_MTC.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtc: { _contains: text } };
        },
      }),
      new ManyToManyField({
        name: "oa_autore",
        label: "AUTN - Autore",
        value: [],
        column: 6,
        color: "#c99e1a",
        bold: true,

        related: "oa_autore",
        foreign_key: "oa_autore_id",
        preview: (item) => {
          return `${item?.autn}`;
        },
        fields: oa_autore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autn: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "oa_sclo",
        label: "SCLO - Scuola",
        value: null,
        related: "oa_sclo",
        type: "manyToOne",
        column: 6,
        color: "#c99e1a",
        bold: true,
        voc: "open",

        preview: (item) => {
          return `${item?.sclo}`;
        },
        fields: oa_sclo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { sclo: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "oa_collocazione",
        label: "LDC - Collocazione",
        value: null,
        color: "#c99e1a",
        bold: true,
        related: "oa_collocazione_f",
        type: "manyToOne",
        column: 6,
        voc: "open",

        preview: (item) => {
          return `${item?.oa_ldcn} (${item?.oa_pvcp})`;
        },
        fields: oa_collocazione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ldcn: { _contains: text } };
        },
      }),

      new FormField({
        name: "oa_pvc",
        label: "PVC - Proveninenza",
        type: "text",
        value: "",

        column: 6,
        color: "#c99e1a",
        bold: true,
      }),

      new ManyToOneField({
        name: "oa_dtzg",
        label: "DTZG - Secolo",
        value: null,
        related: "oa_dtzg_f",
        type: "manyToOne",
        column: 2,
        color: "#c99e1a",
        bold: true,
        voc: "close",

        preview: (item) => {
          return `${item?.dtzg}`;
        },
        fields: oa_dtzg.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzg: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "oa_dtzs",
        label: "DTZS – Specifiche data",
        value: null,
        related: "oa_dtzs_f",
        type: "manyToOne",
        column: 3,
        color: "#c99e1a",
        bold: true,
        voc: "close",

        preview: (item) => {
          return `${item?.dtzs}`;
        },
        fields: oa_dtzs.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzs: { _contains: text } };
        },
      }),
      new FormField({
        name: "oa_dtsi",
        label: "DTSI – da",
        type: "text",
        value: "",
        color: "#c99e1a",
        bold: true,

        column: 2,
      }),
      new FormField({
        name: "oa_dtsf",
        label: "DTSF – a",
        type: "text",
        value: "",

        column: 2,
        color: "#c99e1a",
        bold: true,
      }),

      new ManyToOneField({
        name: "oa_dtsv",
        label: "DTSV - Validazione",
        value: null,
        related: "oa_dtsv_f",
        type: "manyToOne",
        column: 3,
        color: "#c99e1a",
        bold: true,
        voc: "close",

        preview: (item) => {
          return `${item?.dtsv}`;
        },
        fields: oa_dtsv.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtsv: { _contains: text } };
        },
      }),

      new Divider({ type: "divider", special: true }),

      new FormField({
        label: "FOTOGRAFIA",
        type: "biglabel",
        value: "",
        name: "FOTOGRAFIA",
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
        column: 3,
      }),
      new FormField({
        name: "ubfc",
        label: "UBFC – Collocazione specificha",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "armadio",
        label: "Armadio",
        type: "text",
        value: "",
        column: 2,
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
        name: "inventario",
        label: "INVN – Numero inventario",
        type: "text",
        value: "",
        column: 3,
      }),
      // new FormField({
      //   name: "invd",
      //   label: "INVD – Data",
      //   type: "text",
      //   value: "",
      //   column: 1,
      // }),

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
      new FormField({
        name: "rne",
        label: "RNE – Rif. Negativo",
        type: "text",
        value: "",
        column: 4,
      }),
      new ManyToManyField({
        name: "rifst",
        label: "RIFST - Rif. Stampa",
        value: [],
        column: 4,

        related: "rifst",
        foreign_key: "rifst_id",
        preview: (item) => {
          return `${item?.rifst}`;
        },
        fields: rifst.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rifst: { _contains: text } };
        },
      }),

      new FormField({
        name: "invn_oa",
        label: "Rif. schede OA",
        type: "text",
        value: "",
        column: 4,
      }),



      new ManyToManyField({
        name: "stima",
        label: "Stima",
        value: [],
        column: 12,

        related: "stima_f",
        foreign_key: "stima_f_id",
        preview: (item) => {
          return `${item?.stis} (${item?.stid})`;
        },
        fields: stima_f.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stis: { _contains: text } };
        },
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
        name: "ogtd_foto",
        label: "OGTD - Definizione",
        value: null,
        related: "ogtd_foto",
        type: "manyToOne",
        column: 6,

        preview: (item) => {
          return `${item?.ogtd}`;
        },
        fields: ogtd.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtd: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "ogtt",
        label: "OGTT - Tipologia",
        value: null,
        related: "ogtt_F",
        type: "manyToOne",
        column: 6,

        preview: (item) => {
          return `${item?.ogtt}`;
        },
        fields: ogtt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtt: { _contains: text } };
        },
      }),

      // new FormField({
      //   name: "ogcs",
      //   label: "OGCS - Note",
      //   type: "textarea",
      //   value: "",
      //   column: 6,
      // }),

      new FormField({
        name: "qntn",
        label: "QNTN – q.tà Esemplari",
        type: "number",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "qnti",
        label: "QNTI – q.tà Elementi",
        type: "number",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "qnts",
        label: "QNTS – Quantità  non rilevata",
        type: "toggle",
        value: "",
        column: 4,
      }),
      // new FormField({
      //   name: "qnte",
      //   label: "QNTE – Note sulla quantità",
      //   type: "textarea",
      //   value: "",
      //   column: 12,
      // }),

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
      // new FormField({
      //   name: "sgtd",
      //   label: "SGTD - Indicazioni sul soggetto",
      //   type: "text",
      //   value: "",
      //   column: 4,
      // }),
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
      // new FormField({
      //   name: "sgls",
      //   label: "SGLS –Specifiche titolo",
      //   type: "text",
      //   value: "",
      //   column: 4,
      // }),
      new ManyToOneField({
        name: "foto_di_restauro",
        label: "Foto di restauro",
        value: null,
        related: "foto_di_restauro",
        type: "manyToOne",
        voc: "close",
        column: 8,

        preview: (item) => {
          return `${item?.foto_di_restauro}`;
        },
        fields: foto_di_restauro.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { foto_di_restauro: { _contains: text } };
        },
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
        label: "DTZG - Secolo",
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
      // new ManyToOneField({
      //   name: "dtmf",
      //   label: "DTM – Motivazione Data",
      //   value: null,
      //   related: "dtmf",
      //   type: "manyToOne",
      //   column: 3,

      //   preview: (item) => {
      //     return `${item?.dtmf}`;
      //   },
      //   fields: dtmf.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { dtmf: { _contains: text } };
      //   },
      // }),

      // new FormField({
      //   name: "dtt",
      //   label: "DTT – Note Data",
      //   type: "text",
      //   value: "",
      // }),

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
        column: 6,

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

      // new Divider({ type: "divider" }),

      // new FormField({
      //   label: "OCCASIONE DELLA RIPRESA",
      //   type: "biglabel",
      //   value: "",
      //   name: "OCCASIONE DELLA RIPRESA",
      // }),
      // new ManyToOneField({
      //   name: "lrcs",
      //   label: "LRCS – Stato",
      //   value: null,
      //   related: "lrcs_f",
      //   type: "manyToOne",
      //   column: 4,

      //   preview: (item) => {
      //     return `${item?.lrcs}`;
      //   },
      //   fields: lrcs.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { lrcs: { _contains: text } };
      //   },
      // }),
      // new ManyToOneField({
      //   name: "lrcr",
      //   label: "LRCR - Regione",
      //   value: null,
      //   related: "lrcr_f",
      //   type: "manyToOne",
      //   column: 4,

      //   preview: (item) => {
      //     return `${item?.lrcr}`;
      //   },
      //   fields: lrcr.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { lrcr: { _contains: text } };
      //   },
      // }),
      // new ManyToOneField({
      //   name: "lrcc",
      //   label: "LRCC - Comune",
      //   value: null,
      //   related: "lrcc_f",
      //   type: "manyToOne",
      //   column: 4,

      //   preview: (item) => {
      //     return `${item?.lrcc}`;
      //   },
      //   fields: lrcc.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { lrcc: { _contains: text } };
      //   },
      // }),

      // new FormField({
      //   name: "lro",
      //   label: "LRO – Occasione ripresa",
      //   type: "text",
      //   column: 4,

      //   value: "",
      // }),
      // new FormField({
      //   name: "lrd",
      //   label: "LRD – Data Ripresa",
      //   type: "text",
      //   column: 4,

      //   value: "",
      // }),
      // new FormField({
      //   name: "edit",
      //   label: "EDIT – Edizione",
      //   type: "text",
      //   column: 4,

      //   value: "",
      // }),

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
      // new FormField({
      //   name: "misp",
      //   label: "MISP – Riferimento",
      //   type: "text",
      //   value: "",
      //   column: 3,
      // }),
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

      // new ManyToOneField({
      //   name: "frm",
      //   label: "FRM - Formato",
      //   value: null,
      //   related: "frm",
      //   type: "manyToOne",
      //   column: 3,

      //   preview: (item) => {
      //     return `${item?.frm}`;
      //   },
      //   fields: frm.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { frm: { _contains: text } };
      //   },
      // }),
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
        column: 12,
      }),
      // new FormField({
      //   name: "stcn",
      //   label: "STCN - Note",
      //   type: "textarea",
      //   value: "",
      //   column: 4,
      // }),

      // new FormField({
      //   name: "std",
      //   label: "STD - Modalita di conservazione",
      //   type: "textarea",
      //   value: "",
      //   column: 4,
      // }),

      // new ManyToManyField({
      //   name: "restauri",
      //   label: "RST - Restauri",
      //   value: [],
      //   column: "12",

      //   related: "restauri",
      //   foreign_key: "restauri_id",
      //   preview: (item) => {
      //     return `${item?.rsti}`;
      //   },
      //   fields: restauri.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { rsti: { _contains: text } };
      //   },
      // }),

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
        related: "cdgg_f",
        type: "manyToOne",
        column: 6,
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
        column: 6,
      }),
      new FormField({
        name: "bpt",
        label: "BPT – Provv. Tutela",
        type: "toggle",
        value: "",
        column: 5,
      }),

      new FormField({
        name: "notifica",
        label: "Notifica",
        type: "text",
        value: "",
        column: 5,
      }),
      new ManyToOneField({
        name: "ACQ_tipo",
        label: "ACQ – Tipo ",
        value: null,
        related: "ACQ_tipo",
        type: "manyToOne",
        voc: "open",
        column: 3,

        preview: (item) => {
          return `${item?.ACQ_tipo}`;
        },
        fields: ACQ_tipo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ACQ_tipo: { _contains: text } };
        },
      }),
      new FormField({
        name: "ACQ_capitolo",
        label: "Capitolo di spesa",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "ACQ_foglioinv",
        label: "Foglio Inventario",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "ACQ_prezzo_lire",
        label: "Prezzo in lire",
        type: "text",
        value: "",
        column: 3,
      }),

      new ManyToOneField({
        name: "acqt_f",
        label: "ACQT – Tipo Acquisizione",
        value: null,
        related: "acqt_f",
        type: "manyToOne",
        voc: "close",
        column: 3,

        preview: (item) => {
          return `${item?.acqt_f}`;
        },
        fields: acqt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acqt_f: { _contains: text } };
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
        type: "text",
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

      new Divider({ type: "divider" }),

      new FormField({
        label: "COMPILAZIONE",
        type: "biglabel",
        value: "",
        name: "COMPILAZIONE",
      }),

      new FormField({
        name: "cmpn",
        label: "CMPN - Compilatore",
        type: "text",
        value: "",
        column: 3,
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
        name: "oss",
        label: "OSS - Osservazioni",
        type: "textarea",
        value: "",
        column: 12,
      }),
    ];
  },
  
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "inventario", label: "INVENTARIO", sortable: true },
      { key: "oa_autore", label: "AUTORE", sortable: true },
      { key: "oa_sgti", label: "SOGGETTO (SGTI)", sortable: true },
      { key: "oa_dtsi", label: "DA (DTSI)", sortable: true },
      { key: "oa_dtsf", label: "A (DTSF)", sortable: true },
      { key: "ubfp", label: "Fondo (UBFP)", sortable: true },
      { key: "actions", label: "Azione", sortable: true },
    ];
  },
};
