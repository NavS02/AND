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
                  CARTE STORICHE
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalFotografie }}
                </div>
              </div>
              <div class="col-auto" >
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
                  SERIE ITALIANA
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalFotografi }}
                </div>
              </div>
              <div class="col-auto">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Iscrizioni
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalIscrizioni }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-pen text-gray-300 fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  
   
  </main>
</template>

<script setup>
import { ref } from "vue";
import { directus } from "../API/";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let totalFotografie = ref();
let totalFotografi = ref();
let totalIscrizioni = ref();
let showPiano1 = ref(false);
let showPianoT = ref(false);
let showPianoI = ref(false);
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);

fetchDashboard();
async function fetchDashboard() {
  const responseOp = await directus.items("carte_storiche").readByQuery({
    fields: ["COUNT(*)"],
    limit: -1,
  });
  totalFotografie.value = responseOp.data.length;

  const responseAut = await directus.items("serie_italiana").readByQuery({
    fields: ["COUNT(*)"],
    limit: -1,
  });
  totalFotografi.value = responseAut.data.length;


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
