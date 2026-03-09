<template>
  <main id="main" class="main">
    <div v-if="loaded">
      <div class="mb-2">
        <ItemsNavigation :collection="collection" :id="id" />
      </div>
      <div
        class="succesAlert alert alert-success"
        role="alert"
        v-if="showAlert"
      >
        Scheda n. {{ id }} salvata!
      </div>
      <h2 class="text-center">{{myTitle}}</h2>
      <img :src="url" alt="" class="center" style="width: 15%" id="my-image" />
      <br />
      <hr />
      <Form :fields="fields">
        <template v-slot:footer="{ data, fields }">
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancel</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
            <button
              class="btn btn-sm btn-warning"
              @click="onEditOpera(id)"
              v-if="collection === 'app'"
            >
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Opera</span>
            </button>
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
const url = ref("");

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
const myTitle=ref()
// watch the route and update data based on the collection param
watch(
  route,
  async () => {
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    console.log(collection.value)
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields();
    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
      const data = await store.collections.fetchOne(
        collection.value,
        id.value,
        true
      );
      console.log(data)
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;
      loaded.value = true;

      fetchTitle()
      // fecthImage();
    }, 0);
  },
  { immediate: true, deep: true }
);
async function fetchTitle(){
  if(collection.value=='biblioteca'){


    const title = fields.value.find((field) => field.name === "bib_titolo");
  const inventario = fields.value.find((field) => field.name === "bib_inventario");
myTitle.value=inventario.initialValue + " - "+title.initialValue + ' ('+id.value+')'

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
  if(collection.value=='biblioteca'){
    router.push({ name: "searchBib", params: { piano: "all" } });

  }else{
  router.push({ name: "listBib", collection: collection.value });
  }
}

async function onEditOpera(id) {
  let query = {
    limit: 1,
    filter: {
      app: {
        _eq: id,
      },
    },
  };

  // let response = await directus.items("Foto").readByQuery(query);
  router
    .push({
      name: "editItemFot",
      params: { id: response.data[0].id, collection: "Foto" },
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
    // ALERT
    showAlert.value = true;
 setTimeout(function() { showAlert.value = false;}, 3000)

  } catch (error) {
    console.error(error);
    toaster.toast({ title: "Error", body: error }, "top right");
  }
}
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

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // CODE64 IMAGE
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result; //code64 the url
          imageElement.src = base64data;
        };
      });
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
