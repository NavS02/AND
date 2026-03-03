<template>
  <main style="width: 100%; overflow-x: hidden">
    <div class="text-left">
      <img
        src="/MuseoDiocesano_CMYK.jpg"
        alt=""
        style="width: 250px; margin-top: 5px"
      />
      <hr />
    </div>
    <button
      @click="returnLastPage()"
      style="background-color: #00448db8; color: white; border-radius: 10%"
    >
      <font-awesome-icon icon="left-long" />
    </button>
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
    <div v-if="item">
      <div v-show="isExpanded" class="overlay">
        <div class="image-container">
          <img :src="icona" alt="" class="expanded-image" />
          <button
            type="button"
            class="btn"
            style="background-color: #00458d; color: white; margin: 10px"
            @click="toggleImageSize"
          >
            Chiudi
          </button>
        </div>
      </div>
      <h4 style="font-style: italic">{{ autore }}</h4>
      <h4>{{ titolo }}</h4>
      <!-- <hr /> -->
      <div class="accordion" id="accordionFlushExample" style="padding: 0px">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style="padding: 15px !important"
            >
              <div
                v-if="actualRoomColor !== null"
                :style="
                  'width: 20px;padding:2px ;height: 20px; background-color:' +
                  itemColor
                "
                style="display: inline-block"
              ></div>
              <div style="margin-left:5px;max-width:85%">
                <strong>{{ piano }}, {{ ubiMuseo }} </strong>
              </div>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="text-center">
                <img
                  :src="collocazioneSala"
                  alt=""
                  srcset=""
                  style="width: 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <ul>
        <li><strong>Materia: </strong>{{ materia }}</li>
        <!-- <li><strong>Collezione: </strong>{{ collezione }}</li> -->

        <li><strong>Provenienza: </strong>{{ provenienza }}</li>
      </ul>
      <hr />
      <div v-html="descrizione"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  item: { type: String, default: null },
  lastRoute: { type: String, default: null },
});

const isExpanded = ref(false);
const myItem = ref();
const { item } = toRefs(props);
const { lastRoute } = toRefs(props);
const photo = ref("");

const id = ref();
const autore = ref();
const titolo = ref();
const data = ref();
const materia = ref();
const collezione = ref();
const piano = ref();
const sala = ref();
const parete = ref();
const specifiche = ref();
const descrizione = ref();
const icona = ref();
const provenienza = ref();
const ubiMuseo = ref();
const collocazioneSala = ref();
const url = ref();
const itemColor = ref();
async function fetchItems() {
  myItem.value = JSON.parse(item.value);
  if (
    typeof myItem.value === "object" &&
    myItem.value !== null &&
    myItem.value.hasOwnProperty("id")
  ) {
    id.value = myItem.value.id;
    titolo.value = myItem.value.titolo;
    autore.value = myItem.value.autore;
    data.value = myItem.value.data;
    materia.value = myItem.value.materia;
    collezione.value = myItem.value.collezione;
    provenienza.value = myItem.value.provenienza;
    ubiMuseo.value = myItem.value.salaLabel;

    piano.value = myItem.value.piano;
    collocazioneSala.value = myItem.value.collocazione_sala;
    piano.value = piano.value.charAt(0).toUpperCase() + piano.value.slice(1);
    sala.value = myItem.value.sala;
    parete.value = myItem.value.parete;
    specifiche.value = myItem.value.specifiche;
    descrizione.value = myItem.value.descrizione;
    icona.value = myItem.value.icona;
    url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
    collocazioneSala.value = url.value + "/assets/" + collocazioneSala.value;
    itemColor.value = myItem.value.colore;
    fetch(collocazioneSala.value)
      .then((response) => response.blob())
      .then((blob) => {
        // CODE64 IMAGE
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result; //code64 the url
          collocazioneSala.value = base64data;
        };
      });

    try {
    } catch (error) {
    }
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
  background-color:white
}
</style>
