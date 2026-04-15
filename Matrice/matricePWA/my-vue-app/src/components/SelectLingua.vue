<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const miaLingua = ref();
const datiPOI = ref([]);
const errore = ref(null);

async function caricaDatiPOI() {
  const datiMemorizzati = localStorage.getItem("poiData");

  if (datiMemorizzati) {
    try {
      datiPOI.value = JSON.parse(datiMemorizzati);
    } catch (e) {
      console.error("Errore nel parsing dei dati da localStorage:", e);
    }
  }

  try {
    const risposta = await fetch("https://db.santamariadellastradamatrice.it/items/POI?sort=numero&fields=*.*.*");

    if (!risposta.ok) throw new Error("Errore nella risposta del server");

    const dati = await risposta.json();

    const filtrati = dati.data.filter(item => Array.isArray(item.app_ts) && item.app_ts.includes("APP"));

    datiPOI.value = filtrati;

    localStorage.setItem("poiData", JSON.stringify(filtrati));
  } catch (err) {
    console.warn("Impossibile ottenere i dati dalla API. Uso dei dati nella cache se disponibili.");
    errore.value = "Impossibile caricare i dati aggiornati.";
  }
}

function selectLingua(lingua) {
  switch (lingua) {
    case "english":
      router.push({ name: "HomePage", params: { lingua: "english" } });
      break;
    case "italiano":
      router.push({ name: "HomePage", params: { lingua: "italiano" } });
      break;
  }
}

onMounted(() => {
  caricaDatiPOI();
});
</script>




<template>
  <div class="container">
    <img src="/logo3rige.png" alt="IMAGE" class="main-image" />

    <!-- <h1 class="title">SELEZIONA UNA LINGUA</h1> -->

    <div class="cards-wrapper">
      <div class="card" @click="selectLingua('italiano')">
        <img src="/italy-flag-round-large.png" alt="ITALIANO" class="flag" />
        <strong class="language">ITALIANO</strong>
      </div>
      <div class="card" @click="selectLingua('english')">
        <img
          src="/United-kingdom_flag_icon_round.svg.png"
          alt="ENGLISH"
          class="flag"
        />
        <strong class="language">ENGLISH</strong>
      </div>

   
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;     
  min-height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background-image: url("/Mediamodifier-Design.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4000px;
  background-position-x: -900px;
  background-position-y: -900px;
  
}

.main-image {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
}

.title {
  margin-top: 20px;
  font-size: 24px;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.card {
  background-color: #f5f5f5;
  padding: 30px 20px;
  width: 118px;
  height: 92px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:black;
}

.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 16px;
}
</style>
