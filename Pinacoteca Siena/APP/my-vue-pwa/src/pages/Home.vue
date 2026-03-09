<template>
  <div style="padding:0 !important;">
    <header
      style="position: absolute; top: -2%; right: 0; left: 0; text-align: center;height:5%;"
    >
        <img
          src="/logoSiena.png"
          alt=""
          style="max-width: 50%; height: auto; margin: 0 auto;"
        />
    </header>

    <div style="text-align: center; margin-top: -5%; margin-bottom: 5px; position: absolute; top: 15%; left: 50%; transform: translateX(-50%);">
      <!-- <h2>{{ translatedContent.homeTitle }}</h2> -->
      <div class="grid-container" v-if="tipologia == 'adult'">
        <div
          class="grid-item"
          @click="selectedOption(1)"
          style="
            background-image: url('/98676-share-image.jpg');
            background-color: rgba(0, 0, 0, 0.3);
            background-blend-mode: multiply;
            background-position: center center;
            background-size: cover;
          "
        >
          <span class="optionLabel">
            {{ translatedContent.homeOption1 }}
          </span>
        </div>

        <div
          class="grid-item"
          @click="selectedOption(2)"
          style="
            background-image: url('/DSC_2630.jpg');
            background-color: rgba(0, 0, 0, 0);
            background-blend-mode: multiply;
            background-position: center center;
            background-size: cover;
          "
        >
          <span class="optionLabel">
            {{ translatedContent.homeOption2 }}
          </span>
        </div>
        <div
          class="grid-item"
          @click="selectedOption(3)"
          style="
            background-image: url('/number-5.png');
            background-color: rgba(0, 0, 0, 0.3);
            background-blend-mode: multiply;
            background-position: center center;
            background-size: cover;
          "
        >
          <span class="optionLabel">
            {{ translatedContent.homeOption3 }}
          </span>
        </div>
        <div
          class="grid-item" 
          @click="selectedOption(4)"
          style="
            background-image: url('/event.png');
            background-color: rgba(0, 0, 0, 0);
            background-blend-mode: multiply;
            background-position: top center;
            background-size: cover;
                    "
        >
          <span class="optionLabel" style="">
            {{ translatedContent.homeOption4 }}
          </span>
        </div>
      </div>
      <div v-else class="grid-container2" style="margin-top:40%">
        <div
          class="grid-item2"
          @click="selectedOption(1)"
          style="
            background-image: url('/ragazziBG.jpeg');
            background-color: rgba(0, 0, 0, 0.3);
            background-blend-mode: multiply;
            background-position: center center;
            background-size: cover;
            
          "
        >
          <div class="optionLabel2" style="margin:auto;line-height: 50px;">
            <span >
              {{ translatedContent.homeOption1 }}

            </span>
          </div>
        </div>
      </div>
<br>

<span style="color:black;" @click="goToCredits()"> {{translatedContent.credits}}</span>

    </div>

    <!-- <transition name="popup-fade">
      <div v-if="showPopup" class="popup-container">
        <div class="popup">
          <h3 v-if="!selectedFlag">Seleziona una lingua</h3>
          <div id="flagsLingue" v-if="!selectedFlag">
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
              "
              id="en"
            >
              &nbsp;
            </button>
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
              @click="selectLanguage('fr')"
              style="
                width: 60px;
                height: 45px;
                background-image: url('/Flag_of_France.svg.webp');
                background-size: cover;
                background-position: center;
                border: none;
                color: white;
                font-size: 14px;
                cursor: pointer;
              "
              id="fr"
            >
              FR
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
                  <font-awesome-icon icon="user" />
                </span>
                <span class="radio-label">
                  {{ translatedContent.adultLabelOption }}
                </span>
              </span>
            </label>

            <label @click="selectType('kid')">
              <input class="radio-input" type="radio" name="engine" />
              <span class="radio-tile">
                <span class="radio-icon">
                  <font-awesome-icon icon="child-reaching" />
                </span>
                <span class="radio-label">
                  {{ translatedContent.kidsLabelOption }}</span
                >
              </span>
            </label>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const translatedContent = ref({});
const props = defineProps({
  lingua: { type: String, default: "" },
  tipologia: { type: String, default: null },
});
const { lingua, tipologia } = toRefs(props);

watch(
  route,
  async () => {
    fetchTranslations();
  },
  { immediate: true, deep: true }
);

function selectedOption(option) {
  switch (option) {
    case 1:
      router.push({
        name: "ListOpere",
        params: { lingua: lingua.value, tipologia: tipologia.value },
      });
      break;
    case 2:
      router.push({
        name: "CollocazionePage",
        params: { lingua: lingua.value, tipologia: tipologia.value },
      });

      break;
    case 3:
      router.push({
        name: "AudioInput",
        params: { lingua: lingua.value, tipologia: tipologia.value },
      });

      break;
      case 4:
      router.push({
        name: "EventPage",
        params: { lingua: lingua.value, tipologia: tipologia.value },
      });

      break;
    default:
      break;
  }
}
function goToCredits(){
  router.push({
        name: "Credits",
        params: { lingua: lingua.value, tipologia: tipologia.value },

      });
}
async function fetchTranslations() {
  const response = await axios.get(`/translations/${lingua.value}.json`);
  translatedContent.value = response.data;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Wittgenstein:ital,wght@0,400..900;1,400..900&display=swap");
.optionLabel {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-optical-sizing: auto;
  font-weight: 600;
  font-size: 18px;
  margin-top: 115px;
  margin-bottom: 0px;
  color: white;
  font-style: normal;
  text-transform: uppercase;
}
.optionLabel2 {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  font-optical-sizing: auto;
  vertical-align: center;
  font-weight: 600;
  height:50px;
  font-size: 18px;
  color: white;
  font-style: normal;
  text-transform: uppercase;
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
  margin: 5px;
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
  gap: 10px;
  justify-items: center;
  margin-top: 10px;
}
.grid-item {
  background-color: #ccc;
  width: 75vw;
  /* height: 130px; */
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
            border-bottom-left-radius: 0px !important;
            border-bottom-right-radius: 0;  
            margin-top:20px   
}

.grid-container2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}
.grid-item2 {
  background-color: #ccc;
  width: 75vw;
  height:330px;
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
.selected-flag {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
