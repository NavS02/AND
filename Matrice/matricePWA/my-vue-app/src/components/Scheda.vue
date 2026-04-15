<template>
  <div class="page-container">
    <div class="header-image">
      <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />
    </div>
    <div class="top-bar">
      <button class="back-button" @click="goBack">
        <svg
          fill="#FFFFFF"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          id="left-arrow"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          class="icon flat-line"
        >
          <line
            id="primary"
            x1="21"
            y1="12"
            x2="3"
            y2="12"
            style="
              fill: none;
              stroke: rgb(255,255,255);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2;
            "
          ></line>
          <polyline
            id="primary-2"
            data-name="primary"
            points="6 9 3 12 6 15"
            style="
              fill: none;
              stroke: rgb(255,255,255);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2;
            "
          ></polyline>
        </svg>
             {{
          currentTranslations.return_home || "Torna indietro"
        }}
        
      </button>
    </div>

    <img
      v-if="parsedItem?.cover"
      :src="getImageUrl(parsedItem.cover)"
      class="main-image"
      alt="Immagine principale"
      style="max-width: 400px; max-height: 400px"
    />
<div v-if="currentLanguage === 'italiano'">

    <h2 class="title">{{ parsedItem?.titolo }}</h2>

    <div
      style="padding-bottom: 10px"
      v-if="parsedItem?.autore || parsedItem?.data || parsedItem?.soggetto"
    >
      <hr />
      <ul class="meta" style="padding-left: 10%">
        <li v-if="parsedItem?.autore">
          <em>{{ parsedItem?.autore }}</em>
        </li>
        <li v-if="parsedItem?.data">
          <em>{{ parsedItem?.data }}</em>
        </li>
        <li v-if="parsedItem?.soggetto">
          <em>{{ parsedItem?.soggetto }}</em>
        </li>
      </ul>
      <hr />
    </div>
    <div
      class="descrizione"
      v-html="parsedItem?.descrizione"
      style="margin: 2%"
    ></div>
</div>
<div v-else>

    <h2 class="title">{{ parsedItem?.titolo_ENG }}</h2>

    <div
      style="padding-bottom: 10px"
      v-if="parsedItem?.autore_ENG || parsedItem?.data_ENG || parsedItem?.soggetto_ENG"
    >
      <hr />
      <ul class="meta" style="padding-left: 10%">
        <li v-if="parsedItem?.autore_ENG">
          <em>{{ parsedItem?.autore_ENG }}</em>
        </li>
        <li v-if="parsedItem?.data_ENG">
          <em>{{ parsedItem?.data_ENG }}</em>
        </li>
        <li v-if="parsedItem?.soggetto_ENG">
          <em>{{ parsedItem?.soggetto_ENG }}</em>
        </li>
      </ul>
      <hr />
    </div>
    <div
      class="descrizione"
      v-html="parsedItem?.descrizione_ENG"
      style="margin: 2%"
    ></div>
</div>
  
  </div>
</template>

<script setup>
import { defineProps, computed,watch,ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  const route = useRoute();
  const router = useRouter();

const currentLanguage = ref("italiano");
const currentTranslations = ref({});
const loadTranslations = async () => {
  try {
    let data;
    const stored = localStorage.getItem("translations");

    if (stored) {
      data = JSON.parse(stored);
    } else {
      const response = await fetch("/translations.json");
      data = await response.json();
      localStorage.setItem("translations", JSON.stringify(data));
    }

    currentLanguage.value = route.params.lingua || "italiano";
    currentTranslations.value = data[currentLanguage.value];
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};
watch(
  () => route.params.lingua,
  async (newLang, oldLang) => {
    if (newLang !== oldLang) {
      await loadTranslations();
    }
  },
  { immediate: true }
);
const goBack = () => {
  router.back();
};

const props = defineProps({
  item: {
    type: String,
    required: true,
  },
});

const parsedItem = computed(() => {
  try {
    return JSON.parse(props.item);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
});

const getImageUrl = (uuid) => {
  return `https://db.santamariadellastradamatrice.it/assets/${uuid?.id}`;
};
</script>

<style scoped>
.page-container {
  text-align: center;
  min-height: 90vh;
  box-sizing: border-box;
  background-image: url("/Mediamodifier-Design.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4000px;
  background-position-x: -900px;
  background-position-y: -900px;
  
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 40px;
}

.menu-icon {
  font-size: 1.5rem;
  cursor: pointer;
}
h2{
  color:rgb(181, 113, 113)
}
.main-image {
  width: 100%;
  margin: 0rem 0;
  border-radius: 8px;
  object-fit: cover;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.mini-map {
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
  object-fit: cover;
}

.meta {
  text-align: left;
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.descrizione {
  text-align: left;
  font-size: 0.95rem;
  line-height: 1.6;
}
.back-button {
  background-color: #c20000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 1rem 01rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  background-color: #a10000;
}
</style>
