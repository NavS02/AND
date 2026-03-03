<template>
  <br />
  <div class="container">
    <div class="accordion" id="accordionExample">
      <div
        v-for="(piano, pianoIndex) in piani"
        :key="pianoIndex"
        class="accordion-item"
      >
        <h2 class="accordion-header" :id="'heading' + pianoIndex">
          <button
            class="accordion-button collapsed"
            type="button"
            :data-bs-toggle="'collapse'"
            :data-bs-target="'#collapse' + pianoIndex"
            aria-expanded="false"
            :aria-controls="'collapse' + pianoIndex"
            @click="clearData()"
          >
            {{ piano.piano }}
          </button>
        </h2>
        <div
          :class="['accordion-collapse', 'collapse']"
          :id="'collapse' + pianoIndex"
          :aria-labelledby="'heading' + pianoIndex"
          :data-bs-parent="'#accordionExample'"
        >
          <div class="accordion-body" style="margin: -10px !important" id="accDadBody">
         
            <div
              v-for="(sala, salaIndex) in piano.sale"
              :key="salaIndex"
              class="accordion"
            >
              <div class="accordion-item">
                <h2
                  :class="['accordion-header']"
                  :id="'heading' + pianoIndex + salaIndex"
                >
                  <button
                    class="accordion-button"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#collapse' + pianoIndex + salaIndex"
                    :aria-expanded="false"
                    :aria-controls="'collapse' + pianoIndex + salaIndex"
                    @click="loadItemsSala(sala)"
                  >
                    {{ sala }}
        <img src="/90-ring.svg" alt="" srcset="" v-if="!loaded">

                  </button>
                </h2>
                <div
                  :class="['accordion-collapse', 'collapse']"
                  :id="'collapse' + pianoIndex + salaIndex"
                  :aria-labelledby="'heading' + pianoIndex + salaIndex"
                  :data-bs-parent="'#collapse' + pianoIndex"
                >
                  <div class="accordion-body" style="margin: -10px !important">
                    <div v-if="itemsFiltered !== null && loaded">
                      <div v-for="(item, index) in itemsFiltered" :key="index">
                        <router-link
                          class="nav-link"
                          :to="{
                            name: 'InfoItem',
                            params: { item: item.JSON, lastRoute: 'null' },
                          }"
                        >
                          <div class="card custom-card">
                            <div
                              class="card-body"
                              style="margin: -10px !important"
                            >
                              <div class="row">
                                <div class="col-5">
                                  <div class="custom-div text-center">
                                    <img
                                      :src="item.icona"
                                      alt=""
                                      srcset=""
                                      style="object-fit: contain"
                                    />
                                  </div>
                                </div>
                                <div class="text-right col-7">
                                  {{ item.titolo }}
                                  <br />
                                  <br />
                                  <span
                                    style="
                                      font-style: italic;
                                      font-size: 10px;
                                      float: right;
                                    "
                                    >{{ item.autore }}</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </router-link>
                      </div>
                    </div>
                    <div v-else class="text-center">
                      <h4> Nessuna opera trovata</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";

function cleanString(input) {
  return input.replace(/\s/g, "").toLowerCase();
}
const props = defineProps({
  itemsData: { type: Array, default: null },
});
const { itemsData } = toRefs(props);

const piani = ref([
  {
    piano: "Piano Terra",
    sale: [
      "Opere IV – XVII sec.",
      "Sculture di Lucio Fontana XX sec.",
      "Sala dell’Arciconfraternita del SS. Sacramento (dipinti XVIII sec.)",
      "Crociera",
      "Mostre temporanee (PT)",
    ],
  },
  {
    piano: "Primo Piano",
    sale: [
      "Dipinti XVIII sec. (Collezione Erba Odescalchi)",
      "Dipinti XIV – XX sec.",
      "Opere XVII sec. (Collezione Visconti)",
      "Dipinti XVII – XVIII sec. (Collezione Pozzobonelli)",
      "Dipinti XVI – XVII sec. (Collezione Monti)",
      "Disegni XV – XX sec. (Collezione Sozzani)",
      "Opere XIII – XV sec. (Collezione Schubert)",
      "Fondi oro XIV – XV sec. (Collezione Crespi)",
      "Sculture XV – XIX sec. (Collezione Marcenaro)",
      "Mostre temporanee (PP)",
    ],
  },
  {
    piano: "Ipogeo",
    sale: ["VI – XX sec. Arredo liturgico"],
  },
]);
const items = ref(itemsData);
const itemsFiltered = ref(null);
const imageurl = ref("/logoMilanoSmall.png");
const loaded=ref(true)
function loadItemsSala(sala) {
  loaded.value=false
  itemsFiltered.value=null
  itemsFiltered.value = items.value.filter(
    (item) => sala === item.salaLabel
  );
  if(itemsFiltered.value.length <=0){
    itemsFiltered.value=null
  }
 
  loaded.value=true

}
function clearData(){
  itemsFiltered.value=null
  var accordions = document.querySelectorAll("#accDadBody .accordion-collapse.show");
    accordions.forEach(function(collapse) {
      collapse.classList.remove("show");
      var button = collapse.previousElementSibling.querySelector('.accordion-button');
      button.classList.add("collapsed");
      button.setAttribute("aria-expanded", "false");
    });
}
</script>
<style scoped>
.custom-div {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-div img {
  max-width: 100px;
  max-height: 100px;
}
.custom-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-title {
  font-size: 12px;
  text-align: right;
}
</style>
