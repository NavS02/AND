<template>
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element">
      <!-- <div class="text-center" v-if=" item && item.collocazione !== undefined  && item.collocazione !== null">
        <span>{{ item.collocazione.ldcn }}</span
        >, {{ item.collocazione.ldcm }}
      </div> -->

      <br />
      <!-- <div class="text-center" style="font-weight: bold">{{ title }}</div> -->
      <div class="text-center" style="margin-bottom: 80px">
        <!-- <img
          :src="url"
          alt=""
          srcset=""
          style="max-width: 600px; padding: 10px; border: 1px solid grey"
        /> -->
        <br />
      </div>
      <div style="width: 100%">
        <div style="width: 75%; margin: 0 auto">
          <!-- <div style="margin-top: 15px">
          <h4>IMG Digitale</h4>
          <div style="width: 75%">
            <hr />
          </div>
        </div>

        <div class="row">
         
        </div> -->

          <!-- <div style="margin-top: 15px">
          <h4>Collocazione</h4>
          <div style="width: 75%">
            <hr />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">LDCN –Denomin.</div>
          <div class="col-md-8">{{ item.collocazione.ldcn }}</div>
          <div class="col-md-4">LDCM - Museo</div>
          <div class="col-md-8">{{ item.collocazione.ldcm }}</div>
        </div> -->
          <div style="margin-top: -100px">
            <h4>Collocazione</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div class="row" v-if="item.collocazione != null && item.collocazione !== ''">
            <div
              class="col-md-4"
              v-if="
                item.collocazione.ldcn !== null && item.collocazione.ldcn !== ''
              "
            >
              LDCN –Denomin.
            </div>
            <div
              class="col-md-8"
              v-if="
                item.collocazione !== null && item.collocazione !== ''
              "
            >
              {{ item.collocazione.ldcn }}
            </div>
            <div
              class="col-md-4"
              v-if="
                item.collocazione !== null && item.collocazione!== ''
              "
            >
              LDCU – indirizzo
            </div>
            <div
              class="col-md-8"
              v-if="
                item.collocazione !== null && item.collocazione !== ''
              "
            >
              {{ item.collocazione.ldcu }}
            </div>
            <div
              class="col-md-4"
              v-if="
                item.collocazione !== null && item.collocazione !== ''
              "
            >
              LDCM - Museo
            </div>
            <div
              class="col-md-8"
              v-if="
                item.collocazione !== null && item.collocazione !== ''
              "
            >
              {{ item.collocazione.ldcm }}
            </div>
          </div>
          <div style="margin-top: 15px">
            <h4>Fotografia</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-if="item.id !== null && item.id !== ''">
              ID
            </div>
            <div class="col-md-8" v-if="item.id !== null && item.id !== ''">
              {{ item.id }}
            </div>
            <div class="col-md-4" v-if="item.tsk !== null && item.tsk !== ''">
              TSK - Tipo Scheda
            </div>
            <div class="col-md-8" v-if="item.tsk !== null && item.tsk !== ''">
              {{ item.tsk }}
            </div>
            <div class="col-md-4" v-if="item.lir !== null && item.lir !== ''">
              LIR – Livello di Ricerca
            </div>
            <div class="col-md-8" v-if="item.lir !== null && item.lir !== ''">
              {{ item.lir }}
            </div>
            <div class="col-md-4" v-if="item.nctr !== null && item.nctr !== ''">
              NCTR
            </div>
            <div class="col-md-8" v-if="item.nctr !== null && item.nctr !== ''">
              {{ item.nctr }}
            </div>

            <div class="col-md-4" v-if="item.amb !== null && item.amb !== ''">
              AMB – amb. MIBACT
            </div>
            <div class="col-md-8" v-if="item.amb !== null && item.amb !== ''">
              {{ item.amb }}
            </div>
            <div class="col-md-4" v-if="item.nctn !== null && item.nctn !== ''">
              NCTN – Num cat.
            </div>
            <div class="col-md-8" v-if="item.nctn !== null && item.nctn !== ''">
              {{ item.nctn }}
            </div>


            <div class="col-md-4" v-if="item.invn !== null && item.invn !== ''">
              INVN – Nome inventario
            </div>
            <div class="col-md-8" v-if="item.invn !== null && item.invn !== ''">
              {{ item.invn }}
            </div>
            <div class="col-md-4" v-if="item.invd !== null && item.invd !== ''">
              INVD – Data
            </div>
            <div class="col-md-8" v-if="item.invd !== null && item.invd !== ''">
              {{ item.invd }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.ogtd && item.ogtd.ogtd !== null && item.ogtd.ogtd !== ''
              "
            >
              OGTD - Definizione
            </div>
            <div
              class="col-md-8"
              v-if="
                item.ogtd && item.ogtd.ogtd !== null && item.ogtd.ogtd !== ''
              "
            >
              {{ item.ogtd.ogtd }}
            </div>
         
            <div class="col-md-4" v-if="item.qntn !== null && item.qntn !== ''">
              QNTN – q.tà Esemplari
            </div>
            <div class="col-md-8" v-if="item.qntn !== null && item.qntn !== ''">
              {{ item.qntn }}
            </div>

            <div class="col-md-4" v-if="item.qnti !== null && item.qnti !== ''">
              QNTI – q.tà Elementi
            </div>
            <div class="col-md-8" v-if="item.qnti !== null && item.qnti !== ''">
              {{ item.qnti }}
            </div>


            <div class="col-md-4" v-if="item.ogcs !== null && item.ogcs !== ''">
              OGCS – Note
            </div>
            <div class="col-md-8" v-if="item.ogcs !== null && item.ogcs !== ''">
              {{ item.ogcs }}
            </div>

            <div class="col-md-4" v-if="item.ubfp !== null && item.ubfp !== ''">
              UBFP – Fondo
            </div>
            <div class="col-md-8" v-if="item.ubfp !== null && item.ubfp !== ''">
              {{ item.ubfp }}
            </div>

            <div class="col-md-4" v-if="item.ubfc !== null && item.ubfc !== ''">
              UBFC – Collocazione
            </div>
            <div class="col-md-8" v-if="item.ubfc !== null && item.ubfc !== ''">
              {{ item.ubfc }}
            </div>

            <div class="col-md-4" v-if="item.sglt !== null && item.sglt !== ''">
              SGLT – Titolo proprio
            </div>
            <div class="col-md-8" v-if="item.sglt !== null && item.sglt !== ''">
              {{ item.sglt }}
            </div>

            <div class="col-md-4" v-if="item.sgll !== null && item.sgll !== ''">
              SGLL – Titolo parallelo
            </div>
            <div class="col-md-8" v-if="item.sgll !== null && item.sgll !== ''">
              {{ item.sgll }}
            </div>
            <div class="col-md-4" v-if="item.sgtd !== null && item.sgtd !== ''">
              SGTD – Data
            </div>
            <div class="col-md-8" v-if="item.sgtd !== null && item.sgtd !== ''">
              {{ item.sgtd }}
            </div>

            <div class="col-md-4" v-if="item.dtzg !== null && item.dtzg !== ''">
              DTZG - periodo
            </div>
            <div class="col-md-8" v-if="item.dtzg !== null && item.dtzg !== ''">
              {{ item.dtzg }}
            </div>
            <div class="col-md-4" v-if="item.dtzs !== null && item.dtzs !== ''">
              DTZS – Specifiche data
            </div>
            <div class="col-md-8" v-if="item.dtzs !== null && item.dtzs !== ''">
              {{ item.dtzs.dtzs }}
            </div>
            <div class="col-md-4" v-if="item.dtsi !== null && item.dtsi !== ''">
              DTSI – DA
            </div>
            <div class="col-md-8" v-if="item.dtsi !== null && item.dtsi !== ''">
              {{ item.dtsi }}
            </div>

            <div class="col-md-4" v-if="item.dtsf !== null && item.dtsf !== ''">
              DTSF - A
            </div>
            <div class="col-md-8" v-if="item.dtsf !== null && item.dtsf !== ''">
              {{ item.dtsf }}
            </div>
            <div class="col-md-4" v-if="item.lro !== null && item.lro !== ''">
              LRO – Occasione ripresa
            </div>
            <div class="col-md-8" v-if="item.lro !== null && item.lro !== ''">
              {{ item.lro }}
            </div>
            <div class="col-md-4" v-if="item.lrd !== null && item.lrd !== ''">
              LRD – Data Ripresa
            </div>
            <div class="col-md-8" v-if="item.lrd !== null && item.lrd !== ''">
              {{ item.lrd }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.lrcs && item.lrcs.lrcs !== null && item.lrcs.lrcs !== ''
              "
            >
              LRCS – Stato
            </div>
            <div
              class="col-md-8"
              v-if="
                item.lrcs && item.lrcs.lrcs !== null && item.lrcs.lrcs !== ''
              "
            >
              {{ item.lrcs.lrcs }}
            </div>

          
           

            <div class="col-md-4" v-if="item.mtx !== null && item.mtx !== ''">
              MTX – Indicazione colore
            </div>
            <div class="col-md-8" v-if="item.mtx !== null && item.mtx !== ''">
              {{ item.mtx.mtx }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.mtcm &&
                item.mtcm.mtcm_F !== null &&
                item.mtcm.mtcm_F !== ''
              "
            >
              MTCM – Materia
            </div>
            <div
              class="col-md-8"
              v-if="
                item.mtcm &&
                item.mtcm.mtcm_F !== null &&
                item.mtcm.mtcm_F !== ''
              "
            >
              {{ item.mtcm.mtcm_F }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.mtct &&
                item.mtct.mtct_F !== null &&
                item.mtct.mtct_F !== ''
              "
            >
              MTCT – Tecnica
            </div>
            <div
              class="col-md-8"
              v-if="
                item.mtct &&
                item.mtct.mtct_F !== null &&
                item.mtct.mtct_F !== ''
              "
            >
              {{ item.mtct.mtct_F }}
            </div>

            <div class="col-md-4" v-if="item.misp !== null && item.misp !== ''">
              MISP – riferimento
            </div>
            <div class="col-md-8" v-if="item.misp !== null && item.misp !== ''">
              {{ item.misp }}
            </div>
            <div class="col-md-4" v-if="item.misz !== null && item.misz !== ''">
              MISZ - Tipo
            </div>
            <div class="col-md-8" v-if="item.misz !== null && item.misz !== ''">
              {{ item.misz }}
            </div>

            <div class="col-md-4" v-if="item.misu !== null && item.misu !== ''">
              MISU
            </div>
            <div class="col-md-8" v-if="item.misu !== null && item.misu !== ''">
              {{ item.misu }}
            </div>

            <div class="col-md-4" v-if="item.mism !== null && item.mism !== ''">
              MISM - Valore
            </div>
            <div class="col-md-8" v-if="item.mism !== null && item.mism !== ''">
              {{ item.mism }}
            </div>

            <div class="col-md-4" v-if="item.stcc !== null && item.stcc !== ''">
              STCC – Generale
            </div>
            <div class="col-md-8" v-if="item.stcc !== null && item.stcc !== ''">
              {{ item.stcc }}
            </div>

            <div class="col-md-4" v-if="item.stcs !== null && item.stcs !== ''">
              STCS- Specifiche
            </div>
            <div class="col-md-8" v-if="item.stcs !== null && item.stcs !== ''">
              {{ item.stcs }}
            </div>

            <div class="col-md-4" v-if="item.cdgs !== null && item.cdgs !== ''">
              CDGS – Specifica
            </div>
            <div class="col-md-8" v-if="item.cdgs !== null && item.cdgs !== ''">
              {{ item.cdgs }}
            </div>
            <div class="col-md-4" v-if="item.cdgg !== null && item.cdgg !== ''">
              CDGG – Cond. Giuridica
            </div>
            <div class="col-md-8" v-if="item.cdgg !== null && item.cdgg !== ''">
              {{ item.cdgg.cdgg }}
            </div>

            <div class="col-md-4" v-if="item.cprn !== null && item.cprn !== ''">
              CPRN – Nome dir. autore
            </div>
            <div class="col-md-8" v-if="item.cprn !== null && item.cprn !== ''">
              {{ item.cprn }}
            </div>

            <div class="col-md-4" v-if="item.ftan !== null && item.ftan !== ''">
              FTAN – Codice
            </div>
            <div class="col-md-8" v-if="item.ftan !== null && item.ftan !== ''">
              {{ item.ftan }}
            </div>

            <div class="col-md-4" v-if="item.ftax !== null && item.ftax !== ''">
              FTAX - Genere
            </div>
            <div class="col-md-8" v-if="item.ftax !== null && item.ftax !== ''">
              {{ item.ftax }}
            </div>

            <div class="col-md-4" v-if="item.adsp !== null && item.adsp !== ''">
              ADSP – Profilo Accesso
            </div>
            <div class="col-md-8" v-if="item.adsp !== null && item.adsp !== ''">
              {{ item.adsp }}
            </div>
            <div class="col-md-4" v-if="item.adsm !== null && item.adsm !== ''">
              ADSM - Motivazione 1
            </div>
            <div class="col-md-8" v-if="item.adsm !== null && item.adsm !== ''">
              {{ item.adsm }}
            </div>
            <div
              class="col-md-4"
              v-if="
                item.acqt && item.acqt.acqt !== null && item.acqt.acqt !== ''
              "
            >
              ACQT – Tipo Acquisizione
            </div>
            <div
              class="col-md-8"
              v-if="
                item.acqt && item.acqt.acqt !== null && item.acqt.acqt !== ''
              "
            >
              {{ item.acqt.acqt }}
            </div>

   

            <div class="col-md-4" v-if="item.acqd !== null && item.acqd !== ''">
              ACQD – Data
            </div>
            <div class="col-md-8" v-if="item.acqd !== null && item.acqd !== ''">
              {{ item.acqd }}
            </div>

            <div class="col-md-4" v-if="item.cmpn !== null && item.cmpn !== ''">
              CMPN - Compilatore
            </div>
            <div class="col-md-8" v-if="item.cmpn !== null && item.cmpn !== ''">
              {{ item.cmpn }}
            </div>

            <div class="col-md-4" v-if="item.cmpd !== null && item.cmpd !== ''">
              CMPD - Data
            </div>
            <div class="col-md-8" v-if="item.cmpd !== null && item.cmpd !== ''">
              {{ item.cmpd }}
            </div>

            <div class="col-md-4" v-if="item.fur !== null && item.fur !== ''">
              FUR - Funzionario
            </div>
            <div class="col-md-8" v-if="item.fur !== null && item.fur !== ''">
              {{ item.fur }}
            </div>
          </div>
          <div style="margin-top: 15px">
            <h4>Fotografo</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div>
            <div
              v-for="(fotografo, index) in fotografoNames"
              :key="fotografo.id"
              style="margin-bottom: 20px"
            >
              <div class="row">
                <div
                  class="col-md-4"
                  v-if="fotografo.autn !== null && fotografo.autn !== ''"
                >
                  AUTN
                </div>
                <div
                  class="col-md-8"
                  v-if="fotografo.autn !== null && fotografo.autn !== ''"
                >
                  {{ fotografo.autn }}
                </div>
                <div
                  class="col-md-4"
                  v-if="fotografo.autr !== null && fotografo.autr !== ''"
                >
                  AUTR
                </div>
                <div
                  class="col-md-8"
                  v-if="fotografo.autr !== null && fotografo.autr !== ''"
                >
                  {{ fotografo.autr }}
                </div>
                <div
                  class="col-md-4"
                  v-if="fotografo.auts !== null && fotografo.auts !== ''"
                >
                  AUTS
                </div>
                <div
                  class="col-md-8"
                  v-if="fotografo.auts !== null && fotografo.auts !== ''"
                >
                  {{ fotografo.auts }}
                </div>
                <div
                  class="col-md-4"
                  v-if="fotografo.autm !== null && fotografo.autm !== ''"
                >
                  AUTM
                </div>
                <div
                  class="col-md-8"
                  v-if="fotografo.autm !== null && fotografo.autm !== ''"
                >
                  {{ fotografo.autm }}
                </div>
              </div>
              <div style="width: 60%">
                <hr />
              </div>
            </div>
          </div>
          <div></div>
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
const title = ref();
const collection = ref("Foto");
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
    const response = await directus.items("Foto").readByQuery({
      limit: 1,
      filter: { id: { _eq: idOpera } },
    });

    item.value = response.data[0];

    try {
      const responseImmagine = await directus.items("immagine").readByQuery({
        limit: 1,
        filter: {
          _or: [
            { photo_id: { _eq: item.value.id } },
            { invn: { _eq: item.value.invn } },
          ],
        },
      });

      item.value.immagine = responseImmagine.data[0];
    } catch (error) {
      console.log("Cannot fetch immagine: " + error);
    }
    try {
      if (item.value.mtx !== null) {
        const responseMTX = await directus.items("mtx").readByQuery({
          limit: 1,
          filter: { id: { _eq: item.value.mtx } },
        });
        item.value.mtx = responseMTX.data[0];
      }
    } catch (error) {
      console.log("Cannot fetch mtx: " + error);
    }
    try {
      const responseAutr = await directus.items("autr").readByQuery({
        limit: -1,
      });
      autrValues.value = responseAutr.data;
    } catch (error) {
      console.log("Cannot fetch autr: " + error);
    }
    try {
      const responsedtzs = await directus.items("dtzs").readByQuery({
        limit: -1,
      });
      item.value.dtzs = responsedtzs.data[0];
    } catch (error) {
      console.log("Cannot fetch dtzs: " + error);
    }
    try {
      const responsecdggf = await directus.items("cdggf").readByQuery({
        limit: -1,
      });
      item.value.cdgg = responsecdggf.data[0];
    } catch (error) {
      console.log("Cannot fetch cdgg: " + error);
    }
    try {
      const responseAutm = await directus.items("autm").readByQuery({
        limit: -1,
      });
      autmValues.value = responseAutm.data;
    } catch (error) {
      console.log("Cannot fetch autm: " + error);
    }
    try {
      const responseAuts = await directus.items("auts").readByQuery({
        limit: -1,
      });
      autsValues.value = responseAuts.data;
    } catch (error) {
      console.log("Cannot fetch auts: " + error);
    }

    if (item.value.fotografo.length > 0) {
      try {
        const responseAutori = await directus
          .items("Foto_fotografo_2")
          .readByQuery({
            limit: -1,
            filter: { Foto_id: { _eq: item.value.id } },
          });
        const idsA = responseAutori.data.map(
          ({ fotografo_id }) => fotografo_id
        );
        fotografoNames.value = await directus.items("fotografo").readByQuery({
          limit: -1,
          filter: { id: { _in: idsA } },
        });
        fotografoNames.value = fotografoNames.value.data;

        fotografoNames.value.forEach((fotografo) => {
          const foundAutr = autrValues.value.find(
            (autr) => autr.id === fotografo.autr
          );
          const foundAuts = autsValues.value.find(
            (auts) => auts.id === fotografo.auts
          );
          const foundAutm = autmValues.value.find(
            (autm) => autm.id === fotografo.autm
          );
          if (foundAutr) {
            fotografo.autr = foundAutr.autr;
          }
          if (foundAuts) {
            fotografo.auts = foundAuts.auts;
          }
          if (foundAutm) {
            fotografo.autm = foundAutm.autm;
          }
        });
      } catch (error) {
        console.log("Cannot fetch fotografo:" + error);
      }
    }
    try {
      const responseArchivi = await directus.items("archivi").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.collocazione } },
      });
      item.value.collocazione = responseArchivi.data[0];
    } catch (error) {
      console.log("Cannot fetch collocazione: " + error);
    }
    try {
      const responseOgtd = await directus.items("ogtd").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.ogtd } },
      });
      item.value.ogtd = responseOgtd.data[0];
    } catch (error) {
      console.log("Cannot fetch ogtd: " + error);
    }

    try {
      const responseLrcs = await directus.items("lrcs_f").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.lrcs } },
      });
      item.value.lrcs = responseLrcs.data[0];
    } catch (error) {
      console.log("Cannot fetch lrcs_f: " + error);
    }

    try {
      const responsemtcm = await directus.items("mtcm_F").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.mtcm } },
      });
      item.value.mtcm = responsemtcm.data[0];
    } catch (error) {
      console.log("Cannot fetch mtcm_F: " + error);
    }
    try {
      const responsemtct = await directus.items("mtct_F").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.mtct } },
      });
      item.value.mtct = responsemtct.data[0];
    } catch (error) {
      console.log("Cannot fetch mtct_F: " + error);
    }
    try {
      const responseacqt = await directus.items("acqt").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.acqt } },
      });
      item.value.acqt = responseacqt.data[0];
    } catch (error) {
      console.log("Cannot fetch acqt: " + error);
    }

    title.value = "";

    if (item.value.invn !== null) {
      title.value += `${item.value.invn}`;
    }

    if (item.value.id) {
      title.value += ` (${item.value.id})`;
    }

    if (item.value.sglt) {
      title.value += `${title.value ? " - " : ""}${item.value.sglt}`;
    }

    if (item.value.sgll) {
      title.value += `${title.value ? ", " : ""}${item.value.sgll}`;
    }

    if (item.value.dtsf) {
      title.value += ` (${item.value.dtsf})`;
    }

    if (item.value.fotografo) {
      const labelFotografo = fotografoNames.value
        .map(({ autn }) => autn)
        .join(", ");

      title.value += `${title.value ? ", " : ""}${labelFotografo}`;
    }

    fetchImage(item.value);
  } catch (error) {
    item.value = null;
  }
}

// THIS FUNCTION WORKS WHEN IS IN PRODUCTION
async function fetchImage(itemSelected) {
  let urlWithoutPort = url.value.replace(/:\d+/, "");
  urlWithoutPort += "/igm/images/preview/0001/" + itemSelected.image;

  const dataUrl = await convertToDataURL(urlWithoutPort);
  url.value = dataUrl;

  async function convertToDataURL(source) {
    const blob = await fetch(source).then((result) => result.blob());
    const dataUrl = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    return dataUrl;
  }
}

function changeItem() {
  currentId.value = document.getElementById("idItem").value;
  router.push({ name: "printItem", params: { id: currentId.value } });
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
