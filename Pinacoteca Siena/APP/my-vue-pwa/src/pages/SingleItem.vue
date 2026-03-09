<template>
  <main style="width: 100%; overflow-x: hidden">
    <div class="text-left">
      <img src="" alt="" style="width: 250px; margin-top: 5px" />
      <hr />
    </div>
    <div style="text-align: left">
      <button
        @click="returnLastPage()"
        style="background-color: #00448db8; color: white; border-radius: 10%"
      >
        <font-awesome-icon icon="left-long" />
      </button>
    </div>
    <div class="text-center" style="margin-top: 10px">
      <img
        :src="icona"
        alt=""
        srcset=""
        class="icona"
        @click="toggleImageSize"
        :class="{ 'expanded-image': isExpanded }"
      />
    </div>
    <br />
    <div v-if="myItem">
      <div v-show="isExpanded" class="overlay">
        <div class="image-container">
          <img :src="icona" alt="" class="expanded-image" />
          <button
            v-if="lingua == 'en'"
            type="button"
            class="btn"
            style="background-color: #00458d; color: white; margin: 10px"
            @click="toggleImageSize"
          >
            Close
          </button>
          <button
            v-if="lingua == 'fr'"
            type="button"
            class="btn"
            style="background-color: #00458d; color: white; margin: 10px"
            @click="toggleImageSize"
          >
            Fermer
          </button>
          <button
            v-if="lingua == 'es'"
            type="button"
            class="btn"
            style="background-color: #00458d; color: white; margin: 10px"
            @click="toggleImageSize"
          >
            Cerrar
          </button>
        </div>
      </div>
      <h4 v-if="lingua == 'it'">{{ autore }}</h4>
      <h4 v-if="lingua == 'en'">{{ autore_eng }}</h4>
      <h4 v-if="lingua == 'fr'">{{ autore_fra }}</h4>
      <h4 v-if="lingua == 'es'">{{ autore_spa }}</h4>
      <h4 style="font-style: italic" v-if="lingua == 'it'">{{ titolo }}</h4>
      <h4 style="font-style: italic" v-if="lingua == 'en'">{{ titolo_eng }}</h4>
      <h4 style="font-style: italic" v-if="lingua == 'fr'">{{ titolo_fra }}</h4>
      <h4 style="font-style: italic" v-if="lingua == 'es'">{{ titolo_spa }}</h4>
      <br />
      <div style="font-size: 24px">
        <span style="font-weight: 700; margin-right: 4px">{{ numero }}</span>
        <font-awesome-icon icon="headphones" />
      </div>
      <audio
        :src="audio"
        controls
        id="test"
        v-if="audio !== url + 'assets/null'"
      ></audio>

      <hr />
      <ul style="text-align: left" v-if="opera">
        <li v-if="materia !== null && lingua == 'it'">
          <strong>Materia: </strong>{{ materia }}
        </li>
        <li v-if="materia_eng !== null && lingua == 'en'">
          <strong>Subject: </strong>{{ materia_eng }}
        </li>
        <li v-if="materia_fra !== null && lingua == 'fr'">
          <strong>Matière: </strong>{{ materia_fra }}
        </li>
        <li v-if="materia_spa  && lingua == 'es'">
          <strong>Materia: </strong>{{ materia_spa }}
        </li>
        <!-- <li><strong>Collezione: </strong>{{ collezione }}</li> -->

        <li v-if="provenienza !== null && lingua == 'it'">
          <strong>Provenienza: </strong>{{ provenienza }}
        </li>
        <li v-if="data !== null && lingua == 'it'">
          <strong>Data: </strong>{{ data }}
        </li>
        <li v-if="data_eng !== null && lingua == 'en'">
          <strong>Date: </strong>{{ data_eng }}
        </li>
        <li v-if="data_fra !== null && lingua == 'fr'">
          <strong>Date: </strong>{{ data_fra }}
        </li>
        <li v-if="data_spa !== null && lingua == 'es'">
          <strong>Fecha: </strong>{{ data_spa }}
        </li>
      </ul>
      <hr v-if="opera" />
      <div
        style="text-align: left"
        v-html="descrizione"
        v-if="lingua == 'it'"
      ></div>
      <div
        style="text-align: left"
        v-html="descrizione_eng"
        v-if="lingua == 'en'"
      ></div>
      <div
        style="text-align: left"
        v-html="descrizione_fra"
        v-if="lingua == 'fr'"
      ></div>
      <div
        style="text-align: left"
        v-html="descrizione_spa"
        v-if="lingua == 'es'"
      ></div>
    </div>
  </main>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  lingua: { type: String, default: "" },
  tipologia: { type: String, default: null },
  info: { type: String, default: null },
});
const isExpanded = ref(false);
const myItem = ref();
const { info } = toRefs(props);
const { lingua } = toRefs(props);
const { tipologia } = toRefs(props);
const { lastRoute } = toRefs(props);
const photo = ref("");

const id = ref();
const autore = ref();
const autore_eng = ref();
const autore_fra = ref();
const autore_spa = ref();
const titolo = ref();
const titolo_fra = ref();
const titolo_eng = ref();
const titolo_spa = ref();
const data = ref();
const data_eng = ref();
const data_fra = ref();
const data_spa = ref();
const materia = ref();
const materia_eng = ref();
const materia_fra = ref();
const materia_spa = ref();
const collezione = ref();
const piano = ref();
const piano_eng = ref();
const piano_fra = ref();
const piano_spa = ref();
const sala = ref();
const sala_eng = ref();
const sala_fra = ref();
const sala_spa = ref();
const parete = ref();
const specifiche = ref();
const descrizione = ref();
const descrizione_eng = ref();
const descrizione_fra = ref();
const descrizione_spa = ref();
const icona = ref();
const provenienza = ref();
const ubiMuseo = ref();
const collocazioneSala = ref();
const url = ref();
const numero = ref();
const itemColor = ref();
const audio = ref();
const audio_eng = ref();
const audio_fra = ref();
const audio_spa = ref();
const opera = ref();
async function fetchItems() {
  myItem.value = JSON.parse(info.value);

  if (
    typeof myItem.value === "object" &&
    myItem.value !== null &&
    myItem.value.hasOwnProperty("id")
  ) {
    id.value = myItem.value.id;
    titolo.value = myItem.value.titolo;
    titolo_eng.value = myItem.value.titolo_eng;
    titolo_fra.value = myItem.value.titolo_fra;
    titolo_spa.value = myItem.value.titolo_spa;
    autore.value = myItem.value.autore;
    autore_eng.value = myItem.value.autore_eng;
    autore_fra.value = myItem.value.autore_fra;
    autore_spa.value = myItem.value.autore_spa;
    data.value = myItem.value.data;
    data_eng.value = myItem.value.data_eng;
    data_fra.value = myItem.value.data_fra;
    data_spa.value = myItem.value.data_spa;
    materia.value = myItem.value.materia;
    materia_eng.value = myItem.value.materia_eng;
    materia_fra.value = myItem.value.materia_fra;
    materia_spa.value = myItem.value.materia_spa;
    collezione.value = myItem.value.collezione;
    provenienza.value = myItem.value.provenienza;
    ubiMuseo.value = myItem.value.salaLabel;
    piano.value = myItem.value.piano;
    piano_eng.value = myItem.value.piano_eng;
    piano_fra.value = myItem.value.piano_fra;
    piano_spa.value = myItem.value.piano_spa;
    collocazioneSala.value = myItem.value.collocazione_sala;
    sala.value = myItem.value.sala;
    sala_eng.value = myItem.value.sala_eng;
    sala_fra.value = myItem.value.sala_fra;
    sala_spa.value = myItem.value.sala_spa;
    parete.value = myItem.value.parete;
    specifiche.value = myItem.value.specifiche;
    descrizione.value = myItem.value.descrizione;
    descrizione_eng.value = myItem.value.descrizione_eng;
    descrizione_fra.value = myItem.value.descrizione_fra;
    descrizione_spa.value = myItem.value.descrizione_spa;
    url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
    collocazioneSala.value = url.value + "assets/" + collocazioneSala.value;
    icona.value = url.value + "assets/" + myItem.value.icona;
    numero.value = myItem.value.numero;
    opera.value = myItem.value.opera;
    if (tipologia.value == "kid") {
      if (lingua.value == "it") {
        audio.value = url.value + "assets/" + myItem.value.audio_ragazzi;
      } else if (lingua.value == "en") {
        audio.value = url.value + "assets/" + myItem.value.audio_ragazzi_eng;
      } else if (lingua.value == "fr") {
        audio.value = url.value + "assets/" + myItem.value.audio_ragazzi_fra;
      } else if (lingua.value == "es") {
        audio.value = url.value + "assets/" + myItem.value.audio_ragazzi_spa;
      }
    } else {
      if (lingua.value == "it") {
        audio.value = url.value + "assets/" + myItem.value.audio_adulti;
      } else if (lingua.value == "en") {
        audio.value = url.value + "assets/" + myItem.value.audio_adulti_eng;
      } else if (lingua.value == "fr") {
        audio.value = url.value + "assets/" + myItem.value.audio_adulti_fra;
      } else if (lingua.value == "es") {
        audio.value = url.value + "assets/" + myItem.value.audio_adulti_spa;
      }
    }

    itemColor.value = myItem.value.colore;
    //   fetch(collocazioneSala.value)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       // CODE64 IMAGE
    //       const reader = new FileReader();
    //       reader.readAsDataURL(blob);
    //       reader.onloadend = () => {
    //         const base64data = reader.result; //code64 the url
    //         collocazioneSala.value = base64data;
    //       };
    //     });

    try {
    } catch (error) {}
  } else {
  }
}
onMounted(async () => {
  await fetchItems();
});
function toggleImageSize() {
  isExpanded.value = !isExpanded.value;
}
function returnLastPage() {
  router.back();
}
</script>
<style scoped>
.icona {
  max-width: 250px;
  max-height: 250px;
}

.expanded-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.overlay img {
  max-width: 100%;
  max-height: 100%;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn-danger {
  margin-top: 10px;
  background-color: #00448db8;
}
.accordion-button:not(.collapsed) {
  background-color: white;
}
</style>
