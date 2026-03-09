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
          src="/event.png"
          alt=""
          srcset=""
          class="icona"
          @click="toggleImageSize"
          :class="{ 'expanded-image': isExpanded }"
        />
      </div>
      <br />
      <h4 style="font-style: italic">IN A SOUNDSCAPE OF COLOURS
      </h4>
   <br>
   <br>
   <div style="text-align:justify">
    <p>Un progetto di sound art elaborato da Giulio Aldinucci per le opere della Pinacoteca Nazionale di Siena</p>
  <br>
  Cinque tracce audio vi accompagneranno nella visione di alcune opere, permettendo di immergersi in paesaggi sonori che interagiscono con l'immagine creando una micro-narrazione, o ricreando l'ambientazione a partire dal luogo di culto in cui in origine era
 collocata o ancora sonorizzando gli elementi presenti nei dipinti. Molte sono le suggestioni e le chiavi di lettura che vi permetteranno di sostare davanti ai dipinti per aumentarne lo spazio di osservazione.


Le opere scelte  sono il Paliotto d’Altare di Guido da Siena, il Beato Agostino Novello di Simone Martini, La Madonna dell’Umiltà e il Giudizio Universale di Giovanni di Paolo e il Polittico dell’Assunta di Sano di Pietro.


Il progetto è stato realizzato nell'aprile del 2025 da Giulio Aldinucci, da anni attivo come compositore nel campo della musica elettroacustica sperimentale e nella ricerca sul paesaggio sonoro.
 
  </div>
  <br>
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
  const titolo = ref();
  const titolo_fra = ref();
  const titolo_eng = ref();
  const data = ref();
  const data_eng = ref();
  const data_fra = ref();
  const materia = ref();
  const materia_eng = ref();
  const materia_fra = ref();
  const collezione = ref();
  const piano = ref();
  const piano_eng = ref();
  const piano_fra = ref();
  const sala = ref();
  const sala_eng = ref();
  const sala_fra = ref();
  const parete = ref();
  const specifiche = ref();
  const descrizione = ref();
  const descrizione_eng = ref();
  const descrizione_fra = ref();
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
      autore.value = myItem.value.autore;
      autore_eng.value = myItem.value.autore_eng;
      autore_fra.value = myItem.value.autore_fra;
      data.value = myItem.value.data;
      data_eng.value = myItem.value.data_eng;
      data_fra.value = myItem.value.data_fra;
      materia.value = myItem.value.materia;
      materia_eng.value = myItem.value.materia_eng;
      materia_fra.value = myItem.value.materia_fra;
      collezione.value = myItem.value.collezione;
      provenienza.value = myItem.value.provenienza;
      ubiMuseo.value = myItem.value.salaLabel;
      piano.value = myItem.value.piano;
      piano_eng.value = myItem.value.piano_eng;
      piano_fra.value = myItem.value.piano_fra;
      collocazioneSala.value = myItem.value.collocazione_sala;
      sala.value = myItem.value.sala;
      sala_eng.value = myItem.value.sala_eng;
      sala_fra.value = myItem.value.sala_fra;
      parete.value = myItem.value.parete;
      specifiche.value = myItem.value.specifiche;
      descrizione.value = myItem.value.descrizione;
      descrizione_eng.value = myItem.value.descrizione_eng;
      descrizione_fra.value = myItem.value.descrizione_fra;
      url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
      collocazioneSala.value = url.value + "assets/" + collocazioneSala.value;
      icona.value = url.value + "assets/" + myItem.value.icona;
      numero.value = myItem.value.numero;
      opera.value = myItem.value.opera;
      if (tipologia.value == "kid"  ) {
        if(lingua.value=='it'){
          audio.value = url.value + "assets/" + myItem.value.audio_ragazzi;
        }else if(lingua.value =='en'){
          audio.value = url.value + "assets/" + myItem.value.audio_ragazzi_eng;
        }else if (lingua.value =='fr'){
          audio.value = url.value + "assets/" + myItem.value.audio_ragazzi_fra;
        }
      } else {
        if(lingua.value=='it'){
        audio.value = url.value + "assets/" + myItem.value.audio_adulti;
  
        }else if(lingua.value =='en'){
        audio.value = url.value + "assets/" + myItem.value.audio_adulti_eng;
  
        }else if (lingua.value =='fr'){
        audio.value = url.value + "assets/" + myItem.value.audio_adulti_fra;
  
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
  