<template>
  <div class="row">
    <div class="col-md-6">
      <h5 class="card-title">ID:</h5>
      <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultID" />
    </div>
    <div class="col-md-6">
      <h5 class="card-title">Autore (AUTN):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultAutore" />
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <h5 class="card-title">Soggetto (SGTI):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultSGTI" />
    </div>
    <div class="col-md-6">
      <h5 class="card-title">Inventario (INVN):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="resultInv" />
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h5 class="card-title">Titolo (SGTT):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultSGTT" />
    </div>
    <div class="col-md-6">
      <h5 class="card-title">Oggetto (OGTD):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultOGTD" />
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h5 class="card-title">Tecnica (MTC):</h5>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="resultMTC" />
    </div>
    <div class="col-md-6">
      <div class="d-flex align-items-center">
        <h5 class="card-title mb-2">Acquisizione/Collezione (ACQN):</h5>
        <div class="form-check form-switch ms-5">
      <span class="resti2">non presente</span>
          <input class="form-check-input acqn" type="checkbox" id="acqnCheckbox" title="Not contains">
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
        id="resultACQN" />
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h5 class="card-title">Stima Tipologia(STI_TIPO)</h5>
      <select class="form-select" aria-label="Stima Tipologia" v-model="selectedOption" id="sti_tipo">
        <option v-for="(tipo, index) in sti_tipo" :key="index" :value="tipo">{{ tipo }}</option>
      </select>
    </div>
    <div class="form-check form-switch col-md-6 " style="margin-top:50px">
      <span class="resti">Opera restituita</span>
      <input class="form-check-input" type="checkbox" id="resti">
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
  
    <div class="form-check form-switch col-md-6 " style="margin-top:50px">
      <span class="deposito"> Opera esposta</span>
      <input class="form-check-input" type="checkbox" id="deposito">
    </div>
  </div>
  
  </div>
</template>

<script setup>
import { ref, watch, toRefs, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("/not-found.svg");
const sti_tipo = ref([])
const props = defineProps({
  collection: { type: String, default: "" },
  id: { type: String, default: null },
});
const { id, collection } = toRefs(props);

const route = useRoute();
const router = useRouter();

fetchRelationalItems()

async function fetchRelationalItems() {
  const response = await directus.items("sti_tipo").readByQuery({ limit: -1 })
  sti_tipo.value = response.data.map((item) => item.sti_tipo);
  sti_tipo.value.push("")

}


</script>

<style scoped>

.resti {
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}
.resti2{
 font-size: 14px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;

}
.acqn:checked {
  background-color: red;
}
</style>
