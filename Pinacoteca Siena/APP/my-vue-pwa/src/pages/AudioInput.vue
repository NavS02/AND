<template>
  <div style="position: relative">
    <header style="position: absolute; top: 1%; left: 15%">
      <img
        src="/logoSiena.png"
        alt=""
        style="max-width: 60%; height: auto; margin: 0 auto"
      />
    </header>
    <br />
    <div style="margin-top: 30%">
      <h4 v-if="lingua == 'it'">
        Digita il numero <br />che trovi sulla didascalia
      </h4>
      <h4 v-if="lingua == 'en'">Type the number <br />you find on the label</h4>
      <h4 v-if="lingua == 'fr'">
        Tapez le numéro <br />que vous trouvez sur l'étiquette
      </h4>
      <h4 v-if="lingua == 'es'">
        Escriba el número <br />que encuentra en la etiqueta
      </h4>

      <input
        type="text"
        v-model="inputText"
        readonly
        :placeholder="minValue + '-' + maxValue"
        style="text-align: center; width: 85px; height: 75px; font-size: 28px"
      />

      <div class="keyboard-wrapper">
        <div class="keyboard">
          <button v-for="num in numbers" :key="num" @click="appendToInput(num)">
            {{ num }}
          </button>

          <button
            v-if="lingua == 'it'"
            @click="search"
            style="background-color: #00458d; font-size: 20px"
          >
            Cerca</button
          ><button
            v-if="lingua == 'en'"
            @click="search_eng"
            style="background-color: #00458d; font-size: 20px"
          >
            Search
          </button>
          <button
            v-if="lingua == 'fr'"
            @click="search_fr"
            style="background-color: #00458d; font-size: 20px"
          >
            Rechercher
          </button>
          <button
            v-if="lingua == 'es'"
            @click="search_spa"
            style="background-color: #00458d; font-size: 20px"
          >
            Busca
          </button>
          <button @click="clearInput" style="background-color: brown">
            <font-awesome-icon icon="delete-left" />
          </button>
        </div>
      </div>
      <br />
    </div>
    <audio
      src=""
      controls
      id="audioInput"
      style="width: 100%"
      :class="{ 'audio-display': audioFound, 'd-none': !audioFound }"
    ></audio>
    <div>
      <br />
      <img src="" id="imageInput" alt="" style="max-width: 40%" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs } from "vue";

// State to store input text
const inputText = ref("");
const itemsData = ref(JSON.parse(localStorage.getItem("listOpere")));
const minValue = ref(0);
const maxValue = ref(100);
const audioFound = ref(false);
const props = defineProps({
  lingua: { type: String, default: "" },
  tipologia: { type: String, default: null },
});
const { lingua } = toRefs(props);
const { tipologia } = toRefs(props);
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const appendToInput = (num) => {
  const newValue = inputText.value.toString() + num.toString();
  if (
    parseInt(newValue) >= minValue.value &&
    parseInt(newValue) <= maxValue.value
  ) {
    inputText.value = parseInt(newValue);
  }
};

const clearInput = () => {
  inputText.value = inputText.value.toString().slice(0, -1);
};

const search = () => {
  audioFound.value = false;

  let itemFiltered;
  if (tipologia.value == "kid") {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("adulti")
    );
  }
  let url = null;
  if (tipologia.value == "adult") {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_adulti;
    if (itemFiltered[0].audio_adulti !== null) {
      audioFound.value = true;
    }
  } else {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_ragazzi;

    if (itemFiltered[0].audio_ragazzi !== null) {
      audioFound.value = true;
    }
  }
  const audioElement = document.getElementById("audioInput");
  audioElement.src = url;
  document.getElementById("imageInput").src =
    import.meta.env.VITE_API_BASE_URL + "assets/" + itemFiltered[0].icona;
  inputText.value = "";

  setupAudioOutput(audioElement);
};

const search_eng = () => {
  audioFound.value = false;

  let itemFiltered;
  if (tipologia.value == "kid") {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("adulti")
    );
  }
  let url = null;
  if (tipologia.value == "adult") {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_adulti_eng;
    if (itemFiltered[0].audio_adulti_eng !== null) {
      audioFound.value = true;
    }
  } else {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_ragazzi_eng;
    if (itemFiltered[0].audio_ragazzi_eng !== null) {
      audioFound.value = true;
    }
  }
  const audioElement = document.getElementById("audioInput");
  audioElement.src = url;
  document.getElementById("imageInput").src =
    import.meta.env.VITE_API_BASE_URL + "assets/" + itemFiltered[0].icona;
  inputText.value = null;

  setupAudioOutput(audioElement);
};

const search_fr = () => {
  audioFound.value = false;
  let itemFiltered;
  if (tipologia.value == "kid") {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("adulti")
    );
  }
  let url = null;
  if (tipologia.value == "adult") {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_adulti_fra;
    if (itemFiltered[0].audio_adulti_fra !== null) {
      audioFound.value = true;
    }
  } else {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_ragazzi_fra;
    if (itemFiltered[0].audio_ragazzi_fra !== null) {
      audioFound.value = true;
    }
  }
  const audioElement = document.getElementById("audioInput");
  audioElement.src = url;
  document.getElementById("imageInput").src =
    import.meta.env.VITE_API_BASE_URL + "assets/" + itemFiltered[0].icona;
  inputText.value = null;

  setupAudioOutput(audioElement);
};

const search_spa = () => {
  audioFound.value = false;
  let itemFiltered;
  if (tipologia.value == "kid") {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemFiltered = itemsData.value.filter(
      (item) =>
        item.numero === parseInt(inputText.value) &&
        item.tipo_visita.includes("adulti")
    );
  }
  let url = null;
  if (tipologia.value == "adult") {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_adulti_spa;
    if (itemFiltered[0].audio_adulti_spa !== null) {
      audioFound.value = true;
    }
  } else {
    url =
      import.meta.env.VITE_API_BASE_URL +
      "assets/" +
      itemFiltered[0].audio_ragazzi_spa;
    if (itemFiltered[0].audio_ragazzi_spa !== null) {
      audioFound.value = true;
    }
  }
  const audioElement = document.getElementById("audioInput");
  audioElement.src = url;
  document.getElementById("imageInput").src =
    import.meta.env.VITE_API_BASE_URL + "assets/" + itemFiltered[0].icona;
  inputText.value = null;

  setupAudioOutput(audioElement);
};

async function setupAudioOutput(audio) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = devices.filter(
    (device) => device.kind === "audiooutput"
  );
  if (audioDevices.length > 0) {
    await audio.setSinkId(audioDevices[0].deviceId);
  } else {
    console.warn("No devices");
  }
}

function fetchLimits() {
  const numero = itemsData.value.map((item) => item.numero); // Extract the id values
  const minId = Math.min(...numero);
  const maxId = Math.max(...numero);
  minValue.value = minId;
  maxValue.value = maxId;
}

onMounted(async () => {
  if (tipologia.value == "kid") {
    itemsData.value = itemsData.value.filter(
      (item) => item.tipo_visita && item.tipo_visita.includes("ragazzi")
    );
  } else {
    itemsData.value = itemsData.value.filter(
      (item) => item.tipo_visita && item.tipo_visita.includes("adulti")
    );
  }
  fetchLimits();
});
</script>
<style scoped>
header img {
  display: block;
}

h4 {
  margin-top: 0;
}
.keyboard-wrapper {
  display: flex;
  justify-content: center; /* Center the keyboard horizontally */
  margin-top: 20px; /* Add some spacing if needed */
}
.keyboard {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(3, auto); /* Two rows */
  margin-top: 0px;
}

.keyboard button {
  padding: 0px;
  font-size: 28px;
  background-color: #3a3a3add;
  border: 1px solid #ccc;
  cursor: pointer;
  width: 70px;
  height: 70px;
}

.keyboard button:hover {
  background-color: #e0e0e0;
}

button {
  margin-top: 10px;
  padding: 15px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.audio-display {
  display: block;
}
.d-none {
  display: none;
}
</style>
