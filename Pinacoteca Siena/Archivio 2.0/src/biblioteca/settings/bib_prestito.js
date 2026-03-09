import { FormField, ManyToOneField } from "../../models";
import bib_utente from "./bib_utente";
export default {
  collection: "bib_prestito",
  fields() {
    return [
  
        new ManyToOneField({
               name: "bib_utente",
               label: "Scegliere un utente",
               value: null,
               related: "bib_utente",
               type: "manyToOne",
               column: 12,
               sort:"bib_nome",
               voc: "close",
       
               preview: (item) => {
                 return `${item?.bib_nome} ${item?.bib_cognome}`;
               },
               fields: bib_utente.fields,
               filter: (text) => {
                 if (text.trim() === "") return {};
                 return { bib_nome: { _contains: text } };
               },
             }),
      ];
  },

  tableFields() {
    return [
      { key: "bib_utente", label: "Utente", sortable: true },
      { key: "actions", label: "Azione", sortable: false },

    ];
  },
};
