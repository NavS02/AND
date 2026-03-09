<template>
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
                  Opere
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalOpere }}
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
                  Autori
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalAutori }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-file-earmark-person fa-3x"></i>
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
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../API/";
import * as settings from "../settings/";

export default {
  setup() {
    let totalOpere = ref();
    let totalAutori = ref();
    let totalIscrizioni = ref();

    fetchDashboard();
    async function fetchDashboard() {
      const responseOp = await directus.items("opera").readByQuery({
        filter: { status: { _eq: "attivo" } },
        aggregate: { count: "*" },
      });

      totalOpere.value = responseOp.data[0].count;
      const responseAut = await directus.items("autore").readByQuery({
        aggregate: { count: "*" },
      });

      totalAutori.value = responseAut.data[0].count;

      const responseIscriz = await directus.items("iscrizione").readByQuery({
        aggregate: { count: "*" },
      });

      totalIscrizioni.value = responseIscriz.data[0].count;
    }
    return {
      totalOpere,
      totalAutori,
      totalIscrizioni,
    };
  },
};
</script>

<style scoped>
.bi {
  font-size: 3.5rem;
}
</style>
