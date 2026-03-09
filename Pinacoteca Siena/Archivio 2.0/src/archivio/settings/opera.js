import autore from "./autore";
import ogtd from "./ogtd";
import ogtt from "./ogtt";
import ogtv from "./ogtv";
import frm from "./frm";
import roff from "./roff";
import cdgg from "./cdgg";
import acqt from "./acqt";
import lc from "./collocazione";
import acc from "./opere/acc";
import alnt from "./alnt";
import stima from "./opere/stima";
import mtc from "./opere/mtc";
import restauro from "./restauro";
import iscrizione from "./iscrizione";
import stemmi from "./stemmi";
import localizzazione from "./localizzazione";
import Divider from "../models/Divider";
import cronologia from "./cronologia";
import ambito from "./ambito";
import committenza from "./committenza";
import inventario from "./inventario";
import fta from "./fta";
import fonte from "./fonte";
import mostra from "./mostra";
import bib from "./bib";
import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
} from "../../models";

export default {
  collection: "opera",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 4,
      }),
      new Files({
        name: "images",
        label: "Multiple Images",
        foreign_key: "directus_files_id",
        value: [],
        fit: "contain",
        width: 100,
        height: 100,
        quality: 80,
        column: 4,
      }),
      new Files({
        name: "files",
        label: "Multiple Files",
        foreign_key: "directus_files_id",
        value: [],
        fit: "contain",
        width: 100,
        height: 100,
        quality: 80,
        column: 4,
      }),

      new Divider({ type: "divider" }),

      new FormField({
        name: "codici",
        label: "Codici",
        type: "biglabel",
        value: "",
      }),
      new FormField({
        name: "invn",
        label: "INVN - Inventario",
        type: "text",
        value: "",
        column: "3",
        edit: "false",
      }),
      new FormField({
        name: "ibs",
        label: "IBS",
        type: "text",
        value: "",
        column: "3",
        edit: "false",
      }),
      new FormField({
        name: "inventario_1930",
        label: "Inventario 1930",
        type: "text",
        value: "",
        column: "3",
        edit: "false",
      }),
      new FormField({
        name: "inventario_1973",
        label: "Inventario 1973",
        type: "text",
        value: "",
        column: "3",
        edit: "false",
      }),

      // new RadioField({
      //   name: "lir",
      //   column: "4",
      //   label: "LIR-Livello di ricerca",
      //   type: "radio",
      //   value: "I",
      //   inline: true,
      //   choices: [
      //     { value: "C", label: "Catalogo" },
      //     { value: "P", label: "Precatalogo" },
      //     { value: "I", label: "Inventario" },
      //   ],
      // }),
      new FormField({
        name: "tsk",
        label: "TSK-Tipo Scheda",
        type: "text",
        value: "OA",
        column: "3",
      }),

      new FormField({
        name: "nctr",
        label: "NCTR-Num. Regione",
        type: "text",
        value: "09",
        column: "3",
      }),
      new FormField({
        name: "nctn",
        label: "NCTN-Num. Catalogo",
        type: "text",
        value: "",
        column: "3",
        edit: "false",
      }),

      new FormField({
        name: "resti",
        label: "RESTI-Restituite",
        type: "toggle",
        value: "",
        column: "3",
      }),

      /* inventario */

      // new ManyToManyField({
      //   name: "inv",
      //   label: "INV-Numero Inventario",
      //   value: [],
      //   column: "3",
      //   related: "inv",
      //   collection: "inventario",
      //   foreign_key: "inv_id",
      //   preview: (item) => {
      //     return `${item?.invn}`;
      //   },
      //   fields: inventario.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { invn: { _contains: text } };
      //   },
      // }),
      new ManyToManyField({
        name: "stima_opera",
        label: "Stima",
        value: [],
        column: "6",

        related: "stima_opera",
        foreign_key: "stima_opera_id",
        preview: (item) => {
          return `${item?.stis}`;
        },
        fields: stima.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stis: { _contains: text } };
        },
      }),
      new FormField({
        name: "stima_inv",
        label: "Stima (INV)",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new ManyToManyField({
        name: "acc",
        label: "ACC-Altri codici",
        value: [],
        related: "acc",
        foreign_key: "acc_id",
        collection: "Altri codici",
        column: "4",
        preview: (item) => {
          return `${item?.acc}`;
        },
        fields: acc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acc: { _contains: text } };
        },
      }),

      new SelectField({
        name: "ubo",
        label: "UBO-Ubicazione originaria",
        type: "select",
        value: "",
        column: "4",
        options: [
          { value: "", label: "" },
          { value: "OR", label: "Originaria" },
          { value: "SC", label: "Sconosciuta" },
        ],
      }),
      new FormField({
        name: "dismesso",
        label: "Dismesso",
        type: "toggle",
        value: "",
        column: "4",
        edit: "false",
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Oggetto",
        type: "biglabel",
        value: "",
        name: "oggetto",
      }),

      // OGTD
      new FormField({
        name: "ogtd_oa",
        label: "Oggetto",
        type: "text",
        value: "",
        column: "2",
        edit: "false",
      }),

      new ManyToOneField({
        name: "ogtt",
        label: "OGTT-Tipologia",
        value: null,
        related: "ogtt",
        type: "manyToOne",
        column: "3",
        preview: (item) => {
          return `${item?.ogtt}`;
        },
        fields: ogtt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtt: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "ogtv",
        label: "OGTV-Identificazione",
        value: null,
        related: "ogtv",
        type: "manyToOne",
        column: "3",
        voc: "close",
        preview: (item) => {
          return `${item?.ogtv}`;
        },
        fields: ogtv.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ogtv: { _contains: text } };
        },
      }),

      new FormField({
        name: "ogtn",
        label: "OGTN-Denominazione/ dedicazione",
        type: "text",
        value: "",
        column: "3",
      }),
      new FormField({
        name: "ogtp",
        label: "OGTP-Posizione",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "qntn",
        label: "QNTN-Quantità Numero",
        type: "number",
        value: "",
        column: "4",
        edit: "false",
      }),

      new SelectField({
        name: "qnts",
        label: "QNTS-Quantità non rilevata ",
        type: "select",
        column: "4",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "QNR", label: "QNR" },
        ],
      }),
      // new FormField({
      //   name: "desi",
      //   label: "DESI-Codifica Iconclass",
      //   type: "text",
      //   value: "",
      //   column: "3",
      // }),
      new FormField({
        name: "sgti",
        label: "SGTI-Soggetto",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new FormField({
        name: "sgtt",
        label: "SGTT-Titolo",
        type: "text",
        value: "",
        column: "6",
      }),
      new FormField({
        name: "deso",
        label: "DESO-Indicazioni sull'oggetto",
        type: "textarea",
        value: "",
        column: "6",
      }),

      new FormField({
        name: "dess",
        label: "DESS-Indicazioni sul soggetto",
        type: "textarea",
        value: "",
        column: "6",
      }),

      new FormField({
        name: "nsc",
        label: "NSC-Notizie Storico Critiche",
        type: "textarea",
        value: "",
        column: "12",
      }),

      /* cronologia */

      new ManyToManyField({
        name: "cronologia",
        label: "Cronologia",
        value: [],
        column: "6",

        related: "cronologia",
        foreign_key: "cronologia_id",
        preview: (item) => {
          return `${item?.dtzg}, ${item?.dtsi}, ${item?.dtsf} (id: ${
            item?.id ?? "--"
          })`;
        },
        fields: cronologia.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzg: { _contains: text } };
        },
      }),
      new FormField({
        name: "data",
        label: "Data (INV)",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      //Mtc
      new ManyToManyField({
        name: "mtc",
        label: "MTC-Materia e Tecnica",
        value: [],
        column: "6",

        related: "mtc",
        foreign_key: "mtc_id",
        preview: (item) => {
          return `${item?.mtc}  (id: ${item?.id ?? "--"})`;
        },
        fields: mtc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtc: { _contains: text } };
        },
      }),
      new FormField({
        name: "materia",
        label: "Materia (INV)",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new FormField({
        name: "oss",
        label: "OSS-Osservazioni",
        type: "textarea",
        defaultValue: null,
        column: "12",
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Misure",
        type: "biglabel",
        value: "",
      }),

      new SelectField({
        name: "misu",
        label: "MISU-Unità di misura",
        type: "select",
        column: "2",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "cm", label: "cm" },
          { value: "ct", label: "ct" },
          { value: "g", label: "g" },
          { value: "hg", label: "hg" },
          { value: "kg", label: "kg" },
          { value: "l", label: "l" },
          { value: "m", label: "m" },
          { value: "mc", label: "mc" },
          { value: "mm", label: "mm" },
          { value: "mq", label: "mq" },
          { value: "UNR", label: "Unità Non Rilevata" },
        ],
      }),

      new FormField({
        name: "misa",
        label: "MISA-Altezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misl",
        label: "MISL-Larghezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misp",
        label: "MISP-Profondità",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misd",
        label: "MISD-Diametro",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misn",
        label: "MISN-Lunghezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "miss",
        label: "MISS-Spessore",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misg",
        label: "MISG-Peso",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misv",
        label: "MISV-Varie",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new SelectField({
        name: "misr",
        label: "MISR-Mancanza",
        type: "select",
        column: "2",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "MNR", label: "MNR" },
        ],
      }),
      new SelectField({
        name: "mist",
        label: "MIST-validità",
        type: "select",
        column: "2",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "ca", label: "ca" },
        ],
      }),

      new ManyToOneField({
        name: "frm_opera",
        label: "FRM-Formato",
        value: null,
        related: "frm_opera",
        column: "2",
        type: "manyToOne",
        voc: "close",
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
        name: "mis_verificate",
        label: "Misura verificata",
        type: "text",
        defaultValue: null,
        column: "3",
        special: true,
      }),
      new FormField({
        name: "mis_ingombro",
        label: "Ingombro",
        type: "text",
        defaultValue: null,
        column: "3",
        special: true,
      }),
      new FormField({
        name: "mis_cornice",
        label: "Cornice",
        type: "text",
        defaultValue: null,
        column: "3",
        special: true,
      }),
      new FormField({
        name: "misure",
        label: "Misure (INV)",
        type: "text",
        defaultValue: null,
        column: "3",
        edit: "false",
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Rapporto Opera finale",
        type: "biglabel",
        value: "",
      }),

      //roff
      new ManyToOneField({
        name: "roff",
        label: "ROFF-Stadio opera",
        value: null,
        related: "roff",
        type: "manyToOne",
        column: "2",
        voc: "close",
        preview: (item) => {
          return `${item?.roff}`;
        },
        fields: roff.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { roff: { _contains: text } };
        },
      }),

      new FormField({
        name: "rofo",
        label: "ROFO-Opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofs",
        label: "ROFS-Soggetto opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofa",
        label: "ROFA-Autore opera originale ",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofd",
        label: "ROFD-Datazione opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofc",
        label: "ROFC-Collocazione opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "Collocazione",
        type: "biglabel",
        value: "",
      }),

      new ManyToOneField({
        name: "lc",
        voc: "open",
        label: "LC-Localizzazione (Provenienza)",
        value: null,
        related: "collocazione",
        type: "manyToOne",
        column: "4",
        preview: (item) => {
          return `${item?.ldcn}`;
        },
        fields: lc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ldcn: { _contains: text } };
        },
      }),

      new FormField({
        name: "ldcs",
        label: "LDCS-Collocazione Specifica",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "deposito",
        label: "Deposito",
        type: "toggle",
        value: "",
        column: "4",
        edit: "false",
      }),
      new FormField({
        name: "provenienza",
        label: "Provenienza (INV)",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new FormField({
        name: "collocazione_inv",
        label: "Collocazione (INV)",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      // new FormField({
      //   name: "piano",
      //   label: "Piano",
      //   type: "text",
      //   value: "",
      //   column: "3",
      //   edit: "false",
      // }),
      // new FormField({
      //   name: "sala",
      //   label: "Sala",
      //   type: "text",
      //   value: "",
      //   column: "3",
      //   edit: "false",
      // }),
      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
        type: "text",
        value: "",
        column: "6",
        edit: "false",
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Conservazione e Restauro",
        type: "biglabel",
        value: "",
      }),
      //stcc
      new SelectField({
        name: "stcc",
        label: "STCC-Stato di Conservazione",
        type: "select",
        value: "",
        column: "4",
        options: [
          { value: "", label: "" },
          { value: "buono", label: "buono" },
          { value: "discreto", label: "discreto" },
          { value: "mediocre", label: "mediocre" },
          { value: "cattivo", label: "cattivo" },
          { value: "dato non disponibile", label: "dato non disponibile" },
        ],
      }),
      new FormField({
        name: "stcs",
        label: "STCS-Indicazioni specifiche ",
        type: "text",
        defaultValue: null,
        column: "4",
      }),
      new FormField({
        name: "prestito_inv",
        label: "Prestito (INV) ",
        type: "text",
        defaultValue: null,
        column: "4",
        edit: "false",
      }),
      new FormField({
        name: "esposizione",
        label: "Corretta esposizione [x scheda prestito]",
        type: "textarea",
        defaultValue: null,
        column: "6",
        special: true,
      }),
      new FormField({
        name: "trasporto",
        label: "Corretto trasporto [x scheda prestito]",
        type: "textarea",
        defaultValue: null,
        column: "6",
        special: true,
      }),

      /* restauro */

      new ManyToManyField({
        name: "restauro",
        label: "Restauro",
        value: [],
        related: "restauro",
        foreign_key: "restauro_id",
        preview: (item) => {
          return `${item?.rste}`;
        },
        fields: restauro.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { rste: { _contains: text } };
        },
      }),

      //Compilazione
      new Divider({ type: "divider" }),

      new FormField({
        label: "Dati Fisici",
        type: "biglabel",
        value: "",
      }),
      /* iscrizione */

      new ManyToManyField({
        name: "iscrizione",
        label: "Iscrizione",
        value: [],
        related: "iscrizione",
        foreign_key: "iscrizione_id",
        column: "6",
        preview: (item) => {
          return `${item?.isrp}`;
        },
        fields: iscrizione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isrp: { _contains: text } };
        },
      }),

      /* stemmi */

      new ManyToManyField({
        name: "stemmi",
        label: "Stemmi",
        value: [],
        related: "stemmi",
        foreign_key: "stemmi_id",
        column: "6",
        preview: (item) => {
          return `${item?.stmi},${item?.stmd}`;
        },
        fields: stemmi.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { stmi: { _contains: text } };
        },
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI CULTURALI",
        type: "biglabel",
        value: "",
      }),
      /* localizzazione */

      // new ManyToManyField({
      //   name: "localizzazione",
      //   label: "Localizzazione",
      //   value: [],
      //   related: "localizzazione",
      //   foreign_key: "localizzazione_id",
      //   column: "12",
      //   preview: (item) => {
      //     return `${item?.prcd}`;
      //   },
      //   fields: localizzazione.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { prcd: { _contains: text } };
      //   },
      // }),

      /* autore */

      new ManyToManyField({
        name: "autore",
        label: "Autore",
        value: [],
        related: "autore",
        foreign_key: "autore_id",
        column: "6",

        preview: (item) => {
          return `${item?.autn} (id: ${item?.id ?? "--"}) `;
        },
        fields: autore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autn: { _contains: text } };
        },
      }),
      new FormField({
        name: "autore_inv",
        label: "Autore (INV)",
        type: "text",
        defaultValue: null,
        column: "6",
        edit: "false",
      }),
      /* ambito */

      new ManyToManyField({
        name: "ambito",
        label: "Ambito",
        value: [],
        related: "ambito",
        foreign_key: "ambito_id",
        column: "4",
        preview: (item) => {
          return `(id: ${item?.id ?? "--"}) `;
        },
        fields: ambito.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { atbd: { _contains: text } };
        },
      }),

      /* committenza */

      new ManyToManyField({
        name: "committenza",
        label: "Committenza",
        value: [],
        related: "committenza",
        foreign_key: "committenza_id",
        column: "4",
        preview: (item) => {
          return `${item?.cmmn} (id: ${item?.id ?? "--"}) `;
        },
        fields: committenza.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { cmmn: { _contains: text } };
        },
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI ALLEGATI",
        type: "biglabel",
        value: "",
      }),

      /* fta */

      new ManyToManyField({
        name: "fotografia",
        label: "Fotografia",
        value: [],
        related: "fta",
        foreign_key: "fta_id",
        column: "6",
        preview: (item) => {
          return `${item?.ftan}`;
        },
        fields: fta.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ftan: { _contains: text } };
        },
      }),

      /* fonte */

      new ManyToManyField({
        name: "fonte",
        label: "Fonte",
        value: [],
        related: "fonte",
        foreign_key: "fonte_id",
        column: "6",
        preview: (item) => {
          return `${item?.fntt},${item?.fntn}`;
        },
        fields: fonte.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { fntp: { _contains: text } };
        },
      }),

      // BIB

      new ManyToManyField({
        name: "bib",
        label: "BIB-Bibliografia",
        value: [],
        related: "bib",
        foreign_key: "bib_id",
        column: "6",
        preview: (item) => {
          return `${item?.biba} - ${item?.bibd}`;
        },
        fields: bib.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { biba: { _contains: text } };
        },
      }),

      /* mostra */
      new ManyToManyField({
        name: "mostra",
        label: "Mostra",
        value: [],
        related: "mostra",
        foreign_key: "mostra_id",
        column: "6",
        preview: (item) => {
          return `${item?.mstfin + " (" + item?.mstd + "), " + item?.mstl}`;
        },
        fields: mostra.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mostra: { _contains: text } };
        },
      }),

      new Divider({ type: "divider" }),
      new FormField({
        label: "Condizione giuridica",
        type: "biglabel",
        value: "",
      }),

      new ManyToOneField({
        name: "alnt",
        label: "ALNT-Alienazione Tipo",
        value: null,
        related: "alnt",
        type: "manyToOne",
        column: "4",
        voc: "open",
        preview: (item) => {
          return `${item?.alnt}`;
        },
        fields: alnt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { alnt: { _contains: text } };
        },
      }),
      new FormField({
        name: "alnd",
        label: "ALND-Alienazione Data",
        type: "text",
        defaultValue: null,
        column: "4",
      }),
      new FormField({
        name: "alnn",
        label: "ALNN-Alienazione Note",
        type: "text",
        defaultValue: null,
        column: "4",
      }),

      //cdgg
      new ManyToOneField({
        name: "cdgg",
        label: "CDGG - Indicazione generica",
        value: null,
        related: "cdgg",
        type: "manyToOne",
        column: "4",
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
        label: "CDGS-Indicazione specifica",
        type: "text",
        defaultValue: null,
        column: "4",
        edit: "false",
      }),
      new FormField({
        name: "cdgi",
        label: "CDGI-Indirizzo",
        type: "text",
        defaultValue: null,
        column: "4",
      }),

      //acquisizione
      new ManyToOneField({
        name: "acqt_opera",
        label: "ACQT-Tipo Acquisizione",
        value: null,
        related: "acqt_opera",
        type: "manyToOne",
        column: "4",
        voc: "close",

        preview: (item) => {
          return `${item?.acqt_opera}`;
        },
        fields: acqt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acqt_opera: { _contains: text } };
        },
      }),
      new FormField({
        name: "acqn",
        label: "ACQN-Nome",
        type: "text",
        defaultValue: null,
        column: "4",
      }),
      new FormField({
        name: "acquisizione",
        label: "Acquisizione (INV)",
        type: "text",
        defaultValue: null,
        column: "4",
        edit: "false",
      }),
      new FormField({
        name: "acqd",
        label: "ACQD-Data Acquisizione",
        type: "text",
        defaultValue: null,
        column: "6",
      }),
      new FormField({
        name: "acql",
        label: "ACQL-Luogo Acquisizione",
        type: "text",
        defaultValue: null,
        column: "6",
      }),

      //Compilazione
      new Divider({ type: "divider" }),

      new FormField({
        label: "Compilazione",
        type: "biglabel",
        value: "",
      }),

      new FormField({
        name: "cmpd",
        label: "CMPD-Data",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "cmpn",
        label: "CMPN-Compilatore",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "fur",
        label: "FUR-Funzionario",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rvmd",
        label: "RVMD-Data revisione",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rvmn",
        label: "RVMN-Nome revisione",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "date_updated",
        label: "Ultimo aggiornamento",
        type: "text",
        defaultValue: null,
        column: "2",
        edit: "false",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID", sortable: true },
      { key: "nctn", label: "NCTN", sortable: false },
      { key: "autore", label: "Autore", sortable: false },
      { key: "ogtd_oa", label: "OGTD", sortable: false },
      { key: "sgti", label: "SGTI", sortable: false },
      { key: "ldcs", label: "Localizzazione", sortable: false },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
