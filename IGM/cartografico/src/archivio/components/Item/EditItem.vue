<template>
  <main id="main" class="main">
    <div v-if="loaded">
      <!-- NAVIGATION PANEL -->
      <div class="mb-2">
        <ItemsNavigation :collection="collection" :id="id" />
      </div>
      <!-- SAVE ALERT! -->
      <div class="succesAlert alert alert-success" role="alert" v-if="showAlert">
        Carta n. {{ id }} salvata!
      </div>
      <h3 class="text-center" v-if="collection !== 'directus_users'">
        <span v-if="collection == 'carte_storiche'">Carta n. {{ id }} - {{ schedaTitle }}</span>
        <span v-else-if="collection == 'serie_italiana'">Serie n. {{ id }}</span>
        <span v-else>Item n. {{ id }}</span>
      </h3>
      <div v-if="collection == 'serie_italiana'">
        <div class="text-center">
          <!-- foto_digitales -->
          <VueMagnifier :src="imgSerie" :id="index" alt="" zoomFactor="2.5" width="900px" mgShape="square"
            mgWidth="200" />
          <br>
          <a :href="imgSerie" target="_blank">
            <button type="button" class="btn btn-secondary"><font-awesome-icon
                icon="fa-solid fa-magnifying-glass" /></button>
          </a>
        </div>
      </div>
      <div v-if="collection == 'carte_storiche'">
        <div class="text-center">
          <VueMagnifier :src="imgCover" :id="index" alt="" zoomFactor="2.5" width="900px" mgShape="square"
            mgWidth="200" />
          <br>
          <a :href="imgCover" target="_blank">
            <button type="button" class="btn btn-secondary"><font-awesome-icon
                icon="fa-solid fa-magnifying-glass" /></button>
          </a>
        </div>
        <br />
        <div v-if="numAtlante !== null">
          <div class="text-center">
            <h5>ATLANTE n. {{ numAtlante }}</h5>
          </div>
        </div>
        <hr />
        <div class="swiper-container" style="width: 100%" v-if="numAtlante !== null">
          <swiper :slides-per-view="5" :space-between="0" :pagination="{ clickable: true }" class="mySwiper"
            style="width: 100%" :modules="modules">
            <swiper-slide v-for="(item, index) in imageFligie" :key="index" style="width: 20%">
              <router-link class="nav-link" :to="{
                name: 'editItemArc',
                params: { id: item.id, collection: 'carte_storiche' },
              }">
                <img :src="item.cover" :id="index" alt="" style="max-width: 200px; image-resolution: 0dpi" />
                <div class="text-center" style="margin-right:30px">

                  {{ item.cover.split("/").pop() }}

                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>


      <br />
      <br />
      <hr />
      <div v-if="collection == 'Foto'"></div>
      <!-- FORM WITH THE DATA -->
      <Form :fields="fields">
        <template v-slot:footer="{ data }">
          <br />
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancella</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
            <button class="btn btn-sm btn-warning" @click="onEditCarta(madre)" v-if="madre > 0">
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Atlante</span>
            </button>
            <button class="btn btn-sm btn-danger" @click="onDeleteClicked(data)">
              <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
              <span class="ms-1">Cancella questa scheda</span>
            </button>
            <button class="btn btn-sm btn-warning" @click="onEditOpera(id)"
              v-if="collection === 'app' || collection === 'touch'">
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Foto</span>
            </button>

          </div>
        </template>
      </Form>

      <br />
      <br />

      <div class="image-grid" v-if="collection == 'carte_storiche'">
        <div v-for="(image, index) in arrayImagesFiglie" :key="index" class="image-item">
          <VueMagnifier :src="image" :id="index" alt="" zoomFactor="1.5" v-if="image" />
          <span v-if="image"> {{ image.split("/").pop() }}</span>
          <div class="d-inline-flex gap-2" v-if="image">
            <button v-if="image" @click="deleteImage(image, index)" class="btn btn-outline-danger">
              Delete
            </button>
            <button v-if="image" @click="makeCover(image)" class="btn btn-outline-warning">
              Seleziona come miniatura
            </button>
            <a :href="image" target="_blank">
              <button type="button" class="btn btn-secondary"><font-awesome-icon
                  icon="fa-solid fa-magnifying-glass" /></button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <Loader v-if="!loaded" style="text-align: center; margin-top: 50%" />
  </main>
</template>
<script setup>
import { ref, watch, toRefs, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API";
import * as settings from "../../settings/";
import Form from "../common/Form/Form.vue";
import ItemsNavigation from "./ItemsNavigation.vue";
import store from "../../../store";
import "/node_modules/swiper/swiper-bundle.min.css";

import "swiper/css/navigation";
import Loader from "../common/Loader.vue";

import VueMagnifier from "@websitebeaver/vue-magnifier";
import "@websitebeaver/vue-magnifier/styles.css";

import { Swiper, SwiperSlide } from "swiper/vue";
import "/node_modules/swiper/swiper-bundle.min.css";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "/node_modules/swiper/swiper-bundle.min.css";
import { Pagination } from 'swiper/modules';

const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("/not-found.svg");
const urlAPI = ref(import.meta.env.VITE_API_BASE_URL);
const images = ref();

const props = defineProps({
  collection: { type: String, default: "" },
  id: { type: String, default: null },
});
const { id, collection } = toRefs(props);
const modules = ref([Pagination])

const route = useRoute();
const router = useRouter();
const loaded = ref(false);
const fields = ref([]); // fields settings
const showAlert = ref(false);
const arrayImagesFiglie = ref();
const isAtlante = ref();
const figlia = ref(false);
const madre = ref();
const image = ref();
const numAtlante = ref(null);
const firstCover = ref(null);
const schedaTitle = ref();
const imgCover = ref();
const imgSerie = ref();
const imageFligie = ref();
// watch the route and update data based on the collection param
watch(
  route,
  async () => {
    numAtlante.value = null;
    fields.value = null;
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
      loaded.value = true;
      if (collection.value == "carte_storiche") {
        const atlante = fields.value.find((field) => field.name === "atlante");
        const title = fields.value.find((field) => field.name === "SGLT");
        schedaTitle.value = title.initialValue;
        isAtlanteF(atlante.initialValue);
        fetchImage();
      }
      if (collection.value == "serie_italiana") {
        fetchImage();
      }
    }, 0);
  },
  { immediate: true, deep: true }
);
async function onDeleteClicked() {
  const confirmed = await modal.confirm({
    title: "Confirma",
    body: "Sei sicuro di voler ELIMINARE questa scheda?",
  });
  if (confirmed) {
    deleteItem();
  }

}
async function deleteItem() {
  if (collection.value == 'serie_italiana' || collection.value == "carte_storiche") {
    await directus
      .items(collection.value)
      .updateOne(id.value, { status: "bozza" });
  } else {
    await directus
      .items(collection.value)
      .deleteOne(id.value);
  }


  goToList();
}
async function makeCover(image) {
  let imageClean = image.split("/").pop();
  console.log(imageClean);

  let cover = fields.value.find((field) => field.name === "cover");
  cover.value = imageClean;
  firstCover.value = image;

}
async function onEditCarta(madre) {
  let response = await directus
    .items("carte_storiche")
    .readByQuery({ filter: { codice_madre: { _eq: madre } }, limit: 1 });
  console.log(response.data[0]);
  router
    .push({
      name: "editItemArc",
      params: { id: response.data[0].id, collection: "carte_storiche" },
    })
    .then(() => {
      location.reload();
    });
}
async function isAtlanteF(value) {
  console.log(value)
  if (value == true) {
    isAtlante.value = true;
    let codice_madre = fields.value.find(
      (field) => field.name === "codice_madre"
    );
    numAtlante.value = codice_madre.initialValue;

    const response = await directus.items("carte_storiche").readByQuery({
      filter: {
        id: { _eq: id.value },
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
  } else {

    let madreData = fields.value.find((field) => field.name === "codice_madre");
    madre.value = madreData.initialValue;
    console.log(madre.value)
  }
}
async function onCancelClicked() {
  const confirmed = await modal.confirm({
    title: "Confirma",
    body: "Sei sicuro di voler lasciare questa pagina?",
  });
  if (!confirmed) return;
  goToList();
}
function onSaveClicked(data) {
  save(data());
}
function goToList() {
  router.push({ name: "homeArchivio" });
}

async function onEditOpera(id) {
  // IF THE ITEM IS ( APP || TOUCHSCREEN ) DELETE THE RELATION IN THE OPERA
  if (collection.value == "app") {
    var query = {
      limit: 1,
      filter: {
        app: {
          _eq: id,
        },
      },
    };
  } else if (collection.value == "touch") {
    var query = {
      limit: 1,
      filter: {
        touch: {
          _eq: id,
        },
      },
    };
  }
  let response = await directus.items("opera").readByQuery(query);
  router
    .push({
      name: "editItemArc",
      params: { id: response.data[0].id, collection: "opera" },
    })
    .then(() => {
      location.reload();
    });
}
async function save(data) {
  try {
    console.log(data);
    if (collection.value === "carte_storiche") {
      let images = fields.value.find((field) => field.name === "image");

      data.image = images.__value;
    }
    console.log(data);
    const response = await directus
      .items(collection.value)
      .updateOne(id.value, data);

    for (const field of fields.value) {
      if (field.type == "map") {
        let data = { ["mappa"]: field.value };

        const response = await directus
          .items(collection.value)
          .updateOne(id.value, data);
      }
    }
    if (collection.value == "opera") {
      updateAPP();
      updateTOUCH();
    }
    // ALERT
    showAlert.value = true;
    setTimeout(function () {
      showAlert.value = false;
    }, 3000);
  } catch (error) {
    console.error(error);
    toaster.toast({ title: "Error", body: error }, "top right");
  }
}
// WHEN THE OPERA IS SAVED EDIT THE INFO IN THE APP AND TOUCH
async function updateTOUCH() {
  const Myitem = await directus.items("opera").readByQuery({
    filter: {
      id: { _eq: id.value },
    },
    limit: -1,
  });
  let item = Myitem.data[0];
  const opereMtc = await directus.items("opera_mtc").readByQuery({
    filter: {
      id: { _in: item.mtc },
    },
    limit: -1,
  });
  const idOpereMTC = opereMtc.data.map(({ mtc_id }) => mtc_id);

  const mtcValueApp = await directus.items("mtc").readByQuery({
    filter: {
      id: { _in: idOpereMTC },
    },
    limit: -1,
  });
  let mtcAPP = "";
  for (let index = 0; index < mtcValueApp.data.length; index++) {
    mtcAPP += mtcValueApp.data[index].mtc + " ";
  }

  // TAKE AUTORE INFO
  let autaValues = "";
  let autsID = [];
  let autsValues = "";
  let autnValues = "";

  try {
    const autoreOpera = await directus.items("opera_autore").readByQuery({
      filter: {
        id: { _in: item.autore },
      },
      limit: -1,
    });

    const autoreIds = autoreOpera.data.map((item) => item.autore_id);
    const autores = await directus.items("autore").readByQuery({
      filter: {
        id: { _in: autoreIds },
      },
      limit: -1,
    });

    for (let index = 0; index < autores.data.length; index++) {
      autaValues += autores.data[index].auta + " ";
      autnValues += autores.data[index].autn + " ";

      autsID.push(autores.data[index].auts);
    }
    const autsAutore = await directus.items("auts").readByQuery({
      filter: {
        id: { _in: autsID },
      },
      limit: -1,
    });

    for (let index = 0; index < autsAutore.data.length; index++) {
      autsValues += autsAutore.data[index].auts + " ";
    }
  } catch (error) {
    autaValues = "";
    autsValues = "";
    item.autore = "";
    autnValues = "";
  }
  // COLLEZIONE
  let appCollection;
  try {
    const collezione = await directus.items("collezione").readByQuery({
      filter: {
        id: { _eq: item.collezione },
      },
      limit: -1,
    });
    appCollection = collezione.data[0].collezione;
  } catch (error) {
    appCollection = "";
  }
  // Localizzazione

  let tclFinal = "";
  let prvcFinal = "";
  let prcdFinal = "";
  try {
    const locIDS = MyItem.data.map((item) => item.localizzazione);

    const locOpera = await directus.items("opera_localizzazione").readByQuery({
      filter: {
        id: { _in: locIDS },
      },
      limit: -1,
    });
    const locFinalId = locOpera.data.map((item) => item.localizzazione_id);
    const localizzazioneFinal = await directus
      .items("localizzazione")
      .readByQuery({
        filter: {
          id: { _in: locFinalId },
        },
        limit: -1,
      });
    for (let index = 0; index < localizzazioneFinal.data.length; index++) {
      prcdFinal += localizzazioneFinal.data[index].prcd + " ";

      const prvcResult = await directus.items("prvc").readByQuery({
        filter: {
          id: { _in: localizzazioneFinal.data[index].prvc },
        },
        limit: -1,
      });
      for (let index = 0; index < prvcResult.data.length; index++) {
        prvcFinal += prvcResult.data[index].prvc + " ";
      }

      const tclResult = await directus.items("tcl").readByQuery({
        filter: {
          id: { _in: localizzazioneFinal.data[index].tcl },
        },
        limit: -1,
      });
      for (let index = 0; index < tclResult.data.length; index++) {
        tclFinal += tclResult.data[index].tcl + " ";
      }
    }
  } catch (error) { }
  // OGTD
  const ogtdData = await directus.items("ogtd").readByQuery({
    filter: {
      id: { _eq: item.ogtd },
    },
    limit: -1,
  });
  let ogtdNames = ogtdData.data[0].ogtd;
  const response2 = await directus.items("touch").updateOne(item.touch, {
    icona: item.icona,
    invn: item.invn,
    autn: autnValues,
    auta: autaValues,
    auts: autsValues,
    collezione: appCollection,
    ogtd: ogtdNames,
    piano: item.piano,
    materia: mtcAPP,
    prcd: prcdFinal,
    prvc: prvcFinal,
    tcl: tclFinal,
    sala: item.sala,
    parete: item.parete,
    sgti: item.sgti,
    specifiche: item.specifiche,
  });
}
async function updateAPP() {
  const Myitem = await directus.items("opera").readByQuery({
    filter: {
      id: { _eq: id.value },
    },
    limit: -1,
  });
  let item = Myitem.data[0];
  const opereMtc = await directus.items("opera_mtc").readByQuery({
    filter: {
      id: { _in: item.mtc },
    },
    limit: -1,
  });
  const idOpereMTC = opereMtc.data.map(({ mtc_id }) => mtc_id);

  const mtcValueApp = await directus.items("mtc").readByQuery({
    filter: {
      id: { _in: idOpereMTC },
    },
    limit: -1,
  });
  let mtcAPP = "";
  for (let index = 0; index < mtcValueApp.data.length; index++) {
    mtcAPP += mtcValueApp.data[index].mtc + " ";
  }

  // TAKE AUTORE INFO
  let autaValues = "";
  let autsID = [];
  let autsValues = "";
  let autnValues = "";

  try {
    const autoreOpera = await directus.items("opera_autore").readByQuery({
      filter: {
        id: { _in: item.autore },
      },
      limit: -1,
    });

    const autoreIds = autoreOpera.data.map((item) => item.autore_id);
    const autores = await directus.items("autore").readByQuery({
      filter: {
        id: { _in: autoreIds },
      },
      limit: -1,
    });

    for (let index = 0; index < autores.data.length; index++) {
      autaValues += autores.data[index].auta + " ";
      autnValues += autores.data[index].autn + " ";

      autsID.push(autores.data[index].auts);
    }
    const autsAutore = await directus.items("auts").readByQuery({
      filter: {
        id: { _in: autsID },
      },
      limit: -1,
    });

    for (let index = 0; index < autsAutore.data.length; index++) {
      autsValues += autsAutore.data[index].auts + " ";
    }
  } catch (error) {
    autaValues = "";
    autsValues = "";
    item.autore = "";
    autnValues = "";
  }
  // COLLEZIONE
  let appCollection;
  try {
    const collezione = await directus.items("collezione").readByQuery({
      filter: {
        id: { _eq: item.collezione },
      },
      limit: -1,
    });
    appCollection = collezione.data[0].collezione;
  } catch (error) {
    appCollection = "";
  }
  // Localizzazione

  let tclFinal = "";
  let prvcFinal = "";
  let prcdFinal = "";
  try {
    const locIDS = MyItem.data.map((item) => item.localizzazione);

    const locOpera = await directus.items("opera_localizzazione").readByQuery({
      filter: {
        id: { _in: locIDS },
      },
      limit: -1,
    });
    const locFinalId = locOpera.data.map((item) => item.localizzazione_id);
    const localizzazioneFinal = await directus
      .items("localizzazione")
      .readByQuery({
        filter: {
          id: { _in: locFinalId },
        },
        limit: -1,
      });
    for (let index = 0; index < localizzazioneFinal.data.length; index++) {
      prcdFinal += localizzazioneFinal.data[index].prcd + " ";

      const prvcResult = await directus.items("prvc").readByQuery({
        filter: {
          id: { _in: localizzazioneFinal.data[index].prvc },
        },
        limit: -1,
      });
      for (let index = 0; index < prvcResult.data.length; index++) {
        prvcFinal += prvcResult.data[index].prvc + " ";
      }

      const tclResult = await directus.items("tcl").readByQuery({
        filter: {
          id: { _in: localizzazioneFinal.data[index].tcl },
        },
        limit: -1,
      });
      for (let index = 0; index < tclResult.data.length; index++) {
        tclFinal += tclResult.data[index].tcl + " ";
      }
    }
  } catch (error) { }
  // OGTD
  const ogtdData = await directus.items("ogtd").readByQuery({
    filter: {
      id: { _eq: item.ogtd },
    },
    limit: -1,
  });
  let ogtdNames = ogtdData.data[0].ogtd;
  const response2 = await directus.items("app").updateOne(item.app, {
    icona: item.icona,
    invn: item.invn,
    autn: autnValues,
    auta: autaValues,
    auts: autsValues,
    collezione: appCollection,
    ogtd: ogtdNames,
    piano: item.piano,
    materia: mtcAPP,
    prcd: prcdFinal,
    prvc: prvcFinal,
    tcl: tclFinal,
    sala: item.sala,
    parete: item.parete,
    sgti: item.sgti,
    specifiche: item.specifiche,
  });
}

// SHOW THE IMAGE OF THE ITEM
async function fetchImage() {
  arrayImagesFiglie.value = [];
  figlia.value = false;

  if (collection.value === "carte_storiche") {
    let route = fields.value.find((field) => field.name === "route");

    if (route?.__value) {
      route = route.__initialValue;
      let images = fields.value.find((field) => field.name === "image");

      if (images?.__value) {
        let imageNames = images.__value
          .match(/\[([^\]]+)\]/g)
          .map((name) => name.replace(/\[|\]/g, "").trim());

        let urlWithoutPort = urlAPI.value.replace(/:\d+/, "");
        imageNames.forEach((imageName) => {
          imageName =
            urlWithoutPort + "/cartografia/public/images/" + route + "/" + imageName;
          arrayImagesFiglie.value.push(imageName);
        });
        const actualCover = fields.value.find(
          (field) => field.name === "cover"
        );
        firstCover.value = actualCover.value;
        imgCover.value = arrayImagesFiglie.value.find((item) =>
          item.endsWith(`/${firstCover.value}`)
        );
      }
    }
  } else if (collection.value == "serie_italiana") {
    let url = import.meta.env.VITE_API_BASE_URL;
    let urlWithoutPort = url.replace(/:\d+/, "");

    const imageName = fields.value.find((field) => field.name === "link");
    image.value =
      urlWithoutPort + "/cartografia/public/images/foto_digitales/" + imageName.value;
    imgSerie.value = image.value
  }
}

function deleteImage(image, index) {
  const fileName = image.split("/").pop();
  console.log("File to delete:", fileName);

  let images = fields.value.find((field) => field.name === "image");
  console.log("Current images value:", images?.__value);

  if (images?.__value) {
    const regex = new RegExp(`\\[?${fileName}\\]?`, "g");

    images.__value = images.__value
      .replace(regex, "")
      .replace(/\s+/g, " ")
      .trim();

    if (images.__value) {
      images.__value = `${images.__value}`;
    } else {
      images.__value = "";
    }

    console.log("Updated images value:", images.__value);
  }

  arrayImagesFiglie.value.splice(index, 1);

  let cover = fields.value.find((field) => field.name === "cover");
  if (cover.value == fileName) {
    cover.value = null;
  }
}
</script>

<style scoped>
/* SAVE AND CANCEL BUTTON */
.buttons {
  display: flex;
  gap: 5px;
}

/* IMAGE */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.succesAlert {
  width: 25%;
  text-align: center;

  position: fixed;
  right: 0;
}

.image-gallery {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
}

.image-container {
  flex: 1 0 auto;
}

.image-container img {
  width: 100%;
  height: auto;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-item img {
  max-width: 100%;
  max-height: 200px;
  width: auto;
  height: auto;
}
</style>
