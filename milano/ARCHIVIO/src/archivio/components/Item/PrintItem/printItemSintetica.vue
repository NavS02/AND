<template>
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element" v-if="item">
      <div class="text-center">
        <img src="/logoMilanoBlue.png" alt="" srcset="" style="width: 300px" />
        <hr />
        <br />
        <br />
        <img
          :src="'https://www.directusmilano.ambientinarratividigitali.it/assets/' + item.icona?.id"
          alt=""
          srcset=""
          style="width: 300px"
        />
      </div>
      <br />
      <div style="width: 100%; margin-top: 10%">
        <div style="width: 75%; margin: 0 auto" v-if="item">
          <div
            v-if="
              item.lc ||
              item.ldcs ||
              item.deposito ||
              item.in_museo ||
              item.collocazioneInMuseo ||
              item.parete ||
              item.specifiche
            "
          >
            <h4>Collocazione</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div class="row" v-if="item.lc != null && item.lc !== ''">
            <div
              class="col-md-4"
              v-if="item.lc.ldcn !== null && item.lc.ldcn !== ''"
            >
              LDCN – Denomin.
            </div>
            <div class="col-md-8" v-if="item.lc !== null && item.lc !== ''">
              {{ item.lc.ldcn }}
            </div>
            <div
              class="col-md-4"
              v-if="item.lc?.ldcu !== null && item.lc !== ''"
            >
              LDCU – indirizzo
            </div>
            <div
              class="col-md-8"
              v-if="item.lc?.ldcu !== null && item.lc !== ''"
            >
              {{ item.lc?.ldcu }}
            </div>
            <div
              class="col-md-4"
              v-if="item.lc?.ldcm !== null && item.lc !== ''"
            >
              LDCM - Museo
            </div>
            <div
              class="col-md-8"
              v-if="item.lc?.ldcm !== null && item.lc !== ''"
            >
              {{ item.lc?.ldcm }}
            </div>

            <div
              class="col-md-4"
              v-if="item.lc?.ldcc !== null && item.lc !== ''"
            >
              LDCC - Complesso di appartenenza
            </div>
            <div
              class="col-md-8"
              v-if="item.lc?.ldcc !== null && item.lc !== ''"
            >
              {{ item.lc?.ldcc }}
            </div>

            <div class="col-md-4" v-if="item.ldcs !== null && item.ldcs !== ''">
              LDCS - Collocazione Specifica
            </div>
            <div class="col-md-8" v-if="item.ldcs !== null && item.ldcs !== ''">
              {{ item.ldcs }}
            </div>

            <div
              class="col-md-4"
              v-if="item.deposito !== null && item.deposito !== ''"
            >
              Opera in deposito
            </div>
            <div
              class="col-md-8"
              v-if="item.deposito !== null && item.deposito !== ''"
            >
              {{ item.deposito ? "Si" : "No" }}
            </div>
            <div
              class="col-md-4"
              v-if="item.in_museo !== null && item.in_museo !== ''"
            >
              Opera esposta
            </div>
            <div
              class="col-md-8"
              v-if="item.in_museo !== null && item.in_museo !== ''"
            >
              {{ item.in_museo ? "Si" : "No" }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.collocazioneInMuseo?.collocazioneString !== null &&
                item.collocazioneInMuseo !== ''
              "
            >
              Collocazione in museo
            </div>
            <div
              class="col-md-8"
              v-if="
                item.collocazioneInMuseo?.collocazioneString !== null &&
                item.collocazioneInMuseo !== ''
              "
            >
              {{ item.collocazioneInMuseo?.collocazioneString }}
            </div>

            <div
              class="col-md-4"
              v-if="item.parete !== null && item.parete !== ''"
            >
              Parete
            </div>
            <div
              class="col-md-8"
              v-if="item.parete !== null && item.parete !== ''"
            >
              {{ item.parete }}
            </div>

            <div
              class="col-md-4"
              v-if="item.specifiche !== null && item.specifiche !== ''"
            >
              Specifiche
            </div>
            <div
              class="col-md-8"
              v-if="item.specifiche !== null && item.specifiche !== ''"
            >
              {{ item.specifiche }}
            </div>
          </div>
          <br />
          <div
            v-if="
              item.tsk ||
              item.lir ||
              item.nctr ||
              item.nctn ||
              item.invn ||
              item.stima2 ||
              item.resti ||
              item.misu ||
              item.misa ||
              item.misl ||
              item.misp ||
              item.misd ||
              item.misn ||
              item.miss ||
              item.misg ||
              item.misv ||
              item.misr ||
              item.mist ||
              item.frm
            "
          >
            <h4>Codici</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-if="item.tsk !== null && item.tsk !== ''">
              TSK – Tipo di scheda.
            </div>
            <div class="col-md-8" v-if="item.tsk !== null && item.tsk !== ''">
              {{ item.tsk }}
            </div>
            <div class="col-md-4" v-if="item.lir !== null && item.lir !== ''">
              LIR – Livello di ricerca
            </div>
            <div class="col-md-8" v-if="item.lir !== null && item.lir !== ''">
              {{ item.lir }}
            </div>
            <div class="col-md-4" v-if="item.nctr !== null && item.nctr !== ''">
              NCTR - Num. Regione
            </div>
            <div class="col-md-8" v-if="item.nctr !== null && item.nctr !== ''">
              {{ item.nctr }}
            </div>
            <div class="col-md-4" v-if="item.nctn !== null && item.nctn !== ''">
              NCTN - Num. Catalogo
            </div>
            <div class="col-md-8" v-if="item.nctn !== null && item.nctn !== ''">
              {{ item.nctn }}
            </div>
            <div class="col-md-4" v-if="item.invn !== null && item.invn !== ''">
              INVN - Numero Inventario
            </div>
            <div class="col-md-8" v-if="item.invn !== null && item.invn !== ''">
              {{ item.invn }}
            </div>
            <div
              class="col-md-4"
              v-if="item.stima2 !== null && item.stima2 !== '' && item.stima2"
            >
              STIS - Stima
            </div>
            <div
              class="col-md-8"
              v-if="item.stima2 !== null && item.stima2 !== '' && item.stima2"
            >
              {{ item.stima2 }}
            </div>

            <div
              class="col-md-4"
              v-if="item.resti !== null && item.resti !== ''"
            >
              Opera restituita
            </div>
            <div
              class="col-md-8"
              v-if="item.resti !== null && item.resti !== ''"
            >
              {{ item.resti ? "Si" : "No" }}
            </div>

            <div class="col-md-4" v-if="item.misu !== null && item.misu !== ''">
              MISU - Unità di misura
            </div>
            <div class="col-md-8" v-if="item.misu !== null && item.misu !== ''">
              {{ item.misu }}
            </div>

            <div class="col-md-4" v-if="item.misa !== null && item.misa !== ''">
              MISA - Altezza
            </div>
            <div class="col-md-8" v-if="item.misa !== null && item.misa !== ''">
              {{ item.misa }}
            </div>

            <div class="col-md-4" v-if="item.misl !== null && item.misl !== ''">
              MISL - Larghezza
            </div>
            <div class="col-md-8" v-if="item.misl !== null && item.misl !== ''">
              {{ item.misl }}
            </div>

            <div class="col-md-4" v-if="item.misp !== null && item.misp !== ''">
              MISP - Profondità
            </div>
            <div class="col-md-8" v-if="item.misp !== null && item.misp !== ''">
              {{ item.misp }}
            </div>

            <div class="col-md-4" v-if="item.misd !== null && item.misd !== ''">
              MISD - Diametro
            </div>
            <div class="col-md-8" v-if="item.misd !== null && item.misd !== ''">
              {{ item.misd }}
            </div>

            <div class="col-md-4" v-if="item.misn !== null && item.misn !== ''">
              MISN - Lunghezza
            </div>
            <div class="col-md-8" v-if="item.misn !== null && item.misn !== ''">
              {{ item.misn }}
            </div>

            <div class="col-md-4" v-if="item.miss !== null && item.miss !== ''">
              MISS - Spessore
            </div>
            <div class="col-md-8" v-if="item.miss !== null && item.miss !== ''">
              {{ item.miss }}
            </div>

            <div class="col-md-4" v-if="item.misg !== null && item.misg !== ''">
              MISG - Peso
            </div>
            <div class="col-md-8" v-if="item.misg !== null && item.misg !== ''">
              {{ item.misg }}
            </div>

            <div class="col-md-4" v-if="item.misv !== null && item.misv !== ''">
              MISV - Varie
            </div>
            <div class="col-md-8" v-if="item.misv !== null && item.misv !== ''">
              {{ item.misv }}
            </div>

            <div class="col-md-4" v-if="item.misr !== null && item.misr !== ''">
              MISR - Mancanza
            </div>
            <div class="col-md-8" v-if="item.misr !== null && item.misr !== ''">
              {{ item.misr }}
            </div>

            <div class="col-md-4" v-if="item.mist !== null && item.mist !== ''">
              MIST - Validità
            </div>
            <div class="col-md-8" v-if="item.mist !== null && item.mist !== ''">
              {{ item.mist }}
            </div>

            <div
              class="col-md-4"
              v-if="item.frm !== null && item.frm?.frm !== ''"
            >
              FRM - Formato
            </div>
            <div
              class="col-md-8"
              v-if="item.frm !== null && item.frm?.frm !== ''"
            >
              {{ item.frm?.frm }}
            </div>
          </div>
          <br />
          <div
            v-if="
              item.ogtd ||
              item.ogtt ||
              item.ogtv ||
              item.ogtn ||
              item.ogtp ||
              item.qntn ||
              item.qnts ||
              item.desi ||
              item.sgti ||
              item.sgtt ||
              item.deso ||
              item.dess ||
              item.nsc ||
              item.descrizione_breve ||
              item.cronologia2 ||
              item.mtc2 ||
              item.mis_verificate ||
              item.mis_ingombro ||
              item.mis_cornice
            "
          >
            <h4>Oggetto</h4>
            <div style="width: 75%">
              <hr />
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="item.ogtd !== null && item.ogtd?.ogtd !== ''"
              >
                OGTD - Definizione
              </div>
              <div
                class="col-md-8"
                v-if="item.ogtd !== null && item.ogtd?.ogtd !== ''"
              >
                {{ item.ogtd?.ogtd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.ogtt !== null && item.ogtt?.ogtt !== ''"
              >
                OGTT - Tipologia
              </div>
              <div
                class="col-md-8"
                v-if="item.ogtt !== null && item.ogtt?.ogtt !== ''"
              >
                {{ item.ogtt?.ogtt }}
              </div>

              <div
                class="col-md-4"
                v-if="item.ogtv !== null && item.ogtv?.ogtv !== ''"
              >
                OGTV - Identificazione
              </div>
              <div
                class="col-md-8"
                v-if="item.ogtv !== null && item.ogtv?.ogtv !== ''"
              >
                {{ item.ogtv?.ogtv }}
              </div>

              <div
                class="col-md-4"
                v-if="item.ogtn !== null && item.ogtn !== ''"
              >
                OGTN - Denominazione/dedicazione
              </div>
              <div
                class="col-md-8"
                v-if="item.ogtn !== null && item.ogtn !== ''"
              >
                {{ item.ogtn }}
              </div>

              <div
                class="col-md-4"
                v-if="item.ogtp !== null && item.ogtp !== ''"
              >
                OGTP - Posizione
              </div>
              <div
                class="col-md-8"
                v-if="item.ogtp !== null && item.ogtp !== ''"
              >
                {{ item.ogtp }}
              </div>

              <div
                class="col-md-4"
                v-if="item.qntn !== null && item.qntn !== ''"
              >
                QNTN - Quantità Numero
              </div>
              <div
                class="col-md-8"
                v-if="item.qntn !== null && item.qntn !== ''"
              >
                {{ item.qntn }}
              </div>

              <div
                class="col-md-4"
                v-if="item.qnts !== null && item.qnts !== ''"
              >
                QNTS - Quantità non rilevata
              </div>
              <div
                class="col-md-8"
                v-if="item.qnts !== null && item.qnts !== ''"
              >
                {{ item.qnts }}
              </div>

              <div
                class="col-md-4"
                v-if="item.desi !== null && item.desi !== ''"
              >
                DESI - Codifica Iconclass
              </div>
              <div
                class="col-md-8"
                v-if="item.desi !== null && item.desi !== ''"
              >
                {{ item.desi }}
              </div>

              <div
                class="col-md-4"
                v-if="item.sgti !== null && item.sgti !== ''"
              >
                SGTI - Soggetto
              </div>
              <div
                class="col-md-8"
                v-if="item.sgti !== null && item.sgti !== ''"
              >
                {{ item.sgti }}
              </div>

              <div
                class="col-md-4"
                v-if="item.sgtt !== null && item.sgtt !== ''"
              >
                SGTT - Titolo
              </div>
              <div
                class="col-md-8"
                v-if="item.sgtt !== null && item.sgtt !== ''"
              >
                {{ item.sgtt }}
              </div>

              <div
                class="col-md-4"
                v-if="item.deso !== null && item.deso !== ''"
              >
                DESO - Indicazioni sull'oggetto
              </div>
              <div
                class="col-md-8"
                v-if="item.deso !== null && item.deso !== ''"
              >
                {{ item.deso }}
              </div>

              <div
                class="col-md-4"
                v-if="item.dess !== null && item.dess !== ''"
              >
                DESS - Indicazioni sul soggetto
              </div>
              <div
                class="col-md-8"
                v-if="item.dess !== null && item.dess !== ''"
              >
                {{ item.dess }}
              </div>

              <div class="col-md-4" v-if="item.nsc !== null && item.nsc !== ''">
                NSC - Notizie Storico Critiche
              </div>
              <div class="col-md-8" v-if="item.nsc !== null && item.nsc !== ''">
                {{ item.nsc }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.descrizione_breve !== null &&
                  item.descrizione_breve !== ''
                "
              >
                Descrizione breve
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.descrizione_breve !== null &&
                  item.descrizione_breve !== ''
                "
                v-html="item.descrizione_breve"
              ></div>

              <div
                class="col-md-4"
                v-if="
                  item.cronologia2 !== null &&
                  item.cronologia2 !== '' &&
                  item.cronologia2
                "
              >
                Cronologia
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.cronologia2 !== null &&
                  item.cronologia2 !== '' &&
                  item.cronologia2
                "
              >
                {{ item.cronologia2 }}
              </div>

              <div
                class="col-md-4"
                v-if="item.mtc2 !== null && item.mtc2 !== '' && item.mtc2"
              >
                MTC - Materia e Tecnica
              </div>
              <div
                class="col-md-8"
                v-if="item.mtc2 !== null && item.mtc2 !== '' && item.mtc2"
              >
                {{ item.mtc2 }}
              </div>
            </div>
            <br />
            <div
              v-if="
                item.mis_verificate ||
                item.mis_ingombro ||
                item.mis_cornice ||
                item.mis_verificate ||
                item.mis_ingombro ||
                item.mis_cornice
              "
            >
              <h4>Misure</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="
                  item.mis_verificate !== null && item.mis_verificate !== ''
                "
              >
                Misura verificata
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.mis_verificate !== null && item.mis_verificate !== ''
                "
              >
                {{ item.mis_verificate }}
              </div>

              <div
                class="col-md-4"
                v-if="item.mis_ingombro !== null && item.mis_ingombro !== ''"
              >
                Ingombro
              </div>
              <div
                class="col-md-8"
                v-if="item.mis_ingombro !== null && item.mis_ingombro !== ''"
              >
                {{ item.mis_ingombro }}
              </div>

              <div
                class="col-md-4"
                v-if="item.mis_cornice !== null && item.mis_cornice !== ''"
              >
                Cornice
              </div>
              <div
                class="col-md-8"
                v-if="item.mis_cornice !== null && item.mis_cornice !== ''"
              >
                {{ item.mis_cornice }}
              </div>
            </div>
            <br />
            <div
              v-if="
                item.roff ||
                item.rofo ||
                item.rofs ||
                item.rofa ||
                item.rofd ||
                item.rofc
              "
            >
              <h4>Rapporto Opera finale</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="item.roff !== null && item.roff?.roff !== ''"
              >
                ROFF - Stadio opera
              </div>
              <div
                class="col-md-8"
                v-if="item.roff !== null && item.roff?.roff !== ''"
              >
                {{ item.roff?.roff }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rofo !== null && item.rofo !== ''"
              >
                ROFO - Opera originale
              </div>
              <div
                class="col-md-8"
                v-if="item.rofo !== null && item.rofo !== ''"
              >
                {{ item.rofo }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rofs !== null && item.rofs !== ''"
              >
                ROFS - Soggetto opera originale
              </div>
              <div
                class="col-md-8"
                v-if="item.rofs !== null && item.rofs !== ''"
              >
                {{ item.rofs }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rofa !== null && item.rofa !== ''"
              >
                ROFA - Autore opera originale
              </div>
              <div
                class="col-md-8"
                v-if="item.rofa !== null && item.rofa !== ''"
              >
                {{ item.rofa }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rofd !== null && item.rofd !== ''"
              >
                ROFD - Datazione opera originale
              </div>
              <div
                class="col-md-8"
                v-if="item.rofd !== null && item.rofd !== ''"
              >
                {{ item.rofd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rofc !== null && item.rofc !== ''"
              >
                ROFC - Collocazione opera originale
              </div>
              <div
                class="col-md-8"
                v-if="item.rofc !== null && item.rofc !== ''"
              >
                {{ item.rofc }}
              </div>
            </div>

            <br />
            <div>
              <h4>Conservazione e Restauro</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="item.stcc !== null && item.stcc !== ''"
              >
                STCC - Stato di Conservazione
              </div>
              <div
                class="col-md-8"
                v-if="item.stcc !== null && item.stcc !== ''"
              >
                {{ item.stcc }}
              </div>

              <div
                class="col-md-4"
                v-if="item.stcs !== null && item.stcs !== ''"
              >
                STCS - Indicazioni specifiche
              </div>
              <div
                class="col-md-8"
                v-if="item.stcs !== null && item.stcs !== ''"
              >
                {{ item.stcs }}
              </div>

              <div
                class="col-md-4"
                v-if="item.esposizione !== null && item.esposizione !== ''"
              >
                Corretta esposizione
              </div>
              <div
                class="col-md-8"
                v-if="item.esposizione !== null && item.esposizione !== ''"
              >
                {{ item.esposizione }}
              </div>

              <div
                class="col-md-4"
                v-if="item.trasporto !== null && item.trasporto !== ''"
              >
                Corretto trasporto
              </div>
              <div
                class="col-md-8"
                v-if="item.trasporto !== null && item.trasporto !== ''"
              >
                {{ item.trasporto }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.restauro2 !== null &&
                  item.restauro2 !== '' &&
                  item.restauro2
                "
              >
                Restauro
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.restauro2 !== null &&
                  item.restauro2 !== '' &&
                  item.restauro2
                "
              >
                {{ item.restauro2 }}
              </div>
            </div>

            <br />
            <div v-if="item.stemmi2 || item.iscrizione2">
              <h4>Dati Fisici</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="
                  item.iscrizione2 !== null &&
                  item.iscrizione2 !== '' &&
                  item.iscrizione2
                "
              >
                Iscrizione
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.iscrizione2 !== null &&
                  item.iscrizione2 !== '' &&
                  item.iscrizione2
                "
              >
                {{ item.iscrizione2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.stemmi2 !== null && item.stemmi2 !== '' && item.stemmi2
                "
              >
                Stemmi
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.stemmi2 !== null && item.stemmi2 !== '' && item.stemmi2
                "
              >
                {{ item.stemmi2 }}
              </div>
            </div>

            <div
              v-if="
                item.localizzazione2 ||
                item.autore2 ||
                item.ambito2 ||
                item.committenza2 ||
                item.collezione
              "
            >
              <h4>Dati Culturali</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="
                  item.localizzazione2 !== null &&
                  item.localizzazione2 !== '' &&
                  item.localizzazione2
                "
              >
                Provenienza
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.localizzazione2 !== null &&
                  item.localizzazione2 !== '' &&
                  item.localizzazione2
                "
              >
                {{ item.localizzazione2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.autore2 !== null && item.autore2 !== '' && item.autore2
                "
              >
                Autore
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.autore2 !== null && item.autore2 !== '' && item.autore2
                "
              >
                {{ item.autore2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.ambito2 !== null && item.ambito2 !== '' && item.ambito2
                "
              >
                Ambito
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.ambito2 !== null && item.ambito2 !== '' && item.ambito2
                "
              >
                {{ item.ambito2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.committenza2 !== null &&
                  item.committenza2 !== '' &&
                  item.committenza2
                "
              >
                Committenza
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.committenza2 !== null &&
                  item.committenza2 !== '' &&
                  item.committenza2
                "
              >
                {{ item.committenza2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.collezione !== null && item.collezione?.collezione !== ''
                "
              >
                Collezione
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.collezione !== null && item.collezione?.collezione !== ''
                "
              >
                {{ item.collezione?.collezione }}
              </div>
            </div>
            <br />
            <div
              v-if="
                item.fotografia2 || item.fonte2 || item.bib2 || item.mostra2
              "
            >
              <h4>Dati Allegati</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="
                  item.fotografia2 !== null &&
                  item.fotografia2 !== '' &&
                  item.fotografia2
                "
              >
                Fotografia
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.fotografia2 !== null &&
                  item.fotografia2 !== '' &&
                  item.fotografia2
                "
              >
                {{ item.fotografia2 }}
              </div>

              <div
                class="col-md-4"
                v-if="item.fonte2 !== null && item.fonte2 !== '' && item.fonte2"
              >
                Fonte
              </div>
              <div
                class="col-md-8"
                v-if="item.fonte2 !== null && item.fonte2 !== '' && item.fonte2"
              >
                {{ item.fonte2 }}
              </div>

              <div
                class="col-md-4"
                v-if="item.bib2 !== null && item.bib2 !== '' && item.bib2"
              >
                Bibliografia
              </div>
              <div
                class="col-md-8"
                v-if="item.bib2 !== null && item.bib2 !== '' && item.bib2"
              >
                {{ item.bib2 }}
              </div>

              <div
                class="col-md-4"
                v-if="
                  item.mostra2 !== null && item.mostra2 !== '' && item.mostra2
                "
              >
                Mostra
              </div>
              <div
                class="col-md-8"
                v-if="
                  item.mostra2 !== null && item.mostra2 !== '' && item.mostra2
                "
              >
                {{ item.mostra2 }}
              </div>
            </div>
            <br />
            <div>
              <h4>Condizione Giuridica</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="item.alnt !== null && item.alnt?.alnt !== ''"
              >
                Alienazione Tipo
              </div>
              <div
                class="col-md-8"
                v-if="item.alnt !== null && item.alnt?.alnt !== ''"
              >
                {{ item.alnt?.alnt }}
              </div>
              <div
                class="col-md-4"
                v-if="item.alnd !== null && item.alnd !== ''"
              >
                Alienazione Data
              </div>
              <div
                class="col-md-8"
                v-if="item.alnd !== null && item.alnd !== ''"
              >
                {{ item.alnd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.alnn !== null && item.alnn !== ''"
              >
                Alienazione Note
              </div>
              <div
                class="col-md-8"
                v-if="item.alnn !== null && item.alnn !== ''"
              >
                {{ item.alnn }}
              </div>

              <div
                class="col-md-4"
                v-if="item.cdgg !== null && item.cdgg?.cdgg !== ''"
              >
                Proprietà - Indicazione generica
              </div>
              <div
                class="col-md-8"
                v-if="item.cdgg !== null && item.cdgg?.cdgg !== ''"
              >
                {{ item.cdgg?.cdgg }}
              </div>

              <div
                class="col-md-4"
                v-if="item.cdgs !== null && item.cdgs !== ''"
              >
                Proprietà - Indicazione specifica
              </div>
              <div
                class="col-md-8"
                v-if="item.cdgs !== null && item.cdgs !== ''"
              >
                {{ item.cdgs }}
              </div>

              <div
                class="col-md-4"
                v-if="item.cdgi !== null && item.cdgi !== ''"
              >
                Indirizzo
              </div>
              <div
                class="col-md-8"
                v-if="item.cdgi !== null && item.cdgi !== ''"
              >
                {{ item.cdgi }}
              </div>

              <div
                class="col-md-4"
                v-if="item.acqt !== null && item.acqt?.acqt !== ''"
              >
                Proprietà - Tipo Acquisizione
              </div>
              <div
                class="col-md-8"
                v-if="item.acqt !== null && item.acqt?.acqt !== ''"
              >
                {{ item.acqt?.acqt }}
              </div>

              <div
                class="col-md-4"
                v-if="item.acqn !== null && item.acqn !== ''"
              >
                Nome Acquisizione
              </div>
              <div
                class="col-md-8"
                v-if="item.acqn !== null && item.acqn !== ''"
              >
                {{ item.acqn }}
              </div>

              <div
                class="col-md-4"
                v-if="item.acqd !== null && item.acqd !== ''"
              >
                Data Acquisizione
              </div>
              <div
                class="col-md-8"
                v-if="item.acqd !== null && item.acqd !== ''"
              >
                {{ item.acqd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.acql !== null && item.acql !== ''"
              >
                Luogo Acquisizione
              </div>
              <div
                class="col-md-8"
                v-if="item.acql !== null && item.acql !== ''"
              >
                {{ item.acql }}
              </div>

              <div class="col-md-4" v-if="item.oss !== null && item.oss !== ''">
                Osservazioni
              </div>
              <div class="col-md-8" v-if="item.oss !== null && item.oss !== ''">
                {{ item.oss }}
              </div>
            </div>
            <br />
            <div>
              <h4>Compilazione</h4>
              <div style="width: 75%">
                <hr />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4"
                v-if="item.cmpd !== null && item.cmpd !== ''"
              >
                Data
              </div>
              <div
                class="col-md-8"
                v-if="item.cmpd !== null && item.cmpd !== ''"
              >
                {{ item.cmpd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.cmpn !== null && item.cmpn !== ''"
              >
                Compilatore
              </div>
              <div
                class="col-md-8"
                v-if="item.cmpn !== null && item.cmpn !== ''"
              >
                {{ item.cmpn }}
              </div>

              <div class="col-md-4" v-if="item.fur !== null && item.fur !== ''">
                Funzionario
              </div>
              <div class="col-md-8" v-if="item.fur !== null && item.fur !== ''">
                {{ item.fur }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rvmd !== null && item.rvmd !== ''"
              >
                Data revisione
              </div>
              <div
                class="col-md-8"
                v-if="item.rvmd !== null && item.rvmd !== ''"
              >
                {{ item.rvmd }}
              </div>

              <div
                class="col-md-4"
                v-if="item.rvmn !== null && item.rvmn !== ''"
              >
                Nome revisione
              </div>
              <div
                class="col-md-8"
                v-if="item.rvmn !== null && item.rvmn !== ''"
              >
                {{ item.rvmn }}
              </div>

              <div
                class="col-md-4"
                v-if="item.link_esterni !== null && item.link_esterni !== ''"
              >
                Link Esterni
              </div>
              <div
                class="col-md-8"
                v-if="item.link_esterni !== null && item.link_esterni !== ''"
              >
                <a :href="item.link_esterni">{{ item.link_esterni }} </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
import Form from "../../common/Form/Form.vue";
import * as settings from "../../../settings";
import store from "../../../../store";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const currentId = ref();
const props = defineProps({
  id: { type: Number, default: null },
});
const { id } = toRefs(props);
const item = ref();
const autrValues = ref();
const autsValues = ref();
const autmValues = ref();
const fotografoNames = ref();
const autoreNames = ref();
const title = ref();
const collection = ref("opera");
const fields = ref([]); // fields settings
const url = ref(import.meta.env.VITE_API_BASE_URL);
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
watch(
  route,
  async () => {
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields();
    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
      const data = await store.collections.fetchOne(
        collection.value,
        id.value,
        true
      );
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;

      fetchItem(id.value);
    }, 0);
  },
  { immediate: true, deep: true }
);

async function fetchItem(idOpera) {
  // set non editable fields

  try {
    for (let index = 0; index < fields.value.length; index++) {
      fields.value[index].edit = "false";
    }

    // takes data of each field
    const response = await directus.items("opera").readByQuery({
      limit: 1,
      filter: { id: { _eq: idOpera } },
      fields: "*.*.*",
    });

    item.value = response.data[0];
    if (item.value.acc) {
      item.value.acc2 = item.value.acc
        .map((item) => item.acc_id.acc)
        .join(", ");
    }
    if (item.value.stima) {
      item.value.stima2 = item.value.stima
        .map((item) => item.stima_id.stis)
        .join(", ");
    }
    if (item.value.fotografia) {
      item.value.fotografia2 = item.value.fotografia
        .map((item) => item.fta_id.ftat)
        .join(", ");
    }

    if (item.value.fonte) {
      item.value.fonte2 = item.value.fonte
        .map((item) => item.fonte_id.fnta)
        .join(", ");
    }

    if (item.value.bib) {
      item.value.bib2 = item.value.bib
        .map((item) => {
          return `${item?.bib_id?.biba}, ${item?.bib_id?.bibd}`;
        })
        .join(", ");
    }

    if (item.value.mostra) {
      item.value.mostra2 = item.value.mostra2
        .map((item) => {
          return `${item?.mostra_id?.mstd}, ${item?.mostra_id?.mstt}`;
        })
        .join(", ");
    }

    if (item.value.cronologia) {
      item.value.cronologia2 = item.value.cronologia
        .map((item) => {
          const parts = [];

          if (item.cronologia_id?.dtzg) parts.push(item.cronologia_id?.dtzg);

          if (item.cronologia_id?.dtsi) {
            let part = item.cronologia_id?.dtsi;
            if (item.cronologia_id?.dtsv)
              part += ` (${item.cronologia_id?.dtsv})`;
            parts.push(part);
          }

          if (item.cronologia_id?.dtsf) {
            let part = item.cronologia_id?.dtsf;
            if (item.cronologia_id?.dtsl)
              part += ` (${item.cronologia_id?.dtsl})`;
            parts.push(part);
          }

          return parts.join(", ");
        })
        .join(" - ");
    }

    if (item.value.restauro) {
      item.value.restauro2 = item.value.restauro
        .map((item) => {
          const filesText =
            item?.restauro_id?.files?.length > 0 ? " (file allegati)" : "";
          return `${item?.restauro_id?.restauroString} ${filesText}`;
        })
        .join(" - ");
    }

    if (item.value.mtc) {
      item.value.mtc2 = item.value.mtc
        .map((item) => item.mtc_id.mtc)
        .join(", ");
    }
    if (item.value.localizzazione) {
      item.value.localizzazione2 = item.value.localizzazione
        .map((item) => item.localizzazione_id.prcd)
        .join(", ");
    }
    if (item.value.iscrizione) {
      item.value.iscrizione2 = item.value.iscrizione
        .map((item) => item.iscrizione_id.isri)
        .join(", ");
    }
    if (item.value.autore) {
      item.value.autore2 = item.value.autore
        .map((item) => item.autore_id.autoreString)
        .join(", ");
    }
    if (item.value.ambito) {
      item.value.ambito2 = item.value.ambito
        .map((item) => item.ambito_id.ambitoString)
        .join(", ");
    }
    if (item.value.committenza) {
      item.value.committenza2 = item.value.committenza
        .map((item) => item.committenza_id.cmmn)
        .join(", ");
    }
    if (item.value.stemmi) {
      item.value.stemmi2 = item.value.stemmi
        .map((item) => {
          return `${item?.restauro_id?.stmi}, ${item?.restauro_id?.stmd}`;
        })
        .join(" - ");
    }

    console.log(item.value);
  } catch (error) {}
}

// THIS FUNCTION WORKS WHEN IS IN PRODUCTION

function changeItem() {
  currentId.value = document.getElementById("idItem").value;
  router.push({ name: "printItemS", params: { id: currentId.value } });
}
function printItem() {
  var opt = {
    margin: 0.2,
    filename: "scheda_" + id.value + "_" + new Date() + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1, useCORS: true },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      console.log("PDF Generated");

      cardBodies.forEach((card) => {
        card.style.backgroundColor = "";
      });
      formControls.forEach((control) => {
        control.style.backgroundColor = "";
      });
      cardHeaders.forEach((header) => {
        header.style.backgroundColor = "";
      });
    });
}
</script>
<style scoped>

.col-md-4 {
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>
