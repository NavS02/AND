<template>
  <div>
    <div class="container">
      <!-- PAGE CONTENT -->
      <main style="width: 100%">
        <section class="layout">
          <router-view />
        </section>
      </main>
      <div v-if="selectedFlag" style="position: fixed; top: 10px; right: 10px">
        <img
          :src="selectedFlag"
          @click="resetFilters()"
          alt="Selected Flag"
          style="width: 35px; height: auto"
        />
      </div>
      <transition name="popup-fade">
        <div v-if="showPopup" class="popup-container">
          <div class="popup">
            <h3 v-if="!selectedFlag">Seleziona una lingua</h3>
            <div id="flagsLingue" v-if="!selectedFlag">
              <button
                @click="selectLanguage('it')"
                style="
                  width: 60px;
                  height: 45px;
                  background-image: url('/ATELIER.-100x23.png');
                  background-size: cover;
                  background-position: center;
                  border: none;
                  color: white;
                  font-size: 14px;
                  cursor: pointer;
                "
                id="it"
              >
                &nbsp;
              </button>
              <button
                @click="selectLanguage('en')"
                style="
                  width: 60px;
                  height: 45px;
                  background-image: url('/Flag_of_the_United_Kingdom.png');
                  background-size: cover;
                  background-position: center;
                  border: none;
                  color: white;
                  font-size: 14px;
                  cursor: pointer;
                  background-color: rgba(0, 0, 0, 0.5);
                "
                id="en"
              >
                &nbsp;
              </button>
              <button
                @click="selectLanguage('fr')"
                style="
                  width: 60px;
                  height: 45px;
                  background-image: url('/Flag_of_France.svg.webp');
                  background-size: cover;
                  background-position: center;
                  background-color: rgba(0, 0, 0, 0.5);
                  border: none;
                  color: white;
                  font-size: 14px;
                  cursor: pointer;
                "
                id="fr"
              >
                &nbsp;
              </button>
              <button
                @click="selectLanguage('es')"
                style="
                  width: 60px;
                  height: 45px;
                  background-image: url('/bandera_espana.png');
                  background-size: cover;
                  background-position: center;
                  background-color: rgba(0, 0, 0, 0.5);
                  border: none;
                  color: white;
                  font-size: 14px;
                  cursor: pointer;
                "
                id="es"
              >
                &nbsp;
              </button>
            </div>

            <div v-if="selectedFlag" class="selected-flag">
              <img
                :src="selectedFlag"
                alt="Selected Flag"
                style="width: 200px; height: auto"
              />
            </div>
            <br />
            <div class="radio-inputs" v-if="lingua !== null">
              <label @click="selectType('adult')">
                <input class="radio-input" type="radio" name="engine" />
                <span class="radio-tile">
                  <span class="radio-icon">
                    <img
                      src="/noun-headphones-5752841.png"
                      style="width: 40px"
                      alt=""
                      srcset=""
                    />
                  </span>
                  <span class="radio-label" v-if="translatedContent">
                    {{ translatedContent.adultLabelOption }}
                  </span>
                </span>
              </label>

              <label @click="selectType('kid')">
                <input class="radio-input" type="radio" name="engine" />
                <span class="radio-tile">
                  <span class="radio-icon">
                    <font-awesome-icon
                      icon="puzzle-piece"
                      style="color: black"
                    />
                  </span>
                  <span class="radio-label" v-if="translatedContent">
                    {{ translatedContent.kidsLabelOption }}</span
                  >
                </span>
              </label>
            </div>
          </div>
        </div>
      </transition>
      <!-- IF THE USER IS ONLINE SHOW ICONS -->
      <nav class="navigation-menu">
        <button @click="goHome" :class="{ active: route.name === 'home' }">
          <font-awesome-icon icon="house" />
        </button>
        <button
          @click="listOpere"
          :class="{ active: route.name === 'ListOpere' }"
        >
          <font-awesome-icon icon="images" />
        </button>
        <button
          v-if="tipologia == 'adult'"
          @click="goCollocazione"
          :class="{ active: route.name === 'CollocazionePage' }"
        >
          <font-awesome-icon icon="layer-group" />
        </button>

        <button
          v-if="tipologia == 'adult'"
          @click="goAudioGuida"
          :class="{ active: route.name === 'AudioInput' }"
        >
          <img
            src="/number-5-white.png"
            alt=""
            style="width: 22px; height: 22px"
          />
        </button>
        <button v-if="tipologia == 'adult'" @click="changeTipologia()">
          <font-awesome-icon icon="puzzle-piece" style="color: #ffffff" />
        </button>
        <button v-if="tipologia == 'kid'" @click="changeTipologiaAdult()">
          <img
            src="/noun-headphones-5752841.png"
            style="
              width: 30px;
              -webkit-filter: invert(100%);
              filter: invert(100%);
            "
            alt=""
            srcset=""
          />
        </button>
      </nav>
      <!-- IF NOT SHOW TEXT -->
      <!-- <nav class="navigation-menu" v-else>
        <button @click="goHome" :class="{ active: route.name === 'home' }">
          HOME
        </button>
        <button @click="goCollocazione" :class="{ active: route.name === 'CollocazionePage' }">
          MAPPA
        </button>

        <button
          @click="listOpere"
          :class="{ active: route.name === 'ListOpere' }"
        >
          OPERE
        </button>
      </nav> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../API";
import axios from "axios";
const route = useRoute();
const router = useRouter();
const online = ref(true);
const items = ref();
let isLoading = ref(false);
const showPopup = ref(false);
const lingua = ref(null);
const translatedContent = ref(null);
const selectedFlag = ref();
const tipologia = ref(null);
const flagUrls = {
  en: "/Flag_of_the_United_Kingdom.png",
  it: "/ATELIER.-100x23.png",
  fr: "/Flag_of_France.svg.webp",
  es: "/bandera_espana.png",
};
function goHome() {
  router.push({
    name: "home",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });
}
function changeTipologia() {
  tipologia.value = "kid";
  router.push({
    name: "home",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });
}
function changeTipologiaAdult() {
  tipologia.value = "adult";
  router.push({
    name: "home",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });
}
function goAudioGuida() {
  router.push({
    name: "AudioInput",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });
}
function resetFilters() {
  showPopup.value = true;
  selectedFlag.value = null;
  lingua.value = null;
}
function listOpere() {
  isLoading.value = true;

  router.push({
    name: "ListOpere",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}
function goCollocazione() {
  router.push({
    name: "CollocazionePage",
    params: { lingua: lingua.value, tipologia: tipologia.value },
  });
}
function goMap() {
  isLoading.value = true;

  // router.push({ name: "Map", params: { lastRoute: "null" } });

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

async function fetchItems() {
  try {
    let response = await directus.items("app").readByQuery({
      filter: {
        pubblicata: { _eq: true },
      },
      limit: -1,
      sort: "numero",
    });
    items.value = response.data;
    // items.value.forEach((opera) => {
    //   response2.data.forEach((sala) => {
    //     if (opera.salaLabel == sala.id) {
    //       opera.salaLabel = sala.sala_nome;
    //       opera.colore = sala.colore_sala;
    //     }
    //   });
    // });
    localStorage.setItem("listOpere", JSON.stringify(items.value));
  } catch (error) {
    items.value = null;
    online.value = false;
  }
}
function saveImages() {
  let myImages = [
    {
      component: "home",
      source: "/MuseoDiocesano_CMYK.jpg",
      base64src: "",
    },
    {
      component: "home",
      source: "/imageedit_21_3799431085.jpg",
      base64src: "",
    },
    {
      component: "home",
      source: "/Capture.jpg",
      base64src: "",
    },
    {
      component: "map",
      source: "/pianoTerra.png",
      base64src: "",
    },
    {
      component: "map",
      source: "/primo2.png",
      base64src: "",
    },
    {
      component: "map",
      source: "/ipogeo2.png",
      base64src: "",
    },
    {
      component: "credit",
      source: "/logoMilano.png",
      base64src: "",
    },
    {
      component: "credit",
      source: "/logo-fondazionecariplo.png",
      base64src: "",
    },
    {
      component: "credit",
      source: "/logoAND.png",
      base64src: "",
    },
  ];

  let base64Images = myImages.map((image) => {
    let img = new Image();
    img.src = image.source;

    img.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      let base64Source = canvas.toDataURL("image/png");

      image.base64src = base64Source;

      localStorage.setItem("myImages", JSON.stringify(myImages));
    };

    return {
      component: image.component,
      source: "",
    };
  });
}

// saveImages();
async function analytics() {
  const TOKEN_KEY = "analytics_token";
  const COOLDOWN_PERIOD = 3000;

  const now = Date.now();
  const lastExecution = localStorage.getItem(TOKEN_KEY);

  if (lastExecution && now - lastExecution < COOLDOWN_PERIOD) {
    return;
  }

  localStorage.setItem(TOKEN_KEY, now);

  const now2 = new Date();
  const currentYear = now2.getFullYear();
  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];
  const currentMonth = monthNames[now2.getMonth()];

  let response = await directus.items("app_analytics").readByQuery({
    limit: 1,
    filter: {
      year: { _eq: currentYear },
      month: { _eq: currentMonth },
    },
  });
  if (response.data.length < 1) {
    return await directus
      .items("app_analytics")
      .createOne({ month: currentMonth, year: currentYear, visits: 1 });
  } else {
    let id = response.data[0].id;
    let currentVisits = response.data[0].visits;

    return await directus
      .items("app_analytics")
      .updateOne(id, { visits: currentVisits++ });
  }
}
window.addEventListener("offline", () => {
  online.value = false;
});
window.addEventListener("online", () => {
  online.value = true;
});

const selectLanguage = async (lang) => {
  lingua.value = lang;
  selectedFlag.value = flagUrls[lang];
  try {
    const response = await axios.get(`/translations/${lang}.json`);
    translatedContent.value = response.data;
  } catch (error) {
    console.error("Error: file not found", error);
  }
};
function selectType(type) {
  showPopup.value = false;
  tipologia.value = type;
  goHome();
  // router.push({name:"home",props:translatedContent.value})
}
onMounted(async () => {
  showPopup.value = true;

  if (navigator.onLine == false) {
    online.value = navigator.onLine;
  } else {
    // analytics();

    await fetchItems();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var elements = document.getElementsByClassName("mobmenul-container");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
});
</script>

<style scoped>
body {
  margin: 0;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(244, 244, 244, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-svg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 9999;
  max-width: 300px;
}
section {
  /* display: grid; */
  grid-template-rows: max-content auto;
  grid-template-columns: auto auto;
}

.container {
  display: grid;
  grid-template-rows: auto 1fr;
  z-index: 999;
}

main {
  overflow-y: auto;
}

.layout {
  padding-bottom: 60px;
}

.navigation-menu {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 7%;
  background-color: #4d677c;
  display: flex;
  justify-content: space-around;
}

.navigation-menu button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  height: 90%;
}

.navigation-menu button.active {
  border-bottom: 2px solid;
}
@-webkit-keyframes animate-svg-fill-1 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-1 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-1 {
  -webkit-animation: animate-svg-fill-1 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s both;
  animation: animate-svg-fill-1 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s
    both;
}
@-webkit-keyframes animate-svg-fill-2 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-2 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-2 {
  -webkit-animation: animate-svg-fill-2 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s both;
  animation: animate-svg-fill-2 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.1s both;
}
@-webkit-keyframes animate-svg-fill-3 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-3 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-3 {
  -webkit-animation: animate-svg-fill-3 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both;
  animation: animate-svg-fill-3 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.2s both;
}
@-webkit-keyframes animate-svg-fill-4 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-4 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-4 {
  -webkit-animation: animate-svg-fill-4 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.30000000000000004s both;
  animation: animate-svg-fill-4 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.30000000000000004s both;
}
@-webkit-keyframes animate-svg-fill-5 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-5 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-5 {
  -webkit-animation: animate-svg-fill-5 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both;
  animation: animate-svg-fill-5 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.4s both;
}
@-webkit-keyframes animate-svg-fill-6 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-6 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-6 {
  -webkit-animation: animate-svg-fill-6 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.15s both;
  animation: animate-svg-fill-6 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.15s both;
}
@-webkit-keyframes animate-svg-fill-7 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-7 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-7 {
  -webkit-animation: animate-svg-fill-7 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6000000000000001s both;
  animation: animate-svg-fill-7 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.6000000000000001s both;
}
@-webkit-keyframes animate-svg-fill-8 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-8 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-8 {
  -webkit-animation: animate-svg-fill-8 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.7000000000000001s both;
  animation: animate-svg-fill-8 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.7000000000000001s both;
}
@-webkit-keyframes animate-svg-fill-9 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-9 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-9 {
  -webkit-animation: animate-svg-fill-9 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s both;
  animation: animate-svg-fill-9 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.8s both;
}
@-webkit-keyframes animate-svg-fill-10 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-10 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-10 {
  -webkit-animation: animate-svg-fill-10 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.9s both;
  animation: animate-svg-fill-10 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    0.9s both;
}
@-webkit-keyframes animate-svg-fill-11 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
@keyframes animate-svg-fill-11 {
  0% {
    fill: transparent;
  }
  100% {
    fill: rgb(0, 0, 0);
  }
}
.svg-elem-11 {
  -webkit-animation: animate-svg-fill-11 0.15s
    cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s both;
  animation: animate-svg-fill-11 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s
    both;
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: rgb(228, 228, 228);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 600px;
  text-align: center;
}

.popup h3 {
  margin-top: 0;
}

.popup ul {
  list-style-type: none;
  padding: 0;
}

.popup ul li {
  margin-bottom: 10px;
}

.popup button {
  padding: 10px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 50px;
}

.popup button:hover {
  opacity: 0.8;
}

@keyframes popup-fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup-fade-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}

.grid-item {
  background-color: #ccc;
  width: 75vw;
  height: 130px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 350px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.radio-inputs > * {
  margin: 6px;
}

.radio-input:checked + .radio-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: #2260ff;
}

.radio-input:checked + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
  background-color: #2260ff;
  border-color: #2260ff;
}

.radio-input:checked + .radio-tile .radio-icon svg {
  fill: #2260ff;
}

.radio-input:checked + .radio-tile .radio-label {
  color: #2260ff;
}

.radio-input:focus + .radio-tile {
  border-color: #2260ff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.radio-input:focus + .radio-tile:before {
  transform: scale(1);
  opacity: 1;
}

.radio-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  min-height: 80px;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;
}

.radio-tile:before {
  content: "";
  position: absolute;
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  border-radius: 50%;
  top: 0.25rem;
  left: 0.25rem;
  opacity: 0;
  transform: scale(0);
  transition: 0.25s ease;
}

.radio-tile:hover {
  border-color: #2260ff;
}

.radio-tile:hover:before {
  transform: scale(1);
  opacity: 1;
}

.radio-icon svg {
  width: 2rem;
  height: 2rem;
  fill: #494949;
}

.radio-label {
  color: #707070;
  transition: 0.375s ease;
  text-align: center;
  font-size: 13px;
}

.radio-input {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
