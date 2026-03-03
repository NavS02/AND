<template>
  <div>
    <div class="text-center headerTitle">
      <h1>LE OPERE</h1>
    </div>
  </div>
  <br />
  <Splide
    :options="{ rewind: true, arrows: false }"
    aria-label="My Favorite Images"
    @splide:dragged="changeChiesa"
    @splide:mounted="changeChiesa"
    @splide:pagination:updated="changeChiesa"
  >
    <SplideSlide v-for="(chiesa, index) in chiese" :key="index">
      <div id="slideContainer">
        <div id="titolo_e_info">
          <h1 id="titoloChiese">{{ chiesa.nome }}</h1>
          <h2 id="infoChiese">{{ chiesa.comune }}</h2>
        </div>
        <!-- <div class="imgSlide"> -->
        <!-- <img
                :src="urlAPI + '/assets/' + chiesa.icona"
                style="height: 250px;width:auto"
              /> -->

        <!-- </div> -->
      </div>
    </SplideSlide>
  </Splide>
  <!-- CAROUSEL  WITH  CHIESE -->
  <div>
    <div class="map-container2"><div id="map2"></div></div>

    <!-- CARDS WITH THE RESULTS -->
    <div class="row" style="margin-top: 0; margin-bottom: 1%">
      <div class="text-center" style="margin-top: 10%" v-if="!loaded">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      <div v-else>
        <div v-for="(item, index) in filteredItems" :key="index">
          <div class="col-12">
            <div class="card-container mb-3">
              <div class="card h-100" @click="showItem(item)">
                <div class="card-body">
                  <div class="d-flex align-items-left">
                    <div class="image-frame">
                      <img
                        :src="item.icona"
                        style="
                          max-width: 300px;
                          max-height: 320px;
                          padding: 10px;
                        "
                        class="img-left"
                      />
                    </div>
                    <div class="text-right" style="padding: 20px">
                      <h4 style="width: 550px; max-width: 550px">
                        {{ item.autore }}
                       
                      </h4>
                      <h5 style="width: 550px; max-width: 550px">
                        {{ item.titolo
                        }}
                      </h5>

                      <ul style="width: 540px; max-width: 540px">
                        <li><strong>Materia: </strong>{{ item.materia }}</li>
                        <!-- <li v-if="item.collezione">
                          <strong>Collezione: </strong>{{ item.collezione }}
                        </li> -->

                        <li>
    <strong>Collocazione in museo: </strong>
    <template v-if="item.piano !== undefined">{{ item.piano }}</template>
    <template v-if="item.piano !== undefined && item.sala">, </template>
    <template v-if="item.sala !== undefined">{{ item.sala }}</template>
    <template v-if="(item.sala !== undefined && item.parete) || ((item.piano !== undefined && item.parete) && item.sala === undefined)">, </template>
    <template v-if="item.parete !== undefined">{{ item.parete }}</template>
    <template v-if="(item.parete !== undefined && item.specifiche) || ((item.parete !== undefined && item.specifiche) && item.parete === undefined)">, </template>
    <template v-if="item.specifiche !== undefined">{{ item.specifiche }}</template>
</li>

                      </ul>
                    </div>
                    <div class="text-right description" style="padding: 20px">
                      <div v-if="item.descrizione">
                        <div v-html="item.truncatedDescription"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="footer" style="height: 65px; overflow-x: hidden">
    <div class="footer-right">
      <button
        type="button"
        class="btn btn-warning btn-mappa"
        @click="goMap()"
        style="background-color: var(--default-color-06)"
      >
        MAPPA
      </button>
    </div>
  </footer>
  <div id="myModal" class="modal">
    <div class="modal-dialog">
      <!-- Modal content will be inserted dynamically by the showItem function -->
    </div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { directus } from "../API";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { computed } from "vue";
import "@splidejs/vue-splide/css/skyblue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const selectedObra = ref(null);
const chiese = ref();
const items = ref();
const actChiesa = ref();
const truncatedDescription = ref();
const activeSlideIndex = ref(0);
const loaded = ref(true);
let url = ref("");
let urlAPI = ref(import.meta.env.VITE_API_BASE_URL);
const filteredItems = ref([]);
const map = ref(null);

/*
const shouldShowItem = computed(() => {
  return (item) => actChiesa.value && item.chiesa === actChiesa.value.id;
});

// Method to handle the start of a slide transition
function handleSlideStart() {
  loaded.value = false; // Set loaded to false when starting slide transition
}

// Method to handle the end of a slide transition
function handleSlideEnd() {
  loaded.value = true; // Set loaded to true when slide transition ends
}
*/

onMounted(async () => {
  try {
    // SOME TOUCHSCREwEN QUERIES
    const response = await directus.items("touch").readByQuery({
      filter: {
        pubblicata: { _eq: true },
      },
      sort: "data",
      limit: -1,
    });
    const response2 = await directus.items("touch_comune").readByQuery({});
    const response3 = await directus.items("touch_tipologia").readByQuery({});
    const response4 = await directus.items("touch_chiesa").readByQuery({sort: 'comune'});
    
    // SAVE ALL THE CHISESE NAMES IN ONE VARIABLE
    chiese.value = response4.data;

    chiese.value.forEach((element) => {
      element.opereLength = 0;
    });
    console.log(chiese.value)

    let url = import.meta.env.VITE_API_BASE_URL;
    items.value = response.data;

    items.value.forEach((item) => {
      // SET IMAGE URL OF EACH ITEM
      item.icona = url + "/assets/" + item.icona;

      // SET COMUNE NAME
      const matchingComune = response2.data.find(
        (comuneItem) => comuneItem.id === item.comune
      );
      if (matchingComune) {
        item.comune = matchingComune.comune;
      }

      // SET TIPOLOGIA NAME
      const matchingTipologia = response3.data.find(
        (tipologiaItem) => tipologiaItem.id === item.tipologia
      );
      if (matchingTipologia) {
        item.tipologia = matchingTipologia.tipologia;
      }
      response4.data.forEach((chiesa) => {
        if (item.chiesa == chiesa.id) {
          item.chiesaNome = chiesa.nome;
          chiesa.opereLength++;
        }
      });
      if (item.descrizione) {
        let description = item.descrizione;
        if (description.length > 300) {
          const lastSpaceIndex = description.lastIndexOf(" ", 800);
          truncatedDescription.value =
            description.substring(0, lastSpaceIndex) + "...";
          item.truncatedDescription = truncatedDescription.value;
        } else {
          truncatedDescription.value = description;
          item.truncatedDescription = truncatedDescription.value;
        }
      }
    });
    const chieseFiltered = chiese.value.filter(object => object.opereLength > 0);
    chiese.value=chieseFiltered
  } catch (error) {
    console.error(error);
  }
});

// RETURN TO THE MAP
function goMap() {
  router.push({ name: "home" });
}

//POPUP
function showItem(item) {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialog");

  modalDialog.innerHTML += `
  <div class="item-container" style="padding: 1%;width:100%;height:900px !important;">
    <div class="text-center" style="width: 100%">
      <h5
        style="
          font-weight: bold;
          font-family: Montserrat;
          color: #00458d;
          background-color: white;
          margin: -10px;
        "
      >
    
      </h5>
      <div class="text-right closeBtn" style="text-align: right">
          <button
            id="chiudi" 
            type="button"
            class="btn btn-danger"
            style="
              font-size: 20px;
              font-weight: 600;
              padding: 10px 20px;
              z-index: 9999 !important;
              background-color:var(--default-color-06)
            "
            
          >
            Chiudi
          </button>
        </div>
    </div>
    <br />
    <h4 style="font-weight:600;font-family: Montserrat;">${item.autore ? item.autore : ""}</h4>
       
    <h5>  ${
      item.titolo ? item.titolo : ""
    } </h5>

    <br />
  <div class="row" style="">
  <div class="col-6 text-center" >
 <img src="${item.icona}" alt="${
    item.titolo
  }" style="max-width: 90%; max-height: 700px" />
  </div>
  <div class="col-6" >
 <ul style="font-size:16px">
      <li><strong>Materia e tecnica: </strong>${item.materia ? item.materia : ""}</li>
        ${
          item.provenienza
            ? `<li><strong>Provenienza: </strong>${item.provenienza}</li>`
            : ""
        }
     <li>
  <strong>Collocazione in museo:  </strong>
  ${item.piano ? item.piano : ""}
  ${item.piano && (item.sala || item.parete || item.specifiche) ? ", " : ""}
  ${item.sala ? item.sala : ""}
  ${item.sala && (item.parete || item.specifiche) ? ", " : ""}
  ${item.parete ? item.parete : ""}
  ${item.parete && item.specifiche ? ", " : ""}
  ${item.specifiche ? item.specifiche : ""}
</li>
    </ul>
   <div style="padding-left:10%;padding-right:10%"><hr></div>
     <div
      class="description-container"
      style="overflow-y: auto; max-height: 600px"
    >
      ${item.descrizione ? item.descrizione : ""}
    </div>
  </div>
</div>
   
  </div>
`;
  var btnCerrar = document.getElementById("chiudi");
  btnCerrar.addEventListener("click", closeModal);
  myModal.style.display = "block";
}

// CLOSE POPUP
function closeModal() {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialog");

  modalDialog.innerHTML = "";
  myModal.style.display = "none";
}

// DYNAMIC CHANGE AND DETECT CURRENT CHIESA
let debounceTimeout;

function changeChiesa() {
  loaded.value = false;
console.log(chiese.value)
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    filteredItems.value = [];


    const elementosLi = document.querySelectorAll(
      "li.splide__slide.is-active.is-visible"
    );
    let titleValue = null;

    elementosLi.forEach((li) => {
      const h1 = li.querySelector('h1[id="titoloChiese"]');
      if (h1) {
        titleValue = h1.textContent;
      }
    });
    let searchedChiesa
    try {
      
  
     searchedChiesa = chiese.value.find(
      (objeto) => objeto.nome === titleValue
    );
     
    actChiesa.value = searchedChiesa;
    if (searchedChiesa) {
    } else {
      actChiesa.value = null;
    }

    items.value.forEach((item) => {
      if (item.chiesa === actChiesa.value.id) {
        filteredItems.value.push(item);
      }
    });
     } catch (error) {
      console.log(error)
    }
    var coordinates = [];
    coordinates.push(actChiesa.value.mappa.coordinates[1]);
    coordinates.push(actChiesa.value.mappa.coordinates[0]);
    if (map.value == null) {
      map.value = L.map("map2", {
        zoomControl: false,
      }).setView(coordinates, 12);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 17,
          minZoom: 10,
        }
      ).addTo(map.value);
    } else {
      map.value.remove();
      map.value = null;
      map.value = L.map("map2", {
        zoomControl: false,
      }).setView(coordinates, 12);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 17,
          minZoom: 10,
        }
      ).addTo(map.value);
    }

    const marker = L.marker(coordinates, {
      icon: L.icon({
        iconUrl: "/marker-icon-2x.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
    }).addTo(map.value);

    map.value.scrollWheelZoom.disable();
    map.value.dragging.disable();
    map.value.touchZoom.disable();
    map.value.doubleClickZoom.disable();
    map.value.boxZoom.disable();
    map.value.keyboard.disable();

    var attributionControl = document.querySelector(
      ".leaflet-control-attribution"
    );

    if (attributionControl) {
      attributionControl.parentNode.removeChild(attributionControl);
    }

    
    loaded.value = true;
  }, 600);
}





(function() {
    const refreshTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    let timeout;

    function resetTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          window.location.href = "http://milanotouch.ambientinarratividigitali.it";
        }, refreshTime);
    }

    window.addEventListener('DOMContentLoaded', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);
})();
</script>

<style scoped>
:root {
  --default-color-06: rgba(18, 81, 132, 0.6);
  --default-color-1: rgba(18, 81, 132, 1);

  --vc-pgn-width: 8px;
  --vc-pgn-height: 8px;
}
#map {
  width: 200px;
  height: 200px;
}
.map-container {
  flex: 1;
  position: relative;
  z-index: 0;
}
* {
  cursor: none;
} 
.headerTitle {
  color: white;
  background-color: var(--default-color-06);
}
.page-container {
  font-family: Montserrat;
  overflow-x: hidden;
}
.page-container::-webkit-scrollbar {
  display: none;
}
.pagination-wrapper {
  text-align: center;
  margin-top: 10px;
}

.pagination-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #b2b2b2;
  margin: 0 5px;
  cursor: none;
}

.pagination-dot.active {
  background-color: #1a1a1a;
}

.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e9e9e958;
}

.modal-content {
  max-width: 30%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #e9e9e9;
  padding: 20px;
  border-radius: 20px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.page-container {
  display: flex;
  flex-direction: column;
}

#map2 {
  width: 100% !important;
  height: 300px !important;
}
.map-container2 {
  flex: 1;
  position: relative;
  z-index: 0;
  justify-content: center;
}
.d-flex {
  align-content: center;
  align-items: center;
}

.text-right {
  margin-left: 20px;
}

.description {
  max-width: 35%;
  font-size: 16px;
  margin-left: 40px;
}

h1 {
  font-family: Montserrat;
  font-weight: 600;
}

h2,
h3,
h4,
h5 {
  font-family: Montserrat;
}

h4 {
  font-weight: 600;
}

#slideContainer {
  margin-bottom: 45px;
}
/* .imgSlide {
  position: relative;
  left: -170px;
  max-height: 250px;
  width: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
} */
#titolo_e_info {
  text-align: center;
}
#titoloChiese {
  font-family: Montserrat;
  font-weight: 500;
}

#infoChiese {
  font-weight: 400;
}

.card-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-frame {
  width: 320px;

  text-align: center;
  justify-content: center;
}

.footer-right {
  margin-left: 1%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.footer {
  background-color: #f0f0f0;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 1000;
}
* {
  overflow-x: hidden;
}

.btn-mappa {
  padding: 10px;
  width: 100px !important;
  background: rgba(106, 61, 3, 0.7);
  color: white;
  border: none;
  overflow-y: hidden;
  font-weight: 600;
}

.carousel__pagination-button::after {
  width: var(--vc-pgn-width) !important;
  height: 8px !important;
  height: 8px;
  border-radius: 50%;
}
svg {
  width: 300px;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
