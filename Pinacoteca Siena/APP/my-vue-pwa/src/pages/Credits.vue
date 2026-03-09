<template>
  <div v-if="lingua == 'it'">
    <strong>Realizzato da:</strong><br />
    Musei Nazionali di Siena <br />
    con Ales S.p.A. Arte Lavoro e Servizi<br /><br /><strong
      >Sviluppato da:</strong
    >
    <br />
    AND srl - Ambienti Narrativi Digitali <br /><br /><strong>Testi:</strong
    ><br />
    Annalisa Giovani<br />
    Elisabetta Belli<br />
    Martina Dei <br /><br /><strong>Voci e montaggio:</strong><br />
    Accademia Minima <br />Francesco Chiantese <br />Eleonora Angioletti <br />
    Sara Bogi <br /><br /><strong>Traduzioni:</strong><br />
    Axel Hèmery <br />
    Jeff Shapir <br /><br /><br /><br />
    <span style="font-size: 12px">Crediti icone: BEARicons Kasanah</span>
  </div>
    <div v-if="lingua == 'es'">
    <strong>Realizado por:</strong><br />
    Musei Nazionali di Siena <br />
    con Ales S.p.A. Arte Lavoro e Servizi<br /><br /><strong
      >Desarrollado por:</strong
    >
    <br />
    AND srl - Ambienti Narrativi Digitali <br /><br /><strong>Textos:</strong
    ><br />
    Annalisa Giovani<br />
    Elisabetta Belli<br />
    Martina Dei <br /><br /><strong>Voces y edición:</strong><br />
    Accademia Minima <br />Francesco Chiantese <br />Eleonora Angioletti <br />
    Sara Bogi <br /><br /><strong>Traducciones:</strong><br />
    Axel Hèmery <br />
    Jeff Shapir <br /><br /><br /><br />
    <span style="font-size: 12px">Credito iconos: BEARicons Kasanah</span>
  </div>
  <div v-if="lingua == 'en'">
    <strong>Made by:</strong><br />
    Musei Nazionali di Siena <br />
    con Ales S.p.A. Arte Lavoro e Servizi<br /><br /><strong
      >Developed by:</strong
    >
    <br />
    AND srl - Ambienti Narrativi Digitali <br /><br /><strong>Texts:</strong
    ><br />
    Annalisa Giovani<br />
    Elisabetta Belli<br />
    Martina Dei <br /><br /><strong>Voices and editing:</strong><br />
    Accademia Minima <br />Francesco Chiantese <br />Eleonora Angioletti <br />
    Sara Bogi <br /><br /><strong>Translations:</strong><br />
    Axel Hèmery <br />
    Jeff Shapir <br /><br /><br /><br />
    <span style="font-size: 12px">Credit icons: BEARicons Kasanah</span>
  </div>
  <div v-if="lingua == 'fr'">
    <strong>Réalisé par:</strong><br />
    Musei Nazionali di Siena <br />
    con Ales S.p.A. Arte Lavoro e Servizi<br /><br /><strong
      >Développé par:</strong
    >
    <br />
    AND srl - Ambienti Narrativi Digitali <br /><br /><strong>Textes:</strong
    ><br />
    Annalisa Giovani<br />
    Elisabetta Belli<br />
    Martina Dei <br /><br /><strong>Voix et montage:</strong><br />
    Accademia Minima <br />Francesco Chiantese <br />Eleonora Angioletti <br />
    Sara Bogi <br /><br /><strong>Traductions:</strong><br />
    Axel Hèmery <br />
    Jeff Shapir <br /><br /><br /><br />
    <span style="font-size: 12px">Icônes de crédit: BEARicons Kasanah</span>
  </div>
  <!-- <div class="text-center">
    <div style="margin-bottom:100%">
      {{ translatedContent.credits2 }}

      <img src="/logoSiena.png" alt="" style="width: 100%" />
    </div>
    <div style="width:100%;position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); text-align: center;">
  <hr />
  {{ translatedContent.credits3 }}
  <img src="/logoAND2.png" alt="" style="width: 100%;" />
</div>

  </div> -->
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
async function fetchTranslations() {
  const response = await axios.get(`/translations/${lingua.value}.json`);
  translatedContent.value = response.data;
}
</script>
