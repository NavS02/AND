<template>
  <main id="main" class="main">
    <div v-if="loaded">
      <div class="mb-2">
        <ItemsNavigation :collection="collection" :id="id" />
      </div>
      <h2 class="text-center">Scheda n. {{ id }}</h2>
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

// watch the route and update data based on the collection param
watch(route, async () => {
    if(!collection.value) return
    // retrieve the settings
    const itemSettings = settings[collection.value]
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields()

    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
        const data = await store.collections.fetchOne(collection.value, id.value, true)
        for (const field of collectionFields) {
            await field.setInitialValue(data?.[field.name])
        }
        fields.value = collectionFields
         loaded.value = true;

      fecthImage();
    }, 0);
}, {immediate: true, deep: true})

async function onCancelClicked() {
    const confirmed = await modal.confirm({title:'Confirma', body:'Sei sicuro di voler lasciare questa pagina?'})
    if(!confirmed) return
    goToList()
}
function onSaveClicked(data) {
    save(data())
}
function goToList() {
    router.push({name: 'listArc', params: { collection: collection.value }})
}
async function save(data) {
    try {
        const response = await directus.items(collection.value).updateOne(id.value, data)
        goToList()
    } catch (error) {
        console.error(error)
        toaster.toast({title:'Error', body: error}, 'top right')
    }
}
async function fecthImage() {
  url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
  const imgresponse = await directus.items("opera").readByQuery({
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
</style>