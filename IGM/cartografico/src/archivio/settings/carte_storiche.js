import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Image,
} from "../../models";
import Divider from "../../models/Divider";

import autore from "./autore";
import cmpn from "./cmpn";
import collezione from "./collezione";
import collocazione from "./collocazione";
import dtzg from "./dtzg";
import dtzs from "./dtzs";
import editore from "./editore";
import lingua from "./lingua";
import mtcm from "./mtcm";
import mtct from "./mtct";
import ogtt from "./ogtt";
import cdgg from "./cdgg";

export default {
  collection: "carte_storiche",
  fields() {
    return [
      new ManyToOneField({
        name: "collocazione",
        label: "LC - Collocazione",
        value: null,
        related: "carte_collocazione",
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
      new RadioField({
        name: "ADSM",
        label: "Disponibile per la stampa",

        column: 3,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "1", label: "In sola consultazione" },
          {
            value: "2",
            label: "Disponibile per la stampa",
          },
        ],
      }),
      new FormField({
        name: "pronta_consegna",
        label: "Pronta consegna",
        type: "toggle",
        value: "",
        column: "3",
      }),
      new FormField({
        label: "Codici",
        type: "biglabel",
        value: "",
        name: "Codici",
      }),
      new Divider({ type: "divider" }),
      new FormField({
        name: "id",
        label: "Codice carta",
        edit: "false",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "numero_categorico",
        label: "Numero categorico",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "INVN",
        label: "INVN – Nome inventario",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "numero_ordine",
        label: "Num Ordine Cat. Ragionato",
        type: "text",
        value: "",
        column: 2,
      }),

      new RadioField({
        name: "stato_scheda",
        label: "Stato della scheda",

        column: 4,
        type: "radio",
        value: "NR",
        inline: true,
        choices: [
          { value: "Completa", label: "Completa" },
          { value: "Incompleta", label: "Incompleta" },
          {
            value: "Con correzioni della biblioteca",
            label: "Correzioni Biblioteca",
          },
          {
            value: "NR",
            label: "NR",
          },
        ],
      }),
      new FormField({
        name: "codice_madre",
        label: "Codice Carta MADRE",
        type: "number",
        special: true,
        value: "",
        column: 3,
      }),
      new FormField({
        name: "ordine_figlia",
        label: "RVEL - Numero Ordine Madre - figlia",
        type: "number",
        special: true,

        value: null,
        column: 3,
      }),

      new FormField({
        name: "collocazione_biblioteca",
        label: "Collocazione Atlante in biblioteca",
        type: "text",
        special: true,

        value: "",
        column: 3,
      }),
      new FormField({
        name: "atlante",
        label: "Atlante",
        type: "toggle",
        value: "",
        column: "3",
      }),
      new FormField({
        label: "Oggetto",
        type: "biglabel",
        value: "",
        name: "Oggetto",
      }),
      new Divider({ type: "divider" }),

      new ManyToOneField({
        name: "OGTT",
        label: "OGTT - Tipologia",
        value: null,
        related: "ogtt",
        type: "manyToOne",
        column: 3,
        voc: "open",

        preview: (item) => {
          return `${item?.OGTT}`;
        },
        fields: ogtt.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { OGTT: { _contains: text } };
        },
      }),
      new FormField({
        name: "QNTN",
        label: "QNTN – q.tà Esemplari",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "QNTI",
        label: "QNTI – q.tà Elementi",
        type: "text",
        value: "",
        column: 3,
      }),
      new FormField({
        name: "QNTO",
        label: "QNTO - Numero d’ordine",
        type: "number",
        value: "",
        column: 3,
      }),
      new SelectField({
        name: "OGCT",
        label: "OGCT – Trattamento catalografico",
        type: "select",
        column: 4,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "1", label: "bene semplice" },
          {
            value: "2",
            label: "bene complesso/ bene composito - descrizione d'insieme",
          },
          {
            value: "3",
            label: "bene complesso/ bene composito - parte componente",
          },
        ],
      }),
      new FormField({
        name: "OGCN",
        label: "OGCN - Numero parti componenti",
        type: "number",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "OGCD",
        label: "OGCD - Definizione/posizione parti componenti",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "SGLT",
        label: "SGLT – Titolo proprio",
        type: "text",
        value: "",
        column: 12,
      }),
 

      new FormField({
        name: "SGLA",
        label: "SGLA –Titolo attribuito",
        type: "text",
        value: "",
        column: 12,
      }),
      new FormField({
        name: "OGCS",
        label: "OGCS – Note",
        type: "textarea",
        value: "",
        column: 12,
      }),
      new FormField({
        name: "UBFP",
        label: "UBFP – Fondo",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "UBFC",
        label: "UBFC – Collocazione",
        type: "text",
        value: "",
        column: 4,
      }),
      new ManyToOneField({
        name: "lingua",
        label: "Lingue",
        value: null,
        related: "lingua_carte",
        type: "manyToOne",
        column: 4,
        voc: "open",

        preview: (item) => {
          return `${item?.lingua}`;
        },
        fields: lingua.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { lingua: { _contains: text } };
        },
      }),
      new FormField({
        name: "armadio",
        label: "Armadio",
        type: "text",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "cartella",
        label: "Cartella",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "documento",
        label: "Documento",
        type: "text",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "orientamento",
        label: "Orientamento",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "scala_cartografica_numero",
        label: "Scala numerica",
        type: "text",
        value: "",
        column: 3,
      }),

      new FormField({
        name: "scala_cartografica_grafica",
        label: "Scala grafica",
        type: "text",
        value: "",
        column: 3,
      }),
         new FormField({
        name: "scala_cartografica_varie",
        label: "Scale varie",
        type: "toggle",
        value: "",
        column: 3,
      }),
      new RadioField({
        name: "legenda",
        label: "Legenda",

        column: 3,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "si", label: "si" },
          { value: "no", label: "no" },
          { value: "NR", label: "NR" },
        ],
      }),
      new FormField({
        label: "Autore",
        type: "biglabel",
        value: "",
        name: "Autore",
      }),
      new Divider({ type: "divider" }),

      new ManyToOneField({
        name: "Autore",
        label: "AUTN - Autore",
        value: null,
        related: "autore_carte",
        type: "manyToOne",
        column: 6,
        voc: "open",

        preview: (item) => {
          return `${item?.AUTN}`;
        },
        fields: autore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { AUTN: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "editore",
        label: "Editore",
        value: null,
        related: "editore_carte",
        type: "manyToOne",
        column: 6,
        voc: "open",

        preview: (item) => {
          return `${item?.edit} (${item?.editc})`;
        },
        fields: editore.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { edit: { _contains: text } };
        },
      }),
      new FormField({
        label: "Soggetto",
        type: "biglabel",
        value: "",
        name: "Soggetto",
      }),
      new Divider({ type: "divider" }),



      new ManyToOneField({
        name: "collezioni",
        label: "Collezione",
        value: null,
        related: "collezione_carte",
        type: "manyToOne",
        column: 6,
        voc: "open",

        preview: (item) => {
          return `${item?.collezione}`;
        },
        fields: collezione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { collezioni: { _contains: text } };
        },
      }),
      new FormField({
        name: "collezione_inv",
        label: "Inventario Collezione",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        label: "Cronologia",
        type: "biglabel",
        value: "",
        name: "Cronologia",
      }),
      new Divider({ type: "divider" }),

      new ManyToOneField({
        name: "dtzg",
        label: "DTZG - Periodo",
        value: null,
        related: "dtzg_carte",
        type: "manyToOne",
        column: 3,
        voc: "open",

        preview: (item) => {
          return `${item?.dtzg_carte}`;
        },
        fields: dtzg.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzg_carte: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "dtzs",
        label: "DTZS – Specifiche data",
        value: null,
        related: "dtzs_carte",
        type: "manyToOne",
        column: 3,
        voc: "close",

        preview: (item) => {
          return `${item?.dtzs_carte}`;
        },
        fields: dtzs.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { dtzs_carte: { _contains: text } };
        },
      }),

      new FormField({
        name: "dtsi",
        label: "DTSI – DA",
        type: "number",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "dtsf",
        label: "DTSF - A",
        type: "number",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "DTSV",
        label: "DTSV - Validità",
        type: "text",
        value: "",
        column: 2,
      }),

      new FormField({
        label: "Materia e misure",
        type: "biglabel",
        value: "",
        name: "Materia e misure",
      }),
      new Divider({ type: "divider" }),
      new SelectField({
        name: "MTX",
        label: "MTX – Indicazione colore",
        type: "select",
        column: 4,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "BN", label: "BN - Bianco e nero" },
          { value: "C", label: "C - Colore" },
          { value: "V", label: "V - Oggetti misti" },
          { value: "CM", label: "CM - Colorate a mano" },
        ],
      }),

      new ManyToOneField({
        name: "MTCM",
        label: "MTCM – Materia",
        value: null,
        related: "MTCM",
        type: "manyToOne",
        column: 4,
        voc: "open",

        preview: (item) => {
          return `${item?.MTCM}`;
        },
        fields: mtcm.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { MTCM: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "MTCT",
        label: "MTCT – Tecnica",
        value: null,
        related: "MTCT",
        type: "manyToOne",
        column: 4,
        voc: "open",

        preview: (item) => {
          return `${item?.MTCT}`;
        },
        fields: mtct.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { MTCT: { _contains: text } };
        },
      }),
      new SelectField({
        name: "MISZ",
        label: "MISZ - Tipo",
        type: "select",
        column: 2,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "lunghezzaxaltezza", label: "lunghezzaxaltezza" },
          { value: "altezzaxlunghezza", label: "altezzaxlunghezza" },
          {
            value: "altezzaxlunghezzaxspessore",
            label: "altezzaxlunghezzaxspessore",
          },
          { value: "circonferenza", label: "circonferenza" },
          { value: "diametro", label: "diametro" },
          { value: "spessore", label: "spessore" },
        ],
      }),
      new RadioField({
        name: "MISU",
        label: "MISU",

        column: 2,
        type: "radio",
        value: "",
        inline: true,
        choices: [
          { value: "cm", label: "cm" },
          { value: "m", label: "m" },
          { value: "mm", label: "mm" },
          { value: "NR", label: "NR" },
        ],
      }),

      new FormField({
        name: "MISM",
        label: "MISM – Misure foglio",
        type: "text",
        value: "",
        column: 2,
      }),
      new FormField({
        name: "MIST",
        label: "MIST – Misure mappa",
        type: "text",
        value: "",
        column: 3,
      }),
      new SelectField({
        name: "MNR",
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

      new FormField({
        label: "Stato di Conservazione",
        type: "biglabel",
        value: "",
        name: "Stato di Conservazione",
      }),
      new Divider({ type: "divider" }),

      new SelectField({
        name: "STCC",
        label: "STCC – Generale",
        type: "select",
        column: 6,
        value: "",
        options: [
          { value: "", label: " " },
          { value: "buono", label: "buono" },
          { value: "discreto", label: "discreto" },
          { value: "mediocre", label: "mediocre" },
          { value: "cattivo", label: "cattivo" },
        ],
      }),

      new FormField({
        label: "Dati Amministrativi",
        type: "biglabel",
        value: "",
        name: "Dati Amministrativi",
      }),
      new Divider({ type: "divider" }),

      new ManyToOneField({
        name: "CDGG",
        label: "CDGG – Cond. Giuridica",
        value: null,
        related: "cdgg",
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
        name: "CDGS",
        label: "CDGS – Specifica",
        type: "text",
        value: "",
        column: 6,
      }),

      new FormField({
        label: "Compilazione e dati di accesso",
        type: "biglabel",
        value: "",
        name: "Compilazione e dati di accesso",
      }),
      new Divider({ type: "divider" }),

      // new ManyToOneField({
      //   name: "cmpn",
      //   label: "CMPN - Compilatore",
      //   value: null,
      //   related: "cmpn",
      //   type: "manyToOne",
      //   column: 3,
      //   voc: "open",

      //   preview: (item) => {
      //     return `${item?.cmpn_nome}`;
      //   },
      //   fields: cmpn.fields,
      //   filter: (text) => {
      //     if (text.trim() === "") return {};
      //     return { cmpn_nome: { _contains: text } };
      //   },
      // }),

      new FormField({
        name: "CMPD",
        label: "CMPD - Data",
        type: "text",
        value: "",
        column: 4,
      }),

      new FormField({
        name: "FUR",
        label: "FUR - Funzionario",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "RSR",
        label: "RSR - Referente verifica scientifica",
        type: "text",
        value: "",
        column: 4,
      }),
      new FormField({
        name: "nazione",
        label: "Nazione",
        value: "",
        type: "autocomplete",
        column: 6,
      }),
      new FormField({
        name: "regione",
        label: "Regione",
        value: "",
        type: "autocomplete",
        column: 6,
      }),

      new FormField({
        name: "provincia",
        label: "Provincia",
        value: "",
        type: "autocomplete",
        column: 6,
      }),
      new FormField({
        name: "comune",
        label: "Comune",
        value: "",
        type: "autocomplete",
        column: 6,
      }),

      new SelectField({
        name: "route",
        label: "Route",
        type: "select",
        column: 4,
        value: "",
        options: [
          { value: "New_images", label: "New_images" },
          { value: "NuovoArchivio", label: "NuovoArchivio" },
          { value: "Archivio", label: "Archivio" },
          {
            value: "Biblioteca",
            label: "Biblioteca",
          },
        ],
      }),
      new FormField({
        name: "image",
        label: "Image",
        value: "",
        type: "uploadPHP",
        column: 10,
      }), new FormField({
        name: "cover",
        label: "Miniatura",
        value: "",
        type: "text",
        edit:"false",
        column: 2,
      }),
    ];
  },

  tableFields() {
    return [
      { key: "id", label: "Codice carta", sortable: true },
      { key: "scala_sort", label: "Scala", sortable: true },

      {
        key: "scala_cartografica_numero",
        label: "Scala numero",
        sortable: true,
      },
      {
        key: "scala_cartografica_grafica",
        label: "Scala grafica",
        sortable: true,
      },
      { key: "numero_categorico", label: "Codice categorico", sortable: true },
      { key: "INVN", label: "Numero inventario", sortable: true },
      { key: "SGLT", label: "Titolo", sortable: true },
      { key: "dtsi", label: "DA", sortable: true },
      { key: "dtsf", label: "A", sortable: true },
      { key: "image", label: "immagine", sortable: true },

      { key: "actions", label: "Azioni", sortable: false },
    ];
  },
};
