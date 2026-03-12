<template>
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element">
      <br />
      <div class="text-center" style="font-weight: bold">{{ title }}</div>
      <hr />
      <div class="text-center" style="margin-bottom: 80px">

        <img :src="cover" alt="" srcset="" style="max-width: 800px; padding: 10px; border: 1px solid grey" />
        <br>
        <br>
        <a v-if="item && item.cover !== undefined && item.cover !== '' && item.cover !== null" :href="cover"
          target="_blank">
          <button type="button" class="btn btn-secondary"><font-awesome-icon
              icon="fa-solid fa-magnifying-glass" /></button>
        </a>
        <br />
        <span v-if="item && item.cover !== undefined && item.cover !== '' && item.cover !== null">

          {{ item.cover }}

        </span>

      </div>

      <div class="swiper-container" style="width: 100%" id="swiperData" v-if="numAtlante !== null">
        <swiper :slides-per-view="5" :space-between="0" :pagination="{ clickable: true }" class="mySwiper" style="width: 100%"
          :modules="modules">
          <swiper-slide v-for="(item, index) in imageFligie" :key="index" style="width: 20%">
            <router-link class="nav-link" :to="{
              name: 'stampaSinteticaCarta',
              params: { id: item.id },
            }">
              <img :src="item.cover" :id="index" alt="" style="max-width: 200px; image-resolution: 0dpi" />
              <div class="text-center" style="margin-right:30px">

                {{ item.cover.split("/").pop() }}

              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
      <div style="width: 100%" v-if="item && item !== null && item !== undefined">
        <div v-if="
          item &&
          item.image !== null &&
          item !== null &&
          item.image !== '' &&
          item !== undefined
        ">
          <div v-for="(image, index) in arrayImagesFiglie" :key="index" class="text-center">
            <img :src="image" :alt="'image ' + (index + 1)" style="width: 200px" />

          </div>
        </div>

        <div style="width: 75%; margin: 0 auto" v-if="item">
          <div class="row">
            <div class="col-md-4" v-if="item.OGCS !== null && item.OGCS !== '' && item.OGCS !== undefined">
              OGCS – Note
            </div>
            <div class="col-md-8" v-if="item.OGCS !== null && item.OGCS !== '' && item.OGCS !== undefined">
              {{ item.OGCS }}
              <br />
              <br />
            </div>
            <div class="col-md-4" v-if="item.dtzg && item.dtzg.dtzg_carte">
              Cronologia
            </div>
            <div class="col-md-8" v-if="item.dtzg && item.dtzg.dtzg_carte">
              <span v-if="item.dtzg && item.dtzg.dtzg_carte">
                <span v-if="item.dtzg && item.dtzg.dtzg_carte">{{
                  item.dtzg.dtzg_carte
                }}</span>

                <span v-if="item.dtzg && (item.dtsi || item.DTSV)">, </span>

                <span v-if="item.dtsi">
                  {{ item.dtsi }}
                  <span v-if="item.dtsf">-{{ item.dtsf }}</span>
                </span>

                <span v-if="(item.dtsi || item.dtsf) && item.DTSV">, </span>

                <span v-if="item.DTSV">{{ item.DTSV }}</span>
              </span>
            </div>

            <div class="col-md-4" v-if="
              item.scala_cartografica_grafica !== null &&
              item.scala_cartografica_grafica !== '' &&
              item.scala_cartografica_grafica !== undefined
            ">
              Scala grafica
            </div>
            <div class="col-md-8" v-if="
              item.scala_cartografica_grafica !== null &&
              item.scala_cartografica_grafica !== '' &&
              item.scala_cartografica_grafica !== undefined
            ">
              {{ item.scala_cartografica_grafica }}
            </div>
            <div class="col-md-4" v-if="
              item.scala_cartografica_numero !== null &&
              item.scala_cartografica_numero !== '' &&
              item.scala_cartografica_numero !== undefined
            ">
              Scala
            </div>
            <div class="col-md-8" v-if="
              item.scala_cartografica_numero !== null &&
              item.scala_cartografica_numero !== '' &&
              item.scala_cartografica_numero !== undefined
            ">
              {{ item.scala_cartografica_numero }}
            </div>
            <div class="col-md-4" v-if="item.OGTT !== null && item.OGTT !== '' && item.OGTT !== undefined">
              OGTT - Tipologia oggetto
            </div>
            <div class="col-md-8" v-if="item.OGTT !== null && item.OGTT !== '' && item.OGTT !== undefined">
              {{ item.OGTT.OGTT }}
            </div>
            <div class="col-md-4"
              v-if="item.collezioni !== null && item.collezioni !== '' && item.collezioni !== undefined">
              Collezione
            </div>
            <div class="col-md-8"
              v-if="item.collezioni !== null && item.collezioni !== '' && item.collezioni !== undefined">
              {{ item.collezioni.collezione }}
            </div>
            <div class="col-md-4" v-if="item.MISM !== null && item.MISM !== '' && item.MISM !== undefined">
              MISURE
            </div>
            <div class="col-md-8" v-if="item.MISM !== null && item.MISM !== '' && item.MISM !== undefined">
              {{ item.MISM }}
              {{ item.MISU }}
              ( {{ item.MISZ }}
              )
            </div>
            <div class="col-md-4" v-if="item.INVN !== null && item.INVN !== '' && item.INVN !== undefined">
              INVN – Nome inventario
            </div>
            <div class="col-md-8" v-if="item.INVN !== null && item.INVN !== '' && item.INVN !== undefined">
              {{ item.INVN }}
            </div>

            <div class="col-md-4" v-if="item.QNTI !== null && item.QNTI !== '' && item.QNTI !== undefined">
              QNTI – q.tà Elementi
            </div>
            <div class="col-md-8" v-if="item.QNTI !== null && item.QNTI !== '' && item.QNTI !== undefined">
              {{ item.QNTI }}
            </div>
            <div class="col-md-4" v-if="
              item.numero_categorico !== null && item.numero_categorico !== '' &&
              item.numero_categorico !== undefined
            ">
              Codice Categorico
            </div>
            <div class="col-md-8" v-if="
              item.numero_categorico !== null && item.numero_categorico !== '' && item.numero_categorico !== undefined
            ">
              {{ item.numero_categorico }}
            </div>

            <div class="col-md-4" v-if="item.stato_scheda !== null && item.stato_scheda !== '' &&
              item.stato_scheda !== undefined
            ">
              Stato scheda
            </div>
            <div class="col-md-8"
              v-if="item.stato_scheda !== null && item.stato_scheda !== '' && item.stato_scheda !== undefined">
              {{ item.stato_scheda }}
            </div>

            <div class="col-md-4" v-if="item.nazione !== null && item.nazione !== '' && item.nazione !== undefined">
              Nazione
            </div>
            <div class="col-md-8" v-if="item.nazione !== null && item.nazione !== '' && item.nazione !== undefined">
              {{ item.nazione.replace(/,/g, ", ") }}
            </div>
            <div class="col-md-4" v-if="item.regione !== null && item.regione !== '' && item.regione !== undefined">
              Regione
            </div>
            <div class="col-md-8" v-if="item.regione !== null && item.regione !== '' && item.regione !== undefined">
              {{ item.regione.replace(/,/g, ", ") }}
            </div>
            <div class="col-md-4"
              v-if="item.provincia !== null && item.provincia !== '' && item.provincia !== undefined">
              Provincia
            </div>
            <div class="col-md-8"
              v-if="item.provincia !== null && item.provincia !== '' && item.provincia !== undefined">
              {{ item.provincia.replace(/,/g, ", ") }}
            </div>
            <div class="col-md-4" v-if="item.comune !== null && item.comune !== '' && item.comune !== undefined">
              Comune
            </div>
            <div class="col-md-8" v-if="item.comune !== null && item.comune !== '' && item.comune !== undefined">
              {{ item.comune.replace(/,/g, ", ") }}
            </div>

            <div class="col-md-4" v-if="item.armadio !== null && item.armadio !== '' && item.armadio !== undefined">
              Armadio
            </div>
            <div class="col-md-8" v-if="item.armadio !== null && item.armadio !== '' && item.armadio !== undefined">
              {{ item.armadio }}
            </div>

            <div class="col-md-4" v-if="item.cartella !== null && item.cartella !== '' && item.cartella !== undefined">
              Cartella
            </div>
            <div class="col-md-8" v-if="item.cartella !== null && item.cartella !== '' && item.cartella !== undefined">
              {{ item.cartella }}
            </div>
            <div class="col-md-4"
              v-if="item.documento !== null && item.documento !== '' && item.documento !== undefined">
              Documento
            </div>
            <div class="col-md-8"
              v-if="item.documento !== null && item.documento !== '' && item.documento !== undefined">
              {{ item.documento }}
            </div>
            <!-- <div
              class="col-md-4"
              v-if="item.collocazione !== null && item.collocazione !== ''"
            >
              Collocazione
            </div>
            <div
              class="col-md-8"
              v-if="item.collocazione !== null && item.collocazione !== ''"
            >
              {{ item.collocazione.ldcn }}
            </div> -->
            <div class="col-md-4" v-if="item.UBFP !== null && item.UBFP !== '' && item.UBFP !== undefined">
              Collocazione
            </div>
            <div class="col-md-8" v-if="item.UBFP !== null && item.UBFP !== '' && item.UBFP !== undefined">
              {{ item.UBFP }}
            </div>
            <div class="col-md-4" v-if="item.STCC !== null && item.STCC !== '' && item.STCC !== undefined">
              Stato di Conservazione </div>
            <div class="col-md-8" v-if="item.STCC !== null && item.STCC !== '' && item.STCC !== undefined">
              {{ item.STCC }}
            </div>
            <div class="col-md-4"
              v-if="item !== null && item.MTCT !== null && item.MTCT !== '' && item.MTCT !== undefined">
              MTCT - Tecnica
            </div>
            <div class="col-md-8" v-if="item && item.MTCT !== null && item.MTCT !== '' && item.MTCT !== undefined">
              {{ item.MTCT.MTCT }}
            </div>
            <div class="col-md-4"
              v-if="item !== null && item.MTX !== null && item.MTX !== '' && item.MTX !== undefined">
              MTX – Indicazione colore

            </div>
            <div class="col-md-8" v-if="item && item.MTX !== null && item.MTX !== '' && item.MTX !== undefined">
              {{ item.MTX }}
            </div>
            <div class="col-md-4" v-if="item.cdgg !== null && item.cdgg !== '' && item.cdgg !== undefined">
              Cond. Giuridica
            </div>
            <div class="col-md-8" v-if="item.cdgg !== null && item.cdgg !== '' && item.cdgg !== undefined">
              {{ item.cdgg.cdgg }}
              <span v-if="item.CDGS = null && item.CDGS !== undefined && item.CDGS !== ''">, {{ item.CDGS }} </span>
            </div>
            <div class="col-md-4" v-if="item.image !== null && item.image !== '' && item.image !== undefined">
              Immagine	
            </div>
             <div class="col-md-8" v-if="item && item.image !== null && item.image !== '' && item.image !== undefined">
  {{ formatImages(item.image) }}
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
import * as settings from "../../../settings/";
import store from "../../../../store";
import html2pdf from "html2pdf.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import "/node_modules/swiper/swiper-bundle.min.css";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "/node_modules/swiper/swiper-bundle.min.css";
import { Pagination } from 'swiper/modules';
import "/node_modules/swiper/swiper-bundle.min.css";

import "swiper/css/navigation";
const route = useRoute();
const router = useRouter();
const currentId = ref();
const props = defineProps({
  id: { type: Number, default: null },
});
const urlAPI = ref(import.meta.env.VITE_API_BASE_URL);
const modules = ref([Pagination])

const { id } = toRefs(props);
const item = ref();
const title = ref();
const collection = ref("carte_storiche");
const fields = ref([]); // fields settings
const url = ref(import.meta.env.VITE_API_BASE_URL);
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
const arrayImagesFiglie = ref([]);
const cover = ref()
const numAtlante = ref(null);
const isAtlante = ref();
const imageFligie = ref();

watch(
  route,
  async () => {
    if (!collection.value) return;
    // retrieve the settings
    numAtlante.value = null;

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

      // NOT COMMENT
      // for (const field of collectionFields) {
      //   await field.setInitialValue(data?.[field.name]);
      // }
      fields.value = collectionFields;

      fetchItem(id.value);
    }, 0);
  },
  { immediate: true, deep: true }
);
function formatImages(str) {
    if (!str) return ''
    const imgs = str.match(/\[([^\]]+)\]/g) || []
    return imgs.map(img => img.replace(/\[|\]/g, '')).join(' - ')
  }
async function fetchItem(idOpera) {
  arrayImagesFiglie.value = [];
  const response = await directus.items("carte_storiche").readByQuery({
    filter: {
      id: {
        _eq: idOpera,
      },
    },
  });

  item.value = response.data[0];

  title.value = "";
  if (
    item.value.cover !== null &&
    item.value.cover !== undefined &&
    item.value.cover !== ""
  ) {

    let urlWithoutPort = urlAPI.value.replace(/:\d+/, "");
    //let image=urlWithoutPort+'/cartografia/images/'+item.value.route+"/"+item.value.cover
    let image = urlWithoutPort + '/cartografia/public/images/' + item.value.route + "/" + item.value.cover
    cover.value = image
  }


  if (item.value.id) {
    title.value += ` (${item.value.id})`;
  }
  // if (item.value.INVN) {
  //   title.value += ` ${item.value.INVN} `;
  // }
  if (item.value.SGLT) {
    title.value += `${title.value ? " - " : ""}${item.value.SGLT}`;
  }

  if (item.value.SGLA) {
    title.value += `${title.value ? ", " : ""}${item.value.SGLA}`;
  }

  if (item.value.dtsf) {
    title.value += ` (${item.value.dtsf})`;
  }

  // if (item.value.fotografo) {
  //   const labelFotografo = fotografoNames.value
  //     .map(({ autn }) => autn)
  //     .join(", ");

  //   title.value += `${title.value ? ", " : ""}${labelFotografo}`;
  // }

  // fetchImage(item.value);

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
    const responseDTZG = await directus.items("dtzg_carte").readByQuery({
      limit: 1,
      filter: { id: { _eq: item.value.dtzg } },
    });
    item.value.dtzg = responseDTZG.data[0];
  } catch (error) {
    console.log("Cannot fetch dtzg: " + error);
  }
  try {
    const responseCollezione = await directus
      .items("collezione_carte")
      .readByQuery({
        limit: 1,
        filter: { id: { _eq: item.value.collezioni } },
      });
    item.value.collezioni = responseCollezione.data[0];
  } catch (error) {
    console.log("Cannot fetch collezione: " + error);
  }
  try {
    const responseOGTT = await directus.items("ogtt").readByQuery({
      limit: 1,
      filter: { id: { _eq: item.value.OGTT } },
    });
    item.value.OGTT = responseOGTT.data[0];
  } catch (error) {
    console.log("Cannot fetch ogtt: " + error);
  }
  try {
    const responseMTCT = await directus.items("MTCT").readByQuery({
      limit: 1,
      filter: { id: { _eq: item.value.MTCT } },
    });
    item.value.MTCT = responseMTCT.data[0];
  } catch (error) {
    console.log("Cannot fetch MTCT: " + error);
  }
  try {
    const responsecdgg = await directus.items("cdgg").readByQuery({
      limit: 1,
      filter: { id: { _eq: item.value.cdgg } },
    });
    item.value.cdgg = responsecdgg.data[0];
  } catch (error) {
    console.log("Cannot fetch cdgg: " + error);
  }

  if (item.value.atlante) {
    isAtlanteF(item.value.atlante);

  }

}
async function isAtlanteF(value) {
  console.log(value)
  if (value == true) {
    isAtlante.value = true;

    numAtlante.value = item.value.codice_madre

    const response = await directus.items("carte_storiche").readByQuery({
      filter: {
        id: { _eq: item.value.id },
      },
      limit: 1,
    });


    const response2 = await directus.items("carte_storiche").readByQuery({
      filter: {
        codice_madre: { _eq: response.data[0].codice_madre },
        ordine_figlia: { _neq: 0 },
      },
      fields: ["id", "cover", "route"],
      limit: -1,
    });

    let urlWithoutPort = urlAPI.value.replace(/:\d+/, "");
    response2.data.forEach((image) => {
      image.cover =
        urlWithoutPort +
        "/cartografia/public/images/" +
        image.route +
        "/" +
        image.cover;
    });
    imageFligie.value = response2.data;
  }
}
// THIS FUNCTION WORKS WHEN IS IN PRODUCTION
async function fetchImage(image) {
  let urlWithoutPort = url.value.replace(/:\d+/, "");
  urlWithoutPort += "/igm/images/preview/0001/" + image;

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
  document.getElementById("swiperData").style.display = "none"
  var opt = {
    margin: 0.2,
    filename: "CS_scheda_" + id.value + "_" + new Date() + ".pdf",
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
      document.getElementById("swiperData").style.display = "block"

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
