<template>
  <div class="page-container" v-if="info">
    <div class="header-image">
      <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" style="" />
    </div>

    <div v-if="currentLanguage === 'italiano'" style="text-align: center;">
      <p
        v-html="info.crediti"
        style="text-align: center; font-size: 20px"
      ></p>
    </div>
    <div v-if="currentLanguage === 'english'">
       <p
        v-html="info.crediti"
        style="text-align: center; font-size: 20px"
      ></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const info = ref();
const currentIndex = ref(0);
const scrollContainer = ref(null);
const currentLanguage = ref( route.params.lingua);
onMounted(async () => {
  try {
    const datiMemorizzati = localStorage.getItem("infoData");

    if (datiMemorizzati) {
      info.value = JSON.parse(datiMemorizzati);
    } else {
      const risposta = await fetch(
        "https://db.santamariadellastradamatrice.it/items/APP/1?fields=*,gallery.*.*"
      );
      const json = await risposta.json();
      info.value = json.data;

      localStorage.setItem("infoData", JSON.stringify(json.data));
    }
  } catch (error) {
    console.error("Errore nel ottenere i POI:", error);
  }
});

const scrollToIndex = (index) => {
  currentIndex.value = index;
  const container = scrollContainer.value;
  if (container) {
    const childWidth = container.offsetWidth;
    container.scrollTo({
      left: index * childWidth,
      behavior: "smooth",
    });
  }
};

const onScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const index = Math.round(scrollLeft / width);
    currentIndex.value = index;
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  padding: 6%;
}


</style>
