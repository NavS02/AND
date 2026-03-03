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
    <!-- NAVIGATION MAPS -->
    <div style="position: relative">
      <img
        :src="image"
        alt=""
        usemap="#map1689762472709"
        class="img-fluid mainMap"
        draggable="false"
      />
      <img
        src="/mappa_1piano.png"
        alt=""
        srcset=""
        v-if="showPiano1"
        class="img-fluid piano1"
      />
      <img
        src="/mappa_pianoterra.png"
        alt=""
        srcset=""
        v-if="showPianoT"
        class="img-fluid pianoT"
      />
      <img
        src="/mappa_interrato.png"
        alt=""
        srcset=""
        v-if="showPianoI"
        class="img-fluid pianoI"
      />
    </div>
    <!-- INTERACTIVE COORDS -->
    <map id="map1689762472709" name="map1689762472709" style="cursor: pointer"
      ><area
        shape="rect"
        coords="0.000004752929697815489,1.0000047529296694,417.6666707529297,219.6666707529297"
        target="_self"
        @click="changeImage(1)"
        @mouseover="showPiano1 = true"
        @mouseleave="showPiano1 = false" /><area
        shape="rect"
        coords="2.000004752929698,221.00002001171873,411.6666707529297,425.66668601171875"
        target="_self"
        @click="changeImage(0)"
        @mouseover="showPianoT = true"
        @mouseleave="showPianoT = false" /><area
        shape="rect"
        coords="2.000004752929698,433.00002001171873,243.66667075292972,609.6666860117188"
        target="_self"
        @click="changeImage(-1)"
        @mouseover="showPianoI = true"
        @mouseleave="showPianoI = false"
    /></map>
  </main>
</template>

<script>
import { ref } from "vue";
import { directus } from "../API/";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    let totalOpere = ref();
    let totalAutori = ref();
    let totalIscrizioni = ref();
    let showPiano1 = ref(false);
    let showPianoT = ref(false);
    let showPianoI = ref(false);

    const image = ref("/mappa_generale-1024x756.png");
    fetchDashboard();
    async function fetchDashboard() {
      const responseOp = await directus.items("opera").readByQuery({
        fields: ["COUNT(*)"],
        limit: -1,
      });
      totalOpere.value = responseOp.data.length;

      const responseAut = await directus.items("autore").readByQuery({
        fields: ["COUNT(*)"],
        limit: -1,
      });
      totalAutori.value = responseAut.data.length;

      const responseIscriz = await directus.items("iscrizione").readByQuery({
        fields: ["COUNT(*)"],
        limit: -1,
      });
      totalIscrizioni.value = responseIscriz.data.length;
    }
    function changeImage(piano) {
      if (piano == 1) {
        // primo piano

        router.push({
          name: "searchArc",
          params: { piano: "primo piano" },
        });
      } else if (piano == 0) {
        // piano terra
        router.push({
          name: "searchArc",
          params: { piano: "piano terra" },
        });
      } else if (piano == -1) {
        router.push({
          name: "searchArc",
          params: { piano: "ipogeo" },
        });
      }
    }
    return {
      image,
      showPiano1,
      showPianoT,
      showPianoI,
      totalOpere,
      totalAutori,
      totalIscrizioni,
      changeImage,
    };
  },
};
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
