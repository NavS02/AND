<template>
  <main id="main">
    <div class="row d-flex">
      <div class="col-6">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Foto
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalOpere }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-image fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Fotografi
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalAutori }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-camera fa-3x"></i>
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
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Iscrizioni
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ totalIscrizioni }}
                </div>
              </div>
              <div class="col-auto">
                <i class="bi bi-pen fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { directus } from "../API/";

export default {
  setup() {
    const totalOpere = ref(0);
    const totalAutori = ref(0);
    const totalIscrizioni = ref(0);

    onMounted(async () => {
      await fetchDashboard();
    });

    async function fetchDashboard() {
      const responseOp = await directus.items("Foto").readByQuery({
  filter: { status: { _eq: "attivo" } },
  aggregate: { count: "*" },
});

      totalOpere.value = responseOp.data[0].count;

      const responseAut = await directus.items("fotografo").readByQuery({
        aggregate: { count: "*" },
      });
      totalAutori.value = responseAut.data[0].count;

      // const responseIscriz = await directus.items("iscrizioni").readByQuery({
      //   aggregate: { count: "*" },
      // });
      // totalIscrizioni.value = responseIscriz.data[0].count;
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
