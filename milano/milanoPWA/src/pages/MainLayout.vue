<template>
  <div>
    <div class="container">
      <!-- PAGE CONTENT -->
      <main>
        <section class="layout">
          <router-view />
        </section>
      </main>
      <!-- IF THE USER IS ONLINE SHOW ICONS -->
      <nav class="navigation-menu" v-if="online">
        <button @click="goHome" :class="{ active: route.name === 'home' }">
          <i class="bi bi-house"></i>
        </button>
        <button @click="goMap" :class="{ active: route.name === 'Map' }">
          <i class="bi bi-map"></i>
        </button>

        <button
          @click="listOpere"
          :class="{ active: route.name === 'ListOpere' }"
        >
          <i class="bi bi-brush"></i>
        </button>
      </nav>
      <!-- IF NOT SHOW TEXT -->
      <nav class="navigation-menu" v-else>
        <button @click="goHome" :class="{ active: route.name === 'home' }">
          HOME
        </button>
        <button @click="goMap" :class="{ active: route.name === 'Map' }">
          MAPPA
        </button>

        <button
          @click="listOpere"
          :class="{ active: route.name === 'ListOpere' }"
        >
          OPERE
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../API";

const route = useRoute();
const router = useRouter();
const online = ref(true);
const items = ref();
let isLoading = ref(false);

function goHome() {
  router.push({ name: "home" });
}

function listOpere() {
  isLoading.value = true;

  router.push({ name: "ListOpere" });

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}
function goMap() {
  isLoading.value = true;

  router.push({ name: "Map", params: { lastRoute: "null" } });

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
    });
    let response2 = await directus.items("app_salaLabel").readByQuery({
      limit: -1,
    });
    items.value = response.data;
    items.value.forEach((opera) => {
      response2.data.forEach((sala) => {
        if (opera.salaLabel == sala.id) {
          opera.salaLabel = sala.sala_nome;
          opera.colore = sala.colore_sala;
        }
      });
    });
  } catch (error) {
    items.value = data.value;
    online.value = false;
  }

  try {
    let url = import.meta.env.VITE_API_BASE_URL;
    for (let index = 0; index < items.value.length; index++) {
      if (items.value[index].icona !== null) {
        items.value[index].icona = url + "/assets/" + items.value[index].icona;
      }
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }
  } catch (error) {
    console.log(error);
  }
  localStorage.setItem("listOpere", JSON.stringify(items.value));
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
    const TOKEN_KEY = 'analytics_token';
    const COOLDOWN_PERIOD = 3000; 

    const now = Date.now();
    const lastExecution = localStorage.getItem(TOKEN_KEY);

    if (lastExecution && (now - lastExecution) < COOLDOWN_PERIOD) {
        return;
    }

    localStorage.setItem(TOKEN_KEY, now);

    const now2 = new Date();
    const currentYear = now2.getFullYear();
const monthNames = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];
const currentMonth = monthNames[now2.getMonth()];


let response = await directus.items("app_analytics").readByQuery({
      limit: 1,
      filter:{
        year:{_eq:currentYear},
        month:{_eq:currentMonth}
      }
    });
    if(response.data.length <1){
      return await directus.items("app_analytics").createOne({month:currentMonth,year:currentYear,visits:1})
    }else{
      let id=response.data[0].id
      let currentVisits=response.data[0].visits
     console.log(currentVisits++)

      return await directus.items("app_analytics").updateOne(id, {visits:currentVisits++})

    }
}
window.addEventListener("offline", () => {
  online.value = false;
});
window.addEventListener("online", () => {
  online.value = true;
});
onMounted(async () => {
  if (navigator.onLine == false) {
    online.value = navigator.onLine;
  } else {
    // analytics();

    // await fetchItems();
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
  background-color: #00458d;
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
</style>
