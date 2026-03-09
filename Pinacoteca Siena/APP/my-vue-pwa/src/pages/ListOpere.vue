<template>
  <div>
    <div class="text-left">
      <img src="" alt="" style="width: 250px; margin-top: 5px" />
      <hr />
    </div>
    <br />
    <div class="container">
      <div v-for="(item, index) in items" :key="index">
        <div>
          <div
            class="card custom-card"
            :style="{ backgroundColor: !item.opera ? '#e8c52b' : 'white' }"
            style="padding-top: 10px !important"
          >
            <div
              class="card-header"
              style="
                text-align: right;
                width: 100%;
                padding: 0 !important;
                margin: 0;
                background-color: transparent;
                border-bottom: 0;
                color: gold;
              "
              v-if="item.capolavoro"
            >
              <font-awesome-icon icon="star" />
            </div>
            <div
              class="card-body"
              style="margin: -15px !important"
              @click="goToOpere(item)"
            >
              <div class="row">
                <div class="col-6" style="padding: 0">
                  <div class="custom-div text-center">
                    <img
                      :src="
                        'https://pinacotecasiena.vidimus.it/assets/' +
                        item.icona
                      "
                      alt=""
                      srcset=""
                      style="object-fit: contain"
                      :id="'image' + index"
                    />
                  </div>
                </div>
                <div class="text-right col-6">
                  <span v-if="lingua == 'it'" style="font-size: 16px">
                    {{ item.titolo }}
                  </span>
                  <span v-if="lingua == 'en'" style="font-size: 16px">
                    {{ item.titolo_eng }}
                  </span>
                  <span v-if="lingua == 'fr'" style="font-size: 16px">
                    {{ item.titolo_fra }}
                  </span>
                  <span v-if="lingua == 'es'" style="font-size: 16px">
                    {{ item.titolo_spa }}
                  </span>
                  <br />
                  <br />
                  <div class="text-center" v-if="tipologia !== 'kid'">
                    <span v-if="lingua == 'it'" style="font-size: 15px">{{
                      item.autore
                    }}</span>

                    <span
                      v-else-if="
                        lingua == 'en' &&
                        (item.autore_eng == null || item.autore_eng == '')
                      "
                      style="font-size: 15px"
                      >{{ item.autore }}</span
                    >
                    <span v-else-if="lingua == 'en'" style="font-size: 15px">{{
                      item.autore_eng
                    }}</span>

                    <span
                      v-else-if="
                        lingua == 'fr' &&
                        (item.autore_fra == null || item.autore_fra == '')
                      "
                      style="font-size: 15px"
                      >{{ item.autore }}</span
                    >
                    <span v-else-if="lingua == 'fr'" style="font-size: 15px">{{
                      item.autore_fra
                    }}</span>

                    <span
                      v-else-if="
                        lingua == 'es' &&
                        (item.autore_spa == null || item.autore_spa == '')
                      "
                      style="font-size: 15px"
                      >{{ item.autore }}</span
                    >
                    <span v-else-if="lingua == 'es'" style="font-size: 15px">{{
                      item.autore_spa
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="lingua == 'it'"
              class="card-footer"
              @click="playAudio(item, 'it')"
              :style="{
                marginBottom: '-30px',
                backgroundColor: 'transparent',
                color: item.activeNumber ? 'red' : 'black',
                fontWeight: item.activeNumber ? 'bold' : '500',
              }"
              :id="'footerInfo-' + item.numero"
            >
              <span style="margin-right: 4px">{{ item.numero }}</span>
              <font-awesome-icon icon="headphones" />
            </div>

            <div
              v-if="lingua == 'en'"
              class="card-footer"
              @click="playAudio(item, 'en')"
              :style="{
                marginBottom: '-30px',
                backgroundColor: 'transparent',
                color: item.activeNumber ? 'red' : 'black',
                fontWeight: item.activeNumber ? 'bold' : '500',
              }"
              :id="'footerInfo-' + item.numero"
            >
              <span style="margin-right: 4px">{{ item.numero }}</span>
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'adult' && item.audio_adulti_eng !== null"
              />
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'kid' && item.audio_ragazzi_eng !== null"
              />
            </div>

            <div
              v-if="lingua == 'fr'"
              class="card-footer"
              @click="playAudio(item, 'fr')"
              :style="{
                marginBottom: '-30px',
                backgroundColor: 'transparent',
                color: item.activeNumber ? 'red' : 'black',
                fontWeight: item.activeNumber ? 'bold' : '500',
              }"
              :id="'footerInfo-' + item.numero"
            >
              <span style="margin-right: 4px">{{ item.numero }}</span>
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'adult' && item.audio_adulti_fra !== null"
              />
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'kid' && item.audio_ragazzi_fra !== null"
              />
            </div>

               <div
              v-if="lingua == 'es'"
              class="card-footer"
              @click="playAudio(item, 'es')"
              :style="{
                marginBottom: '-30px',
                backgroundColor: 'transparent',
                color: item.activeNumber ? 'red' : 'black',
                fontWeight: item.activeNumber ? 'bold' : '500',
              }"
              :id="'footerInfo-' + item.numero"
            >
              <span style="margin-right: 4px">{{ item.numero }}</span>
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'adult' && item.audio_adulti_spa !== null"
              />
              <font-awesome-icon
                icon="headphones"
                v-if="tipologia == 'kid' && item.audio_ragazzi_spa !== null"
              />
            </div>
          </div>
          <br />
        </div>
      </div>
      <footer id="footerContent">
        <audio src="" id="footerAudioControl" controls autoplay></audio>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

const data = ref(JSON.parse(localStorage.getItem("listOpere")));
const route = useRoute();
const router = useRouter();
const items = ref();
const imageurl = ref("");
const online = ref(true);

const props = defineProps({
  lingua: { type: String, default: "" },
  tipologia: { type: String, default: null },
});
const { lingua, tipologia } = toRefs(props);
function goToOpere(item) {
  router.push({
    name: "SingleItem",
    params: {
      lingua: lingua.value,
      tipologia: tipologia.value,
      info: item.JSON,
    },
  });
}
async function fetchItems() {
  if (tipologia.value == "kid") {
    let filteredItems = data.value.filter(
      (item) => item.tipo_visita && item.tipo_visita.includes("ragazzi")
    );
    items.value = filteredItems;
  } else {
    let filteredItems = data.value.filter(
      (item) => item.tipo_visita && item.tipo_visita.includes("adulti")
    );
    items.value = filteredItems;
  }

  try {
    for (let index = 0; index < items.value.length; index++) {
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }
  } catch (error) {
    console.log(error);
  }
}
function playAudio(item, lang) {
  items.value.forEach((element) => {
    element.activeNumber = false;
  });
  item.activeNumber = true;

  document.getElementById("footerAudioControl").src = null;
  document.getElementById("footerContent").style.display = "none";
  let audio;
  let url;

  if (lang == "it") {
    if (tipologia.value == "adult" && item.audio_adulti !== null) {
      url = import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_adulti;
      audio = new Audio(url);
    } else if (tipologia.value == "kid" && item.audio_ragazzi !== null) {
      url = import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_ragazzi;

      audio = new Audio(url);
    }
  } else if (lang == "en") {
    if (tipologia.value == "adult" && item.audio_adulti_eng !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_adulti_eng;
      audio = new Audio(url);
    } else if (tipologia.value == "kid" && item.audio_ragazzi_eng !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_ragazzi_eng;

      audio = new Audio(url);
    }
  } else if (lang == "fr") {
    if (tipologia.value == "adult" && item.audio_adulti_fra !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_adulti_fra;
      audio = new Audio(url);
    } else if (tipologia.value == "kid" && item.audio_ragazzi_fra !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_ragazzi_fra;

      audio = new Audio(url);
    }
  } else if (lang == "es") {
    if (tipologia.value == "adult" && item.audio_adulti_spa !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_adulti_spa;
      audio = new Audio(url);
    } else if (tipologia.value == "kid" && item.audio_ragazzi_spa !== null) {
      url =
        import.meta.env.VITE_API_BASE_URL + "assets/" + item.audio_ragazzi_spa;

      audio = new Audio(url);
    }
  }

  if (audio !== undefined) {
    document.getElementById("footerAudioControl").src = url;
    document.getElementById("footerContent").style.display = "block";
  }
}

function fetchImages() {
  let myImages = JSON.parse(localStorage.getItem("myImages"));

  if (myImages) {
    myImages.forEach((element) => {
      let imageInCode = document.querySelector(`img[src="${element.source}"]`);
      if (imageInCode) {
        imageInCode.src = element.base64src;
      }
    });
  } else {
    console.log("No saved images.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
});
onMounted(async () => {
  await fetchItems();
});
</script>
<style scoped>
footer {
  display: none;
  position: fixed;
  bottom: 7%;
  left: 0;
  width: 100%;
  background-color: #fbe0bf;
  text-align: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.custom-div {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-div img {
  max-width: 100%;
  max-height: 100%;
}
.custom-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 15px;
  width: 100%;
}

.custom-title {
  font-size: 12px;
  text-align: right;
  /* color:#e8c52b */
}
</style>
