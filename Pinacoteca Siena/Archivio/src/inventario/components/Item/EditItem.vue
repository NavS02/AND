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
        Scheda n. {{ id }} salvata!
      </div>
      <h4 class="text-center" v-if="collection !== 'directus_users' && collection !== 'inventario'">Scheda n. {{ id }}</h4>
      <div v-if="collection =='inventario'">
        <h4 class="text-center">
          {{codesData}}
        
        
        </h4>
        <h6 class="text-center">Scheda n. {{ id }}</h6>
      </div>
      <img :src="url" alt="" class="center" style="width: 15%" id="my-image" />
      <br />
      <hr />
      <!-- FORM WITH THE DATA -->
      <Form :fields="fields">
        <template v-slot:footer="{ data }">
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancel</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
            <!-- <button
              class="btn btn-sm btn-warning"
              @click="onEditOpera(id)"
              v-if="collection === 'app' || collection === 'touch'"
            >
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Opera</span>
            </button> -->
          </div>
        </template>
      </Form>
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
import Loader from "../common/Loader.vue";
const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("/not-found.svg");

const props = defineProps({
  collection: { type: String, default: "" },
  id: { type: String, default: null },
});
const { id, collection } = toRefs(props);

const route = useRoute();
const router = useRouter();
const image = ref();
const loaded = ref(false);
const fields = ref([]); // fields settings
const showAlert = ref(false);
const item=ref(null)
const codesData=ref(null)
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
      item.value=data
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;
      loaded.value = true;
      fecthImage();
      codesData.value=formattedItem()
    }, 0);
  },
  { immediate: true, deep: true }
);
function formattedItem() {
      let parts = [];

      if (item.value.inventario_1973 && item.value.inventario_1973 !== '') {
        parts.push(item.value.inventario_1973);
      }
      if (item.value.IBS && item.value.IBS !== '') {
        parts.push(item.value.IBS);
      }
      if (item.value.invn && item.value.invn !== '') {
        parts.push(item.value.invn);
      }

      return parts.length > 0 ? parts.join('/') : null;
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
  router.push({ name: "searchArc", params: { piano: "all" } });
}

async function onEditOpera(id) {
  alert(id)
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
  let response = await directus.items("inventario").readByQuery(query);


  console.log(response.data)
  router
    .push({
      name: "editItemArc",
      params: { id: response.data[0].id, collection: "inventario" },
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
    if (collection.value == "inventario") {
      updateAPP();
      updateTOUCH();
      updateWeb();

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
async function updateTOUCH(){
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
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: item.value.id },
    },
    limit: 1,
  });
  let itemSec = Myitem.data[0];



    const opereMtc = await directus.items("inventario_inv_materia").readByQuery({
      filter: {
        inventario_id: { _in: itemSec.id },
      },
      limit: -1,
    });
    const idOpereMTC = opereMtc.data.map(({ inv_materia_id }) => inv_materia_id);

    const mtcValueApp = await directus.items("inv_materia").readByQuery({
      filter: {
        id: { _in: idOpereMTC },
      },
      limit: -1,
    });

    const inv_collocazione=await directus.items("inv_collocazione").readByQuery({
      filter: {
        id: { _in: item.value.inv_collocazione },
      },
      limit: -1,
    });
    let mtcAPP = "";
    for (let index = 0; index < mtcValueApp.data.length; index++) {
      mtcAPP += mtcValueApp.data[index].inv_materia + " ";
    }
  const response2 = await directus.items("app").updateOne(item.app, {
    icona: itemSec.icona,
      invn: itemSec.invn,
      autn: item.value.autore,
      inv_oggetto: item.value.inv_oggetto,
      piano: itemSec.inv_piano,
      materia: mtcAPP,
      sala: itemSec.inv_sala,
      parete: itemSec.parete,
      sgti: item.value.soggetto,
      descrizione: itemSec.descrizione,
      specifiche: itemSec.ubi_specifica,
      id_opera: itemSec.id,
  });
}
async function updateWeb() {
  var mtcAPP=""
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: item.value.id },
    },
    limit: 1,
  });
  let itemSec = Myitem.data[0];


try {
  const opereMtc = await directus.items("inventario_inv_materia").readByQuery({
      filter: {
        inventario_id: { _in: itemSec.id },
      },
      limit: -1,
    });
    const idOpereMTC = opereMtc.data.map(({ inv_materia_id }) => inv_materia_id);

    const mtcValueApp = await directus.items("inv_materia").readByQuery({
      filter: {
        id: { _in: idOpereMTC },
      },
      limit: -1,
    });

   

     mtcAPP = "";
    for (let index = 0; index < mtcValueApp.data.length; index++) {
      mtcAPP += mtcValueApp.data[index].inv_materia + " ";
    }
  } catch (error) {
    mtcAPP=""
  console.log('Error fetching materia (WEB)'+error)
}



try {
      const oggettoValueApp = await directus.items("inv_oggetto").readByQuery({
        filter: {
          id: { _eq: itemSec.inv_oggetto },
        },
        limit: -1,
      });
      itemSec.inv_oggetto = oggettoValueApp.data[0].inv_oggetto;
    } catch (error) {
      itemSec.inv_oggetto = "";
      console.log("Error fetching ogtd (WEB)")
    }

  const response2 = await directus.items("web").updateOne(itemSec.web, {
    icona: itemSec.icona,
      autn: itemSec.autore,
      ogtd: itemSec.inv_oggetto,
      piano: itemSec.inv_piano,
      materia: mtcAPP,
      sala: itemSec.inv_sala,
      parete: itemSec.parete,
      sgti: itemSec.soggetto,
      
      specifiche: itemSec.ubi_specifica,
      id_opera: itemSec.id,
  });
}
// SHOW THE IMAGE OF THE ITEM
async function fecthImage() {
  url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
  const imgresponse = await directus.items(collection.value).readByQuery({
    filter: {
      id: {
        _eq: id.value,
      },
    },
  });
  image.value = imgresponse.data[0].icona; //takes the id of the image
  if (image.value != null) {
    const imageUrl = url.value + "/assets/" + image.value; // generates url
    const imageElement = document.getElementById("my-image");


  } else {
    const imageElement = document.getElementById("my-image");
    imageElement.src = null;
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
</style>
