<template>
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element">
      <div class="text-center">
        <span>{{ item.collocazione.ldcn }}</span
        >, {{ item.collocazione.ldcm }}
      </div>

      <br />
      <div class="text-center" style="font-weight: bold">{{ title }}</div>
      <hr />
      <div class="text-center" style="margin-bottom: 80px">
        <img
          :src="url"
          alt=""
          srcset=""
          style="max-width: 600px; padding: 10px; border: 1px solid grey"
        />
        <br />
        <div v-if="item.image !== null && item.image !== ''">
          {{ item.image
          }}<span
            v-if="
              item.fvcu !== null &&
              item.fvcu !== '' &&
              item.image !== null &&
              item.image !== ''
            "
            >,
          </span>
          <span v-if="item.fvcu !== null && item.fvcu !== ''">{{
            item.fvcu
          }}</span>

          <!-- <span v-if="item.volume !== null && item.volume !== ''">({{item.volume}})</span> -->
        </div>
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

          <div style="margin-top: 15px">
            <h4>Fotografia</h4>
            <div style="width: 75%">
              <hr />
            </div>
          </div>
          <div class="row">
            <div
              class="col-md-4"
              v-if="item.image !== null && item.image !== ''"
            >
              Nome immagine
            </div>
            <div
              class="col-md-8"
              v-if="item.image !== null && item.image !== ''"
            >
              {{ item.image }}
            </div>
            <div class="col-md-4" v-if="item.fvcu !== null && item.fvcu !== ''">
              FVCU - Risoluzione
            </div>
            <div class="col-md-8" v-if="item.fvcu !== null && item.fvcu !== ''">
              {{ item.fvcu }}
            </div>

            <div class="col-md-4" v-if="item.invn !== null && item.invn !== ''">
              INVN – Nome inventario
            </div>
            <div class="col-md-8" v-if="item.invn !== null && item.invn !== ''">
              {{ item.invn }}
            </div>
            <div class="col-md-4" v-if="item.ogct !== null && item.ogct !== ''">
              OGCT – Trattamento catalografico
            </div>
            <div class="col-md-8" v-if="item.ogct !== null && item.ogct !== ''">
              {{
                item.ogct === "0"
                  ? "Madre (descrizione d'insieme)"
                  : item.ogct === "1"
                  ? "Figlia (parte componente)"
                  : item.ogct === "2"
                  ? "Bene semplice"
                  : item.ogct
              }}
            </div>

            <div class="col-md-4" v-if="item.ogcs !== null && item.ogcs !== ''">
              OGCS – Note
            </div>
            <div class="col-md-8" v-if="item.ogcs !== null && item.ogcs !== ''">
              {{ item.ogcs }}
            </div>

            <div class="col-md-4" v-if="item.sgti !== null && item.sgti !== ''">
              SGTI – Soggetto
            </div>
            <div class="col-md-8" v-if="item.sgti !== null && item.sgti !== ''">
              {{ item.sgti }}
            </div>
            <div class="col-md-4" v-if="item.sgtd !== null && item.sgtd !== ''">
              SGTD - Indicazioni sul soggetto
            </div>
            <div class="col-md-8" v-if="item.sgtd !== null && item.sgtd !== ''">
              {{ item.sgtd }}
            </div>
            <div class="col-md-4" v-if="item.sglt !== null && item.sglt !== ''">
              SGLT – Titolo proprio
            </div>
            <div class="col-md-8" v-if="item.sglt !== null && item.sglt !== ''">
              {{ item.sglt }}
            </div>
            <div class="col-md-4" v-if="item.sgla !== null && item.sgla !== ''">
              SGLA – Titolo attribuito
            </div>
            <div class="col-md-8" v-if="item.sgla !== null && item.sgla !== ''">
              {{ item.sgla }}
            </div>
            <div class="col-md-4" v-if="item.sgls !== null && item.sgls !== ''">
              SGLS –Specifiche titolo
            </div>
            <div class="col-md-8" v-if="item.sgls !== null && item.sgls !== ''">
              {{ item.sgls }}
            </div>
            <div class="col-md-4" v-if="item.sgll !== null && item.sgll !== ''">
              SGLL – Titolo parallelo
            </div>
            <div class="col-md-8" v-if="item.sgll !== null && item.sgll !== ''">
              {{ item.sgll }}
            </div>

            <div class="col-md-4" v-if="item.dtzg !== null && item.dtzg !== ''">
              DTZG - Periodo
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
            <div
              class="col-md-4"
              v-if="
                item.lrcr && item.lrcr.lrcr !== null && item.lrcr.lrcr !== ''
              "
            >
              LRCR - Regione
            </div>
            <div
              class="col-md-8"
              v-if="
                item.lrcr && item.lrcr.lrcr !== null && item.lrcr.lrcr !== ''
              "
            >
              {{ item.lrcr.lrcr }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.lrcc && item.lrcc.lrcc !== null && item.lrcc.lrcc !== ''
              "
            >
              LRCC - Comune/Località
            </div>
            <div
              class="col-md-8"
              v-if="
                item.lrcc && item.lrcc.lrcc !== null && item.lrcc.lrcc !== ''
              "
            >
              {{ item.lrcc.lrcc }}
            </div>

            <div
              class="col-md-4"
              v-if="item.lro && item.lro !== null && item.lro !== ''"
            >
              LRO – Occasione ripresa
            </div>
            <div
              class="col-md-8"
              v-if="item.lro && item.lro !== null && item.lro !== ''"
            >
              {{ item.lro }}
            </div>

            <div
              class="col-md-4"
              v-if="item.lrd && item.lrd !== null && item.lrd !== ''"
            >
              LRD – Data Ripresa
            </div>
            <div
              class="col-md-8"
              v-if="item.lrd && item.lrd !== null && item.lrd !== ''"
            >
              {{ item.lrd }}
            </div>

            <div
              class="col-md-4"
              v-if="item.edit && item.edit !== null && item.edit !== ''"
            >
              EDIT – Edizione
            </div>
            <div
              class="col-md-8"
              v-if="item.edit && item.edit !== null && item.edit !== ''"
            >
              {{ item.edit }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.serie && item.serie.sfit !== null && item.serie.sfit !== ''
              "
            >
              SFIT - Titolo della serie
            </div>
            <div
              class="col-md-8"
              v-if="
                item.serie && item.serie.sfit !== null && item.serie.sfit !== ''
              "
            >
              {{ item.serie.sfit }}
            </div>

            <div
              class="col-md-4"
              v-if="
                item.sotto_serie &&
                item.sotto_serie.ssit !== null &&
                item.sotto_serie.ssit !== ''
              "
            >
              SSIT - Titolo della sottoserie
            </div>
            <div
              class="col-md-8"
              v-if="
                item.sotto_serie &&
                item.sotto_serie.ssit !== null &&
                item.sotto_serie.ssit !== ''
              "
            >
              {{ item.sotto_serie.ssit }}
            </div>

            <div class="col-md-4" v-if="item.misz !== null && item.misz !== ''">
              MISZ - Tipo
            </div>
            <div class="col-md-8" v-if="item.misz !== null && item.misz !== ''">
              {{ item.misz }}
            </div>

            <div class="col-md-4" v-if="item.misu !== null && item.misu !== ''">
              MISU - Unità di misura
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
            <div class="col-md-4" v-if="item.mnr !== null && item.mnr !== ''">
              MNR - Misure non rilevate/misure varie
            </div>
            <div class="col-md-8" v-if="item.mnr !== null && item.mnr !== ''">
              {{ item.mnr }}
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
    // IF ITS MADRE
    if (item.value.ogct == "0") {
      try {
        const responseFotoRelationalFiglie = await directus
          .items("Foto_Foto")
          .readByQuery({
            limit: -1,
            filter: { Foto_id: { _eq: item.value.id } },
          });
        const relatedFotos = responseFotoRelationalFiglie.data.map(
          (foto) => foto.related_Foto_id
        );
        const response = await directus.items("Foto").readByQuery({
          limit: -1,
          filter: { id: { _in: relatedFotos } },
        });
        item.value.foto_figlie = response.data;
      } catch (error) {
        console.log("Cannot fetch Figlie: " + error);
      }
    } // IF ITS FIGLIA
    else if ((item.value.ogct = 1)) {
      try {
        const responseMadre = await directus.items("Foto").readByQuery({
          limit: 1,
          filter: { invn: { _eq: item.value.inv_madre } },
        });
        item.value.inv_madre = responseMadre.data[0];
      } catch (error) {
        console.log("Cannot fetch MAdre: " + error);
      }
    }

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
      if (item.value.dtzs !== null) {
        const responseDtzs = await directus.items("dtzs_f").readByQuery({
          limit: 1,
          filter: { id: { _eq: item.value.dtzs } },
        });

        item.value.dtzs = responseDtzs.data[0];
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
    try {
      const responseAutori = await directus
        .items("Foto_fotografo_1")
        .readByQuery({
          limit: -1,
          filter: { Foto_id: { _eq: item.value.id } },
        });
      const idsA = responseAutori.data.map(({ fotografo_id }) => fotografo_id);
      if (idsA.length > 0) {
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
      } else {
        fotografoNames.value = [];
      }
    } catch (error) {
      console.log("Cannot fetch fotografo:" + error);
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
      const responseOgtt = await directus.items("ogtt_F").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.ogtt } },
      });
      item.value.ogtt = responseOgtt.data[0];
    } catch (error) {
      console.log("Cannot fetch ogtt_F: " + error);
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
      const responseLrcr = await directus.items("lrcr_f").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.lrcr } },
      });
      item.value.lrcr = responseLrcr.data[0];
    } catch (error) {
      console.log("Cannot fetch lrcr_f: " + error);
    }

    try {
      const responseLrcc = await directus.items("lrcc_f").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.lrcc } },
      });
      item.value.lrcc = responseLrcc.data[0];
    } catch (error) {
      console.log("Cannot fetch lrcc_f: " + error);
    }

    try {
      const responsePdfr = await directus.items("pdfr").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.pdfr } },
      });
      item.value.pdfr = responsePdfr.data[0];
    } catch (error) {
      console.log("Cannot fetch pdfr: " + error);
    }
    try {
      const responseSerie = await directus.items("serie").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.serie } },
      });
      item.value.serie = responseSerie.data[0];
    } catch (error) {
      console.log("Cannot fetch serie: " + error);
    }
    try {
      const responseSSerie = await directus.items("sotto_serie").readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.sotto_serie } },
      });
      item.value.sotto_serie = responseSSerie.data[0];
    } catch (error) {
      console.log("Cannot fetch sotto_serie: " + error);
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
  urlWithoutPort += "/fotografico/images/preview/0001/" + itemSelected.image;

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
