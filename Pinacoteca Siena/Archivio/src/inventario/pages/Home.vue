<template>
  <!-- DASHBOARD -->
  <main id="main">
    <div class="row d-flex">
      <div class="col-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Inventario
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalInventario }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-easel fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Collocazione
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalCollocazione }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-geo-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Audioguida
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalAudio }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-headphones"></i>            </div>
            </div>
          </div>
        </div>
      </div>
     
      <br><br>
      <div style="width: 900px;margin-top:3%"><canvas id="ubicazioneGraph"></canvas></div>
      <div style="width: 550px;margin-top:3%;margin-left:5%"><canvas id="salaGraph"></canvas></div>

      <!-- <highcharts :options="chartOptions" /> -->
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { directus } from "../API/";
import { useRoute, useRouter } from "vue-router";
import Chart, { Colors } from "chart.js/auto";

const route = useRoute();
const router = useRouter();
let totalInventario = ref();
let totalAudio = ref();
let totalCollocazione = ref();
const collocazioneData = ref();
const salaData = ref();
const ubicazioneData = ref();
const dataCol=ref()
const currentUbicazione=ref()
const collocazioneGraphData=ref()

const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);

fetchDashboard();
async function fetchDashboard() {
  const responseOp = await directus.items("inventario").readByQuery({
    fields: ["inv_collocazione"],
    limit: -1,
  });
  totalInventario.value = responseOp.data.length;
  const responseCollocazione = await directus
    .items("inv_collocazione")
    .readByQuery({ limit: -1 });
  totalCollocazione.value = responseCollocazione.data.length;
  collocazioneData.value = responseCollocazione.data;
  const responseSala = await directus
    .items("inv_sala")
    .readByQuery({ limit: -1 });
  salaData.value = responseSala.data;
  const responseUbicazione = await directus
    .items("inv_ubicazione")
    .readByQuery({ limit: -1 });
  ubicazioneData.value = responseUbicazione.data;

dataCol.value=responseOp.data



  collocazioneData.value.forEach((collocazione) => {
    salaData.value.forEach((sala) => {
      if(collocazione.inv_sala == sala.id){
        collocazione.inv_sala=sala.inv_sala
      }
    });
    ubicazioneData.value.forEach((ubicazione) => {
      if(collocazione.inv_ubicazione == ubicazione.id){
        collocazione.inv_ubicazione=ubicazione.inv_ubicazione
      }

    });
  });
  dataCol.value.forEach(inventario => {
  collocazioneData.value.forEach((collocazione) => {
if(inventario.inv_collocazione==collocazione.id && inventario.inv_collocazione !== null){
  inventario.ubicazioneLabel=null
  inventario.salaLabel=null

  inventario.ubicazioneLabel=collocazione.inv_ubicazione
  inventario.salaLabel=collocazione.inv_sala
}
  
});
});

const result = dataCol.value.reduce((acc, item) => {
  if (item.ubicazioneLabel) {
    const existingItem = acc.find(i => i.label === item.ubicazioneLabel);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ label: item.ubicazioneLabel, count: 1 });
    }
  }
  return acc;
}, []);

result.sort((a, b) => b.count - a.count);




  const responseAudio = await directus
    .items("app")
    .readByQuery({ limit: -1, fields: "id" });
  totalAudio.value = responseAudio.data.length;

  loadChartUbicazione(result);
  // chartOptions.value.series[0].data.push(responseUbicazione.data[0]);
  // console.log(chartOptions.value.series)
}

async function loadChartUbicazione(data) {
  const ctx = document.getElementById("ubicazioneGraph").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((row) => row.label),
      datasets: [
        {
          label: "Ubicazione",
          data: data.map((row) => row.count),
        },
      ],
    },
    options: {
      indexAxis: 'x',
      barThickness:9,
            minBarLength: 5,
      onClick: (e) => {
        const activePoints = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        if (activePoints.length) {
          const index = activePoints[0].index;
          const label = chart.data.labels[index];
          currentUbicazione.value=label
          handleBarClick(label);
        }
      }
    },
  });
}

function handleBarClick(label) {
  let valuesWithThisUbicazione=[]
  collocazioneData.value.forEach((collocazione) => {
    if(collocazione.inv_ubicazione==label){
      valuesWithThisUbicazione.push(collocazione)

    }
  });

const filteredDataCol = dataCol.value.filter(item => item.ubicazioneLabel == label);

filteredDataCol.forEach(element => {
    if(element.salaLabel == null){
      element.salaLabel=element.ubicazioneLabel
    }
  });

  const result = filteredDataCol.reduce((acc, item) => {
  if (item.salaLabel) {
    const existingItem = acc.find(i => i.label === item.salaLabel);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ label: item.salaLabel, count: 1 });
    }
  }
  return acc;
}, []);

result.sort((a, b) => b.count - a.count);

loadChartSala(result)
}


let salaChart = null;

async function loadChartSala(data) {
  const ctx = document.getElementById("salaGraph").getContext("2d");

  if (salaChart) {
    salaChart.destroy();
  }

  salaChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map((row) => row.label),
      datasets: [
        {
          label: "Sale",
          data: data.map((row) => row.count),
        },
      ],
    },
    options: {
      indexAxis: 'y',
      barPercentage: 1,
      minBarLength: 5,
      plugins: {
        legend: {
          display: false 
        }
      },
      onClick: (e) => {
        const activePoints = salaChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        if (activePoints.length) {
          const index = activePoints[0].index;
          const label = salaChart.data.labels[index];
          redirectToCerca(label);
        }
      }
      
     
    },
  });
}
function redirectToCerca(sala){
let filteredData = collocazioneData.value.filter(item => item.inv_ubicazione==currentUbicazione.value && item.inv_sala == sala);
if(filteredData[0] == undefined){
  filteredData = collocazioneData.value.filter(item => item.inv_ubicazione==currentUbicazione.value && item.inv_sala ==null);
}
router.push({name: 'searchArc', params: { piano: filteredData[0].inv_collocazione }})

}
</script>

<style scoped>
.bi {
  font-size: 3.5rem;
}
.mainMap {
  width: 40%;
  display: block;
  margin: 10% auto 0;
  position: absolute;
  left: 5%;
}
.piano1 {
  width: 30%;
  position: absolute;
  margin-left: 50%;
  margin-top: 16%;
}
.pianoT {
  width: 30%;
  position: absolute;
  margin-left: 50%;
  margin-top: 10%;
}
.pianoI {
  width: 30%;
  position: absolute;
  margin-left: 50%;
  margin-top: 15%;
}
</style>
