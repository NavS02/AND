<template>
  <main id="main" class="main">
    <div v-if="loaded">
      <!-- NAVIGATION PANEL -->
      <div class="mb-2">
        <ItemsNavigation :collection="collection" :id="id" />
      </div>
      <!-- SAVE ALERT! -->
      <div
        class="succesAlert alert alert-success"
        role="alert"
        v-if="showAlert"
      >
        Foto n. {{ id }} salvata!
      </div>
      <h2 class="text-center" v-if="collection !== 'directus_users'">
        Foto n. {{ id }}
      </h2>
      <img
        :src="image"
        alt=""
        class="center"
        style="max-width: 60%"
        :id="index"
      />
      <br />
      <h6 class="text-center">{{ image }}</h6>
      <br />
      <hr />
      <div v-if="collection == 'Foto'"></div>
      <!-- FORM WITH THE DATA -->
      <Form :fields="fields">
        <template v-slot:footer="{ data }">
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancela</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
            <button
              class="btn btn-sm btn-warning"
              @click="onEditOpera(id)"
              v-if="collection === 'app' || collection === 'touch'"
            >
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Foto</span>
            </button>
          </div>
        </template>
      </Form>

      <br />
      <br />
      <div v-if="madre">
        <hr />

        <h4>RVEL - Riferimento verticale (MADRE/FIGLIA)</h4>

        <div class="text-center">
          <h4>{{ title }}</h4>
        </div>
        <img
          :src="image"
          alt=""
          class="center"
          style="max-width: 80%"
          :id="index"
        />

        <br />
        <div class="swiper-container" style="width: 100%">
          <swiper
            :slides-per-view="5"
            :space-between="0"
            :pagination="{clickable: true,}"
            class="mySwiper"
            style="width: 100%"
            :modules="modules"
            

          >
            <swiper-slide
              v-for="(item, index) in arrayImagesFiglie"
              :key="index"
              style="width: 20%"
            >
              <router-link
                class="nav-link"
                :to="{
                  name: 'editItemArc',
                  params: { id: item.id, collection: 'Foto' },
                }"
              >
                <img
                  :src="item.image"
                  :id="index"
                  alt=""
                  style="max-width: 100%"
                />
              </router-link>
            </swiper-slide>
          </swiper>
          <br>
        </div>
      </div>
      <div v-else-if="figlia">
        <router-link
          class="nav-link"
          :to="{
            name: 'editItemArc',
            params: { id: fotoMadre.id, collection: 'Foto' },
          }"
        >
          <img
            :src="fotoMadre.foto"
            alt=""
            class="center"
            style="max-width: 80%"
            :id="index"
          />
        </router-link>
      </div>
      <br />
    </div>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "/node_modules/swiper/swiper-bundle.min.css";
import Loader from "../common/Loader.vue";

import { Pagination } from 'swiper/modules';

const modules=ref([Pagination])
const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("/not-found.svg");
const image = ref();

const props = defineProps({
  collection: { type: String, default: "" },
  id: { type: String, default: null },
});
const { id, collection } = toRefs(props);

const route = useRoute();
const router = useRouter();
const loaded = ref(false);
const fields = ref([]); // fields settings
const showAlert = ref(false);
const imageArrays = ref([]);
const arrayImagesFiglie = ref();
const madre = ref();
const title = ref();
const fileValue = ref(null);
const selectedFile = ref(null);
const oldImageName = ref();
const fotoMadre = ref();
const figlia = ref(false);

// watch the route and update data based on the collection param
watch(
  route,
  async () => {
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
      fecthImage();
    }, 0);
  },
  { immediate: true, deep: true }
);

watch(
  fields,
  (newVal, oldVal) => {
    try {
      if (oldVal !== null && oldVal.length > 1) {
        const nomeImageNew = newVal.find((field) => field.name === "image");

        if (oldImageName.value !== nomeImageNew.value) {
          oldImageName.value = nomeImageNew.value;
          fecthImage();
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  { deep: true }
);
// watch(fields, (newVal, oldVal) => {
//   try {
//     if (collection.value === 'Foto') {
//       const ogctField = newVal.find(field => field.name === 'ogct');
//       if (ogctField) {
//         const invMadre = newVal.find(field => field.name === 'invn_madre');
//         const figlieField = newVal.find(field => field.name === 'foto_figlie');
//         const rvelField = newVal.find(field => field.name === 'RVEL');
//         const invnField = newVal.find(field => field.name === 'invn');

//         if (ogctField.value !== oldVal.find(field => field.name === 'ogct')?.value) {
//           if (ogctField.value === 1) {
//             invMadre.edit = "true";
//             rvelField.edit = "true";
//             figlieField.edit = 'false';
//           } else if (ogctField.value === 0) {
//             invMadre.edit = "false";
//             rvelField.value = 0;
//             rvelField.edit = "false";
//             figlieField.edit = 'true';
//             invMadre.value = invnField.value;
//           } else {
//             figlieField.edit = 'false';
//             rvelField.edit = 'false';
//             rvelField.value = null;
//             invMadre.edit = "false";
//             invMadre.value = null;
//           }
//         }
//       } else {
//         console.log('OGCT not found');
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }, { deep: true });
// function onFileChange(event) {
//       selectedFile.value = event.target.files[0];
//     }
//     async function  uploadImage() {
//       if (!selectedFile.value ) {
//         alert('Please select a file to upload.');
//         return;
//       }
//        // Create a FormData object
//        const formData = new FormData();
//       formData.append('image', selectedFile.value );

//       try {
//         // Send the image to the server using the fetch API
//         const response = await fetch('http://195.231.23.205/fotografico/images/preview/0001/', {
//           method: 'POST',
//           mode: 'cors',
//           body: formData
//         });

//         if (response.ok) {
//           const result = await response.json();
//           alert('Image uploaded successfully!');
//           console.log(result);
//         } else {
//           alert('Failed to upload the image.');
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         alert('An error occurred while uploading the image.');
//       }
//     }

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
  router.push({ name: "searchArc", params: { piano: "all" } });
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
  } catch (error) {}
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
  } catch (error) {}
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
async function fecthImage() {
  arrayImagesFiglie.value = [];
  madre.value = false;
  figlia.value = false;
  if (collection.value == "Foto") {
    const Myitem = await directus.items("Foto").readByQuery({
      filter: {
        id: { _eq: id.value },
      },
      limit: -1,
    });
    let item = Myitem.data[0];
    title.value = item.sglt;
    let url = import.meta.env.VITE_API_BASE_URL;
    let urlWithoutPort = url.replace(/:\d+/, "");

    const imageName = fields.value.find((field) => field.name === "image");
    fileValue.value = imageName.value;
    oldImageName.value = imageName.value;
    image.value =
      urlWithoutPort + "/fotografico/images/preview/0001/" + imageName.value;

    if (item.ogct == "0" && item.foto_figlie.length >= 1) {
      const Myitem = await directus.items("Foto_Foto").readByQuery({
        filter: {
          id: {
            _in: item.foto_figlie,
          },
        },
      });
      const arrayIds = Myitem.data.map((object) => object.related_Foto_id);

      const Myitem2 = await directus.items("Foto").readByQuery({
        filter: {
          id: {
            _in: arrayIds,
          },
        },
        sort: "rvel",
      });
      Myitem2.data.forEach((element) => {
        element.image =
          urlWithoutPort + "/fotografico/images/preview/0001/" + element.image;
      });
      arrayImagesFiglie.value = Myitem2.data;
      madre.value = true;
      figlia.value = false;


      setTimeout(() => {
  const swiperPagination = document.querySelector('.swiper-pagination');

  if (swiperPagination) {
    const lineBreak = document.createElement('br');
    
    swiperPagination.parentNode.insertBefore(lineBreak, swiperPagination);
  }
}, 2000); 

      
 } else {
      const Myitem = await directus.items("Foto").readByQuery({
        filter: {
          invn: {
            _eq: item.invn_madre,
          },
        },
      });
      fotoMadre.value = {
        foto:
          urlWithoutPort + "/fotografico/images/preview/0001/" + Myitem.data[0].image,
        id: Myitem.data[0].id,
      };
      madre.value = false;

      figlia.value = true;
    }
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

</style>
