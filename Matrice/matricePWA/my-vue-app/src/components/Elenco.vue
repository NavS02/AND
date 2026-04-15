<template>
  <div class="page-container">
    <div class="header-image">
      <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />
    </div>

    <div class="list-button" style="text-align: left; margin-left: 20px">
      <div @click="goToMappa()" class="link">
        <span class="arrow">←</span>

        {{ currentTranslations.visualizza_mappa || "Visualizza la mappa" }}
      </div>
    </div>
    <br />
    <div class="masonry-container">
      <div
        v-for="poi in pois"
        :key="poi.id"
        class="poi-card"
        :style="{ backgroundImage: 'url(' + getImageUrl(poi.cover?.id) + ')' }"
        @click="goToScheda(poi)"
      >
      <div v-if="currentLanguage === 'italiano'">
                <div class="poi-title">{{ poi.titolo }}</div>

      </div>
      <div v-else>
                <div class="poi-title">{{ poi.titolo_ENG }}</div>
      </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const pois = ref([]);

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
function goToMappa() {
  router.push({ name: "Mappa", params: { lingua: route.params.lingua } });
}
function goToScheda(poi) {
  let mypoi = JSON.stringify(poi);
  router.push({
    name: "Scheda",
    params: { lingua: route.params.lingua, item: mypoi },
  });
}
function getImageUrl(coverId) {
  return `https://db.santamariadellastradamatrice.it/assets/${coverId}`;
}

onMounted(async () => {
  try {
    const datiMemorizzati = localStorage.getItem("poiData");

    if (datiMemorizzati) {
      const json = JSON.parse(datiMemorizzati);
      pois.value = (json || []).filter((item) => item.app_ts?.includes("APP"));
    } else {
      const risposta = await fetch(
        "https://db.santamariadellastradamatrice.it/items/POI?sort=numero&fields=*.*.*"
      );
      const json = await risposta.json();
      pois.value = (json.data || []).filter((item) =>
        item.app_ts?.includes("APP")
      );
    }
  } catch (error) {
    console.error("Errore nel ottenere i POI:", error);
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
}

.header-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

.list-button {
  text-align: center;
  margin: 1rem 0;
}

.link {
  color: #c20000;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.arrow {
  margin-right: 0.3rem;
}

/* MASONRY LAYOUT */
.masonry-container {
  column-count: 2;
  column-gap: 1rem;
  padding: 2rem;
}

.poi-card {
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 1rem;
  break-inside: avoid;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 150px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.poi-title {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0.5rem;
  border-radius: 5px;
  text-align: center;
}
</style>
