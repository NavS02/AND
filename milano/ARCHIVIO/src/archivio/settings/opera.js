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
import Divider from "../../models/Divider";
import cronologia from "./cronologia";
import ambito from "./ambito";
import committenza from "./committenza";
import collezione from "./collezione";
import collocazioneInMuseo from "./collocazioneInMuseo"
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
  ExternalLinkField,
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
      new Files({ name: 'images', label: 'Altre immagini', foreign_key:'directus_files_id', value:[],
      fit: 'contain', width: 100, height: 100, quality: 80,column: 4 }),
      new Files({ name: 'files', label: 'Files allegati', foreign_key:'directus_files_id', value:[],
      fit: 'contain', width: 100, height: 100, quality: 80,column:4 }),

      
      new Divider({ type: "divider" }),

      new FormField({
        name: "codici",
        label: "Codici",
        type: "biglabel",
        value: "",
      }),

      new RadioField({
        name: "lir",
        column: "3",
        label: "Livello di ricerca",
        type: "radio",
        value: "I",
        inline: true,
        choices: [
          { value: "C", label: "Catalogo" },
          { value: "P", label: "Precatalogo" },
          { value: "I", label: "Inventario" },
        ],
      }),
      new FormField({
        name: "invn",
        label: "Numero Inventario",
        type: "text",
        value: "",
        column: "3",
      }),
      new ManyToManyField({
        name: "acc",
        label: "Altri codici",
        value: [],
        related: "acc",
        foreign_key: "acc_id",
        collection: "Altri codici",
        column: "3",
        sort:"acc",

        preview: (item) => {
          return `${item?.acc}`;
        },
        fields: acc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acc: { _contains: text } };
        },
      }),
      new ManyToManyField({
        name: "stima",
        label: "Stima",
        value: [],
        column: "3",
        sort:"stis",


        related: "stima",
        foreign_key: "stima_id",
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
        name: "tsk",
        label: "Tipo Scheda",
        type: "text",
        value: "OA",
        column: "3",
      }),

      new FormField({
        name: "nctr",
        label: "Num. Regione",
        type: "text",
        value: "09",
        column: "3",
      }),
      new FormField({
        name: "nctn",
        label: "Num. Catalogo",
        type: "text",
        value: "",
        column: "3",
      }),

      new FormField({
        name: "resti",
        label: "Opera restituita",
        type: "toggle",
        value: "",
        column: "3",
      }),

      /* inventario */


      // new ManyToManyField({
      //   name: "inv",
      //   label: "Numero Inventario",
      //   value: [],
      //   column: "3",
      //   related: "inv",
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
  
      //File waiting for File upload

      new Divider({ type: "divider" }),

      new FormField({
        label: "Oggetto",
        type: "biglabel",
        value: "",
        name: "oggetto",
      }),

      // OGTD
      new ManyToOneField({
        name: "ogtd",
        label: "Definizione",
        value: null,
        related: "ogtd",
        type: "manyToOne",
        column: "3",
        sort:"ogtd",

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
        label: "Tipologia",
        value: null,
        related: "ogtt",
        type: "manyToOne",
        column: "3",
        sort:"ogtt",

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
        label: "Identificazione",
        value: null,
        related: "ogtv",
        type: "manyToOne",
        column: "3",
        voc: "close",
        sort:"ogtv",

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
        label: "Denominazione/dedicazione",
        type: "text",
        value: "",
        column: "3",
      }),
      new FormField({
        name: "ogtp",
        label: "Posizione",
        type: "text",
        value: "",
        column: "3",
      }),
      new FormField({
        name: "qntn",
        label: "Quantità Numero",
        type: "number",
        value: "",
        column: "3",
      }),

      new SelectField({
        name: "qnts",
        label: "Quantità non rilevata ",
        type: "select",
        column: "3",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "QNR", label: "QNR" },
        ],
      }),
      new FormField({
        name: "desi",
        label: "Codifica Iconclass",
        type: "text",
        value: "",
        column: "3",
      }),
      new FormField({
        name: "sgti",
        label: "Soggetto",
        type: "text",
        value: "",
        column: "6",
      }),
      new FormField({
        name: "sgtt",
        label: "Titolo",
        type: "text",
        value: "",
        column: "6",
      }),
      new FormField({
        name: "deso",
        label: "Indicazioni sull'oggetto",
        type: "textarea",
        value: "",
        column: "6",
      }),

      new FormField({
        name: "dess",
        label: "Indicazioni sul soggetto",
        type: "textarea",
        value: "",
        column: "6",
      }),
    
      new FormField({
        name: "nsc",
        label: "Notizie Storico Critiche",
        type: "textarea",
        value: "",
        column: "12",
      }),
      new FormField({
        name: "descrizione_breve",
        label: "Descrizione breve",
        type: "richtext",
        defaultValue: null,
        column: "12",
      }),
  
      /* cronologia */
      new ManyToManyField({
        name: "cronologia",
        label: "Cronologia",
        value: [],
        column: "6",
        sort: "dtsi",
        related: "cronologia",
        foreign_key: "cronologia_id",
        preview: (item) => {
            const parts = [];
    
            if (item?.dtzg) parts.push(item.dtzg);
            if (item?.dtsi) {
                let part = item.dtsi;
                if (item?.dtsv) part += ` (${item.dtsv})`;
                parts.push(part);
            }
            if (item?.dtsf) {
                let part = item.dtsf;
                if (item?.dtsl) part += ` (${item.dtsl})`;
                parts.push(part);
            }
    
            return parts.join(', ');
        },
        fields: cronologia.fields,
        filter: (text) => {
            if (text.trim() === "") return {};
            return { cronologia: { _contains: text } };
        },
    }),
    
    
      //Mtc
      new ManyToManyField({
        name: "mtc",
        label: "Materia e Tecnica",
        value: [],
        column: "6",
        sort:"mtc",
        related: "mtc",
        foreign_key: "mtc_id",
        preview: (item) => {
          return `${item?.mtc} `;
        },
        fields: mtc.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { mtc: { _contains: text } };
        },
      }),
    
      new Divider({ type: "divider" }),

      new FormField({
        label: "Misure",
        type: "biglabel",
        value: "",
        name: "misure",
      }),

      new SelectField({
        name: "misu",
        label: "Unità di misura",
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
        label: "Altezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misl",
        label: "Larghezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misp",
        label: "Profondità",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misd",
        label: "Diametro",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misn",
        label: "Lunghezza",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "miss",
        label: "Spessore",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misg",
        label: "Peso",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "misv",
        label: "Varie",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new SelectField({
        name: "misr",
        label: "Mancanza",
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
        label: "Validità",
        type: "select",
        column: "2",
        value: "",
        options: [
          { value: "", label: " " },
          { value: "ca", label: "ca" },
        ],
      }),

      new ManyToOneField({
        name: "frm",
        label: "Formato",
        value: null,
        related: "frm",
        column: "2",
        type: "manyToOne",
        voc: "open",
        sort:"frm",

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
        column: "4",
        special: true,
      }),
      new FormField({
        name: "mis_ingombro",
        label: "Ingombro",
        type: "text",
        defaultValue: null,
        column: "4",
        special: true,
      }),
      new FormField({
        name: "mis_cornice",
        label: "Cornice",
        type: "text",
        defaultValue: null,
        column: "4",
        special: true,
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Rapporto Opera finale",
        type: "biglabel",
        value: "",
        name: "Rof",
      }),

      //roff
      new ManyToOneField({
        name: "roff",
        label: "Stadio opera",
        value: null,
        related: "roff",
        type: "manyToOne",
        column: "2",
        sort:"roff",

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
        label: "Opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofs",
        label: "Soggetto opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofa",
        label: "Autore opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofd",
        label: "Datazione opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rofc",
        label: "Collocazione opera originale",
        type: "text",
        defaultValue: null,
        column: "2",
      }),

      new Divider({ type: "divider" }),

      new FormField({
        label: "Collocazione",
        type: "biglabel",
        value: "",
        name: "collocazione",
      }),

      new ManyToOneField({
        name: "lc",
        voc: "open",
        label: "Localizzazione",
        value: null,
        related: "collocazione",
        type: "manyToOne",
        sort:"ldcn",

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
        label: "Collocazione Specifica",
        type: "text",
        value: "",
        column: "4",
      }),
      new FormField({
        name: "deposito",
        label: "Opera in deposito",
        type: "toggle",
        value: "",
        column: "2",
      }),
      new FormField({
        name: "in_museo",
        label: "Opera esposta",
        type: "toggle",
        value: "",
        column: "2",
      }),
      new ManyToOneField({
        name: "collocazioneInMuseo",
        voc: "close",
        label: "Collocazione in museo",
        value: null,
        related: "collocazioneInMuseo",
        sort:"collocazioneString",

        type: "manyToOne",
        column: "6",
        preview: (item) => {
          return `${item?.collocazioneString}`;
        },
        fields: collocazioneInMuseo.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { collocazioneString: { _contains: text } };
        },
      }),
      new FormField({
        name: "parete",
        label: "Parete",
        type: "text",
        value: "",
        column: "3",
      }),
      new FormField({
        name: "specifiche",
        label: "Specifiche",
        type: "text",
        value: "",
        column: "3",
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "Conservazione e Restauro",
        type: "biglabel",
        value: "",
        name: "CeR",
      }),
      //stcc
      new SelectField({
        name: "stcc",
        label: "Stato di Conservazione",
        type: "select",
        value: "",
        column: "6",
        options: [
          { value: "", label: "" },
          { value: "buono", label: "buono" },
          { value: "discreto", label: "discreto" },
          { value: "mediocre", label: "mediocre" },
          { value: "cattivo", label: "cattivo" },
        ],
      }),
      new FormField({
        name: "stcs",
        label: "Indicazioni specifiche",
        type: "text",
        defaultValue: null,
        column: "6",
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
        sort:"restauroString",

        preview: (item) => {
          const filesText = item?.files.length>0 ? " (file allegati)" : "";
          return `${item?.restauroString} ${filesText }`;
        },
        fields: restauro.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { restauroString: { _contains: text } };
        },
      }),
      
    

      //Compilazione
      new Divider({ type: "divider" }),

      new FormField({
        label: "Dati Fisici",
        type: "biglabel",
        value: "",
        name: "dFisici",
      }),
      /* iscrizione */

      new ManyToManyField({
        name: "iscrizione",
        label: "Iscrizione",
        value: [],
        related: "iscrizione",
        foreign_key: "iscrizione_id",
        column:"6",
        sort:"isri",

        preview: (item) => {
          return `${item?.isri}`;
        },
        fields: iscrizione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { isri: { _contains: text } };
        },
      }),

      /* stemmi */

      new ManyToManyField({
        name: "stemmi",
        label: "Stemmi",
        value: [],
        related: "stemmi",
        foreign_key: "stemmi_id",
        sort:"stmi",

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
        name: "datiC",
      }),
      /* localizzazione */

      new ManyToManyField({
        name: "localizzazione",
        label: "Provenienza",
        value: [],
        related: "localizzazione",
        foreign_key: "localizzazione_id",
        column: "12",
        sort:"prcd",

        preview: (item) => {
          return `${item?.prcd}`;
        },
        fields: localizzazione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { prcd: { _contains: text } };
        },
      }),

      /* autore */

      new ManyToManyField({
        name: "autore",
        label: "Autore",
        value: [],
        related: "autore",
        foreign_key: "autore_id",
        column: "4",
        sort:"autn",

        preview: (item) => {
          return `${item?.autoreString}  `;
        },
        fields: autore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { autn: { _contains: text } };
        },
      }),

      /* ambito */

      new ManyToManyField({
        name: "ambito",
        label: "Ambito",
        value: [],
        related: "ambito",
        foreign_key: "ambito_id",
        column: "4",
        sort:"ambitoString",

        preview: (item) => {
          return `${item?.ambitoString}`;
        },
        fields: ambito.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ambitoString: { _contains: text } };
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
        sort:"cmmn",

        preview: (item) => {
          return `${item?.cmmn} (id: ${item?.id ?? "--"}) `;
        },
        fields: committenza.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { cmmn: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "collezione",
        label: "Collezione",
        value: null,
        related: "collezione",
        type: "manyToOne",
        column: "4",
        voc: "close",
        sort:"collezione",

        preview: (item) => {
          return `${item?.collezione}`;
        },
        fields: collezione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { collezione: { _contains: text } };
        },
      }),
      new Divider({ type: "divider" }),

      new FormField({
        label: "DATI ALLEGATI",
        type: "biglabel",
        value: "",
        name: "dAllegati",
      }),

      /* fta */

      new ManyToManyField({
        name: "fotografia",
        label: "Fotografia",
        value: [],
        related: "fta",
        foreign_key: "fta_id",
        column: "6",
        sort:"ftat",

        preview: (item) => {
          return `${item?.ftat}`;
        },
        fields: fta.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { ftap: { _contains: text } };
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
        sort:"fnta",

        preview: (item) => {
          return `${item?.fnta}`;
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
        label: "Bibliografia",
        value: [],
        related: "bib",
        foreign_key: "bib_id",
        sort:"biba",

        column: "6",
        preview: (item) => {
          return `${item?.biba},${item?.bibd}`;
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
        sort:"mstd",

        column: "6",
        preview: (item) => {
          return `${item?.mstd},${item?.mstt}`;
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
        name: "condizioneG",
      }),

      new ManyToOneField({
        name: "alnt",
        label: "Alienazione Tipo",
        value: null,
        related: "alnt",
        type: "manyToOne",
        column: "4",
        voc: "open",
        sort:"alnt",

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
        label: "Alienazione Data",
        type: "text",
        defaultValue: null,
        column: "4",
      }),
      new FormField({
        name: "alnn",
        label: "Alienazione Note",
        type: "text",
        defaultValue: null,
        column: "4",
      }),

      //cdgg
      new ManyToOneField({
        name: "cdgg",
        label: "Proprietà - Indicazione generica",
        value: null,
        related: "cdgg",
        type: "manyToOne",
        column: "4",
        voc: "close",
        sort:"cdgg",

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
        label: "Proprietà - Indicazione specifica",
        type: "text",
        defaultValue: null,
        column: "4",
      }),
      new FormField({
        name: "cdgi",
        label: "Indirizzo",
        type: "text",
        defaultValue: null,
        column: "4",
      }),

      //acquisizione
      new ManyToOneField({
        name: "acqt",
        label: "Proprietà - Tipo Acquisizione",
        value: null,
        related: "acqt",
        type: "manyToOne",
        column: "3",
        voc: "close",
        sort:"acqt",

        preview: (item) => {
          return `${item?.acqt}`;
        },
        fields: acqt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { acqt: { _contains: text } };
        },
      }),
      new FormField({
        name: "acqn",
        label: "Nome Acquisizione",
        type: "text",
        defaultValue: null,
        column: "3",
      }),
      new FormField({
        name: "acqd",
        label: "Data Acquisizione",
        type: "text",
        defaultValue: null,
        column: "3",
      }),
      new FormField({
        name: "acql",
        label: "Luogo Acquisizione",
        type: "text",
        defaultValue: null,
        column: "3",
      }),
      new FormField({
        name: "oss",
        label: "Osservazioni",
        type: "textarea",
        defaultValue: null,
        column: "12",
      }),
      //Compilazione
      new Divider({ type: "divider" }),

      new FormField({
        label: "Compilazione",
        type: "biglabel",
        value: "",
        name: "compilazione",
      }),

      new FormField({
        name: "cmpd",
        label: "Data",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "cmpn",
        label: "Compilatore",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "fur",
        label: "Funzionario",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rvmd",
        label: "Data revisione",
        type: "text",
        defaultValue: null,
        column: "2",
      }),
      new FormField({
        name: "rvmn",
        label: "Nome revisione",
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
        edit: 'false',
      }),
      new ExternalLinkField({ name: 'link_esterni', label: 'Link Esterni', type: 'text', value: '' }),
     
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "invn", label: "Inventario", sortable: true },
      { key: "autore", label: "Autore", sortable: true },
      { key: "ogtd", label: "Oggetto", sortable: true },
      { key: "sgti", label: "Soggetto", sortable: true },
      { key: "ldcs", label: "Collocazione", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
