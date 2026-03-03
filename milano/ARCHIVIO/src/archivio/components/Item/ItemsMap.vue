<script setup>
// DIRECTUS AND VUE IMPORTS
import { ref } from "vue";
import { directus } from "../../API";
import { useRoute, useRouter } from "vue-router";

// MAPBOX COMPONENTS
import { StoreLocator } from "@studiometa/vue-mapbox-gl";
import "@studiometa/vue-mapbox-gl/index.css";
// IMPORT CSS
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
const route = useRoute();
const router = useRouter();
const items = ref([]);
// URL OF THE CONNECTION
const url = ref(import.meta.env.VITE_API_BASE_URL);

fetchData();

async function fetchData() {
  // IF ITS PUBLIC,SHOW IT
  const response = await directus.items("touch_chiesa").readByQuery({
    limit: -1,
    
  });
  console.log(response)
  // FOR EACH PUBLIC ITEM TAKE THEIR COORDS
  response.data.forEach((element) => {
    element.lng = element.mappa.coordinates[0];
    element.lat = element.mappa.coordinates[1];
    items.value.push(element);
  });
}
function onEditOperaClicked(idOpera) {
  router.push({
    name: "editItemArc",
    params: { id: idOpera, collection: "opera" },
  });
}
function onEditTouchClicked(idTouch) {
  router.push({
    name: "editItemArc",
    params: { id: idTouch, collection: "touch" },
  });
}
</script>
<template>
  <main class="main" id="main">
    <!-- ITEMS => ITEMS THAT THE USER WILL SEE
         ACCES-TOKEN => TOKEN OF THE USER
         MAPBOXMAP=> CONFIG OF THE MAP (STYLE,CENTER,ZOOM,MAP TYPE) -->
    <StoreLocator
      :items="items"
      access-token="pk.eyJ1IjoibmF2czAyIiwiYSI6ImNsa2kxM2lybDA2Yncza21qb2YxeW5ndnIifQ.8ld3MBwHYeIBZjobdOE_5A"
      :mapboxMap="{
        mapStyle: 'mapbox://styles/mapbox/streets-v11',
        style: 'height: 800px;width:100%;',
        center: [9.19, 45.4642],
        zoom: 10,
      }"
    >
      <!-- PANEL WHERE IS ITEMS'S INFO -->
      <template #panel="{ close, item }">
        <div class="card">
          <div class="card-header">
            <h1>{{ item.titolo }}</h1>
            <h4>{{ item.indirizzo }}</h4>
          </div>
          <div class="card-body" id="cardContent">
            <img
              :src="url + '/assets/' + item.icona"
              alt=""
              class="center"
              style="width: 15%"
              id="my-image"
            />
            <div v-html="item.descrizione"></div>
          </div>
          <div class="card-footer text-center">
            <button
              type="button"
              class="btn btn-warning m-1"
              @click="onEditOperaClicked(item.id_opera)"
            >
              Edita opera
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="onEditTouchClicked(item.id)"
            >
              Edita touchscreen
            </button>
          </div>
        </div>

        <button @click="close" class="btn btn-outline-danger">Chiude</button>
      </template>
      <!-- AFTER THE LIST OF ITEMS  -->
      <template #after-list="{ filteredItems }">
        <p v-if="filteredItems.length <= 0">Nessun risultato.</p>
      </template>
    </StoreLocator>
  </main>
</template>
<style scoped>
/* CENTER IMAGE  */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
