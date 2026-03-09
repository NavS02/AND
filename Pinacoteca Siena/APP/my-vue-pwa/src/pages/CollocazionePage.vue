<template>
  <div>
    <br />
    <div
      style="position: absolute; top: 0%; right: 0; left: 0; text-align: center"
    >
      <div>
        <img
          src="/logoSiena.png"
          alt=""
          style="max-width: 65%; height: auto; margin: 0 auto"
        />
      </div>
    </div>
    <br />
    <br />
    <br />
    <div
      class="container"
      style="
        width: 100% !important;
        height: 75%;
        overflow-y: auto;
        position: absolute;
        top: 25%;
        left: 0;
      "
    >
      <br />
      <div class="accordion" id="accordionExample">
        <div
          v-for="(piano, pianoIndex) in piani"
          :key="pianoIndex"
          class="accordion-item"
        >
          <h2 class="accordion-header" :id="'heading' + pianoIndex">
            <button
              class="accordion-button collapsed"
              type="button"
              :data-bs-toggle="'collapse'"
              :data-bs-target="'#collapse' + pianoIndex"
              aria-expanded="false"
              :aria-controls="'collapse' + pianoIndex"
              @click="clearData()"
            >
              <span v-if="lingua == 'it'">
                {{ piano.piano }}
              </span>
              <span v-if="lingua == 'en'">
                {{ piani_eng[pianoIndex].piano }}
              </span>
              <span v-if="lingua == 'fr'">
                {{ piani_fr[pianoIndex].piano }}
              </span>
              <span v-if="lingua == 'es'">
                {{ piani_spa[pianoIndex].piano }}
              </span>
            </button>
          </h2>
          <div
            :class="['accordion-collapse', 'collapse']"
            :id="'collapse' + pianoIndex"
            :aria-labelledby="'heading' + pianoIndex"
            :data-bs-parent="'#accordionExample'"
          >
            <div
              class="accordion-body"
              style="margin: -10px !important"
              id="accDadBody"
            >
              <div
                v-for="(sala, salaIndex) in piano.sale"
                :key="salaIndex"
                class="accordion"
              >
                <div class="accordion-item">
                  <h2
                    :class="['accordion-header']"
                    :id="'heading' + pianoIndex + salaIndex"
                  >
                    <button
                      class="accordion-button"
                      type="button"
                      :data-bs-toggle="'collapse'"
                      :data-bs-target="'#collapse' + pianoIndex + salaIndex"
                      :aria-expanded="false"
                      :aria-controls="'collapse' + pianoIndex + salaIndex"
                      @click="loadItemsSala(sala)"
                      style="text-transform: capitalize"
                    >
                      <span v-if="lingua == 'it'"> {{ sala }} </span>
                      <span v-if="lingua == 'en'">
                        {{ piani_eng[pianoIndex].sale[salaIndex] }}
                      </span>
                      <span v-if="lingua == 'fr'">
                        {{ piani_fr[pianoIndex].sale[salaIndex] }}
                      </span>
                      <span v-if="lingua == 'es'">
                        {{ piani_spa[pianoIndex].sale[salaIndex] }}
                      </span>
                      <img src="/90-ring.svg" alt="" srcset="" v-if="!loaded" />
                    </button>
                  </h2>
                  <div
                    :class="['accordion-collapse', 'collapse']"
                    :id="'collapse' + pianoIndex + salaIndex"
                    :aria-labelledby="'heading' + pianoIndex + salaIndex"
                    :data-bs-parent="'#collapse' + pianoIndex"
                  >
                    <div
                      class="accordion-body"
                      style="margin: -10px !important"
                    >
                      <div v-if="itemsFiltered !== null && loaded">
                        <div
                          v-for="(item, index) in itemsFiltered"
                          :key="index"
                        >
                          <div
                            class="card custom-card"
                            style="padding-top: 10px !important"
                            :style="{
                              backgroundColor: !item.opera
                                ? '#e8c52b'
                                : 'white',
                            }"
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
                                      :src="urlApi + 'assets/' + item.icona"
                                      alt=""
                                      srcset=""
                                      style="
                                        object-fit: contain;
                                        max-width: 80%;
                                      "
                                    />
                                  </div>
                                </div>
                                <div class="text-right col-6">
                                  <span
                                    v-if="lingua == 'it'"
                                    style="font-size: 16px"
                                  >
                                    {{ item.titolo }}
                                  </span>
                                  <span
                                    v-if="lingua == 'en'"
                                    style="font-size: 16px"
                                  >
                                    {{ item.titolo_eng }}
                                  </span>
                                  <span
                                    v-if="lingua == 'fr'"
                                    style="font-size: 16px"
                                  >
                                    {{ item.titolo_fra }}
                                  </span>

                                  <span
                                    v-if="lingua == 'es'"
                                    style="font-size: 16px"
                                  >
                                    {{ item.titolo_spa }}
                                  </span>
                                  <br />
                                  <br />
                                  <div
                                    class="text-center"
                                    v-if="tipologia !== 'kid'"
                                  >
                                    <span
                                      v-if="lingua == 'it'"
                                      style="font-size: 15px"
                                      >{{ item.autore }}</span
                                    >

                                    <span
                                      v-else-if="
                                        lingua == 'en' &&
                                        (item.autore_eng == null ||
                                          item.autore_eng == '')
                                      "
                                      style="font-size: 15px"
                                      >{{ item.autore }}</span
                                    >
                                    <span
                                      v-else-if="lingua == 'en'"
                                      style="font-size: 15px"
                                      >{{ item.autore_eng }}</span
                                    >

                                    <span
                                      v-else-if="
                                        lingua == 'fr' &&
                                        (item.autore_fra == null ||
                                          item.autore_fra == '')
                                      "
                                      style="font-size: 15px"
                                      >{{ item.autore }}</span
                                    >
                                    <span
                                      v-else-if="lingua == 'fr'"
                                      style="font-size: 15px"
                                      >{{ item.autore_fra }}</span
                                    >

                                    <span
                                      v-else-if="
                                        lingua == 'es' &&
                                        (item.autore_spa == null ||
                                          item.autore_spa == '')
                                      "
                                      style="font-size: 15px"
                                      >{{ item.autore }}</span
                                    >
                                    <span
                                      v-else-if="lingua == 'es'"
                                      style="font-size: 15px"
                                      >{{ item.autore_spa }}</span
                                    >
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
                              <span style="margin-right: 4px">{{
                                item.numero
                              }}</span>
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
                              <span style="margin-right: 4px">{{
                                item.numero
                              }}</span>
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'adult' &&
                                  item.audio_adulti_eng !== null
                                "
                              />
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'kid' &&
                                  item.audio_ragazzi_eng !== null
                                "
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
                              <span style="margin-right: 4px">{{
                                item.numero
                              }}</span>
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'adult' &&
                                  item.audio_adulti_fra !== null
                                "
                              />
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'kid' &&
                                  item.audio_ragazzi_fra !== null
                                "
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
                              <span style="margin-right: 4px">{{
                                item.numero
                              }}</span>
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'adult' &&
                                  item.audio_adulti_spa !== null
                                "
                              />
                              <font-awesome-icon
                                icon="headphones"
                                v-if="
                                  tipologia == 'kid' &&
                                  item.audio_ragazzi_spa !== null
                                "
                              />
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                      <div v-else class="text-center">
                        <h4>Nessuna opera trovata</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer id="footerContent">
          <audio src="" id="footerAudioControl" controls autoplay></audio>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";
import { useRoute, useRouter } from "vue-router";

function cleanString(input) {
  return input.replace(/\s/g, "").toLowerCase();
}
const props = defineProps({
  lingua: { type: String, default: "" },
  tipologia: { type: String, default: null },
});
const route = useRoute();
const router = useRouter();
const { lingua } = toRefs(props);
const { tipologia } = toRefs(props);
const itemsData = ref(JSON.parse(localStorage.getItem("listOpere")));
for (let index = 0; index < itemsData.value.length; index++) {
  itemsData.value[index].JSON = JSON.stringify(itemsData.value[index]);
}
const urlApi = ref(import.meta.env.VITE_API_BASE_URL);

const piani = ref([
  {
    piano: "Cortile",
    sale: ["Benvenuti in Pinacoteca", "Esposizione temporanea"],
  },
  {
    piano: "Secondo Piano",
    sale: [
      "sala 1",
      "sala 2",
      "sala 3",
      "sala 4",
      "sala 5",
      "sala 7",
      "sala 8",
      "sala 11",
      "sala 12",
      "sala 13",
      "sala 14",
      "sala 16",
      "sala 17",
    ],
  },
  {
    piano: "Primo Piano",
    sale: [
      "sala 20",
      "sala 22",
      "sala 23",
      "loggiato",
      "sala sculture",
      "sala 27",
      "sala 29",
      "sala 30",
      "sala 31",
      "sala 32",
      "sala 33",
      "sala 36",
      "sala 37",
    ],
  },
]);

const piani_eng = ref([
  {
    piano: "Courtyard",
    sale: ["Welcome to Pinacoteca", "Temporary exhibition"],
  },
  {
    piano: "Second floor",
    sale: [
      "room 1",
      "room 2",
      "room 3",
      "room 4",
      "room 5",
      "room 7",
      "room 8",
      "room 11",
      "room 12",
      "room 13",
      "room 14",
      "room 16",
      "room 17",
    ],
  },
  {
    piano: "First floor",
    sale: [
      "room 20",
      "room 22",
      "room 23",
      "loggia",
      "sculpture room",
      "room 27",
      "room 29",
      "room 30",
      "room 31",
      "room 32",
      "room 33",
      "room 36",
      "room 37",
    ],
  },
]);
const piani_fr = ref([
  {
    piano: "Cour",
    sale: ["Bienvenue à la Pinacothèque", "exposition temporaire"],
  },
  {
    piano: "Deuxième étage",
    sale: [
      "salle 1",
      "salle 2",
      "salle 3",
      "salle 4",
      "salle 5",
      "salle 7",
      "salle 8",
      "salle 11",
      "salle 12",
      "salle 13",
      "salle 14",
      "salle 16",
      "salle 17",
    ],
  },
  {
    piano: "Premier étage",
    sale: [
      "salle 20",
      "salle 22",
      "salle 23",
      "loggia",
      "salle des sculptures",
      "salle 27",
      "salle 29",
      "salle 30",
      "salle 31",
      "salle 32",
      "salle 33",
      "salle 36",
      "salle 37",
    ],
  },
]);
const piani_spa = ref([
  {
    piano: "Patio",
    sale: ["Bienvenidos a la pinacoteca", "Exposición temporal"],
  },
  {
    piano: "Segundo piso",
    sale: [
      "sala 1",
      "sala 2",
      "sala 3",
      "sala 4",
      "sala 5",
      "sala 7",
      "sala 8",
      "sala 11",
      "sala 12",
      "sala 13",
      "sala 14",
      "sala 16",
      "sala 17",
    ],
  },
  {
    piano: "Primer piso",
    sale: [
      "sala 20",
      "sala 22",
      "sala 23",
      "logia",
      "sala de esculturas",
      "sala 27",
      "sala 29",
      "sala 30",
      "sala 31",
      "sala 32",
      "sala 33",
      "sala 36",
      "sala 37",
    ],
  },
]);
const items = ref(itemsData);
const itemsFiltered = ref(null);
const loaded = ref(true);
function loadItemsSala(sala) {
  loaded.value = false;
  itemsFiltered.value = null;
  if (tipologia.value == "kid") {
    itemsFiltered.value = items.value.filter(
      (item) => sala === item.sala && item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemsFiltered.value = items.value.filter(
      (item) => sala === item.sala && item.tipo_visita.includes("adulti")
    );
  }
  if (itemsFiltered.value.length <= 0) {
    itemsFiltered.value = null;
  }

  loaded.value = true;
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
  }else if (lang == "es") {
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
function clearData() {
  itemsFiltered.value = null;
  var accordions = document.querySelectorAll(
    "#accDadBody .accordion-collapse.show"
  );
  accordions.forEach(function (collapse) {
    collapse.classList.remove("show");
    var button =
      collapse.previousElementSibling.querySelector(".accordion-button");
    button.classList.add("collapsed");
    button.setAttribute("aria-expanded", "false");
  });
}
</script>
<style scoped>
.custom-div {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-div img {
  max-width: 100px;
  max-height: 100px;
}

.custom-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-title {
  font-size: 12px;
  text-align: right;
}
footer {
  display: none;
  position: fixed;
  bottom: 7%;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
