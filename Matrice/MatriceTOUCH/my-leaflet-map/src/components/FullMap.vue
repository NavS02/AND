<template>
  <div class="map-container">
    <div id="map"></div>

    <div class="area-card-container" v-if="footerData">
      <div
        class="card-area"
        :class="{ active: activeArea === 'SMS' }"
        @click="setArea('SMS')"
      >
        <h5>
          {{
            lingua === "it"
              ? footerData.titolo_mappa1
              : footerData.titolo_mappa1_eng
          }}
        </h5>
      </div>
      <div
        class="card-area"
        :class="{ active: activeArea === 'A' }"
        @click="setArea('A')"
      >
        <h5>
          {{
            lingua === "it"
              ? footerData.titolo_mappa2
              : footerData.titolo_mappa2_eng
          }}
        </h5>
      </div>
      <div
        class="card-area"
        :class="{ active: activeArea === 'B' }"
        @click="setArea('B')"
      >
        <h5>
          {{
            lingua === "it"
              ? footerData.titolo_mappa3
              : footerData.titolo_mappa3_eng
          }}
        </h5>
      </div>
    </div>

    <div class="tags-card">
      <br />
      <div class="tags-card-grid">
        <div
          v-for="type in visiblePoiTypes"
          :key="type.id"
          class="tag-card"
          :class="{ active: selectedTypes.includes(type.tipo) }"
          @click="togglePOIType(type.tipo)"
          :style="{
            borderColor: selectedTypes.includes(type.tipo) ? type.colore : '',
            color: selectedTypes.includes(type.tipo) ? type.colore : '',
          }"
        >
          <h5 style="text-transform: capitalize">
            {{ lingua === "it" ? type.tipo : type.tipo_eng }}
          </h5>
        </div>
      </div>
    </div>

    <div class="change-layer" @click="goHome()">
      <div class="mySVGS">
        <div class="svg-left">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12H4M4 12L10 6M4 12L10 18"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="svg-center">
          <svg
            fill="#000000"
            width="36px"
            height="36px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 14.69h-1.25V7.78a.62.62 0 0 0-.25-.47L8.4 2.7a.65.65 0 0 0-.81 0L2 7.31a.62.62 0 0 0-.22.47v6.91H.5V7.78a1.87 1.87 0 0 1 .68-1.44l5.62-4.6a1.88 1.88 0 0 1 2.39 0l5.63 4.6a1.87 1.87 0 0 1 .68 1.44z"
            />
            <path
              d="M11.05 12.11H9.8A1.72 1.72 0 0 0 8 10.49a1.72 1.72 0 0 0-1.8 1.62H5a3 3 0 0 1 3-2.87 3 3 0 0 1 3.05 2.87zm-6.1 0H6.2v2.58H4.95zm4.85 0h1.25v2.58H9.8z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="info-card" v-if="footerData">
      <div style="text-align: center">
        <img src="/fiore.svg" style="width: 200px" alt="" />
      </div>
      <div style="text-align: center; color: rgb(181, 113, 113)">
        <h4
          v-html="lingua === 'it' ? footerData.Titolo : footerData.Titolo_eng"
          style="font-weight: 600"
        ></h4>
      </div>
      <br />
      <p
        v-html="lingua === 'it' ? footerData.legenda : footerData.legenda_eng"
        style="padding: 4%; text-align: justify; color: #717171 !important"
      ></p>
      <p
        style="text-align: center; font-size: 14px; text-decoration: underline"
      >
        {{ lingua === "it" ? "CREDITI" : "CREDITS" }}
      </p>
      <div class="footer-images">
        <img src="/logo-fsc.png" alt="FSC Logo" style="max-width: 40%" />
        <img
          src="/a-emblema-2.png"
          alt="Emblema"
          style="max-width: 20%; padding-left: 25px"
        />
        <img
          src="/Matrice-Stemma-bg.png"
          alt="Stemma"
          style="max-width: 20%; padding-left: 25px"
        />
      </div>
      <br />
    </div>
    <div class="poi-scheda" v-if="scheda">
      <button
        @click="scheda = null"
        style="
          position: absolute;
          top: -1.25%;
          left: 0;
          background: transparent;
          border: none;
          font-size: 2.5em;
          cursor: pointer;
          color: #717171 !important;
          font-weight: 600;
        "
        aria-label="Chiudi scheda"
      >
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 22 22"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="icons"
            stroke="none"
            stroke-width=""
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="ui-gambling-website-lined-icnos-casinoshunter"
              transform="translate(-869.000000, -159.000000)"
              fill="#252528"
              fill-rule="nonzero"
            >
              <g
                id="square-filled"
                transform="translate(50.000000, 120.000000)"
              >
                <path
                  d="M820.716328,39.2890737 L830,48.573 L839.283672,39.2890737 C839.644156,38.9285898 840.211387,38.9008602 840.603678,39.2058851 L840.710926,39.3021143 C841.101451,39.6926386 841.101451,40.3258036 840.710926,40.7163279 L831.427,50 L840.710926,59.2836721 C841.07141,59.6441561 841.09914,60.2113872 840.794115,60.6036784 L840.697886,60.7109263 C840.307361,61.1014506 839.674196,61.1014506 839.283672,60.7109263 L830,51.427 L820.716328,60.7109263 C820.355844,61.0714102 819.788613,61.0991398 819.396322,60.7941149 L819.289074,60.6978857 C818.898549,60.3073614 818.898549,59.6741964 819.289074,59.2836721 L828.573,50 L819.289074,40.7163279 C818.92859,40.3558439 818.90086,39.7886128 819.205885,39.3963216 L819.302114,39.2890737 C819.692639,38.8985494 820.325804,38.8985494 820.716328,39.2890737 Z M819.996181,40.0092211 L829.987233,50 L819.996181,59.9907789 L820.009221,60.0038195 L830,50.0127671 L839.990779,60.0038195 L840.003819,59.9907789 L830.012767,50 L840.003819,40.0092211 L839.990779,39.9961805 L830,49.9872329 L820.009221,39.9961805 L819.996181,40.0092211 Z"
                  id="cancel"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <div style="text-align: center; color: rgb(181, 113, 113)">
        <h3 style="font-weight: 600 !important">
          {{ lingua === "it" ? scheda.titolo : scheda.titolo_ENG }}
        </h3>
      </div>
      <div
        style="margin-top: -20px; text-align: center"
        v-if="scheda.cover?.id"
      >
        <img
          :src="
            'https://db.santamariadellastradamatrice.it//assets/' +
            scheda.cover?.id
          "
          alt=""
          style="
            width: 100%;
            max-width: 400px;
            height: auto;
            border-radius: 10%;
            border: 15px solid rgba(181, 113, 113, 0.2);
            padding: 0 !important;
          "
        />
      </div>
      <div style="text-align: center">
        <table
          style="
            border-collapse: collapse;
            margin: auto;
            text-align: left;
            width: 80%;
          "
        >
          <tbody>
            <tr v-if="scheda.tipo">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Tipo" : "Type" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda.tipo_str  : scheda.tipo_eng_str }}
              </td>
            </tr>
            <tr v-if="scheda.autore">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Autore" : "Author" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda.autore : scheda.autore_ENG }}
              </td>
            </tr>
            <tr v-if="scheda.soggetto">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Soggetto" : "Subject" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda.soggetto : scheda.soggetto_ENG }}
              </td>
            </tr>
            <tr v-if="scheda.data">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Data" : "Date" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda.data : scheda.data_ENG }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style="
          max-height: 30%;
          overflow: auto;
          padding: 1em;
          margin: 1em 0;
          color: #717171 !important;
        "
      >
        <p
          v-html="lingua === 'it' ? scheda.descrizione : scheda.descrizione_ENG"
          style="text-align: justify; margin: 0"
        ></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
defineProps({
  lingua: {
    type: String,
    required: true,
  },
});
const lingua = ref(route.params.lingua || "it");
const poiTypes = ref([]);
const selectedTypes = ref([]);
const map = ref(null);
const activeArea = ref(null);
const footerData = ref();
const allMarkers = L.layerGroup();
const markers = ref([]);
const selectedLayer = ref("default");
const scheda = ref(null);
let baseLayer = null;
const visiblePoiTypes = ref([]);

const iconPaths = {
  cammini: "/marker-icon-2x-black.png",
  gold: "/marker-icon-2x-gold.png",
  natura: "/marker-icon-2x-green.png",
  "edifici storici": "/marker-icon-2x.png",
  archeologia: "/marker-icon-2x-orange.png",
  red: "/marker-icon-2x-red.png",
  chiese: "/marker-icon-2x-violet.png",
  arte: "/marker-icon-2x-yellow.png",
  default: "/marker-icon-2x-grey.png",
};

const iconCache = Object.fromEntries(
  Object.entries(iconPaths).map(([type, url]) => [
    type,
    L.icon({
      iconUrl: url,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
  ])
);
const layers = {
  default: L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution: false,
      subdomains: "abcd",
      maxZoom: 21,
      minZoom: 11,
    }
  ),
  voyager: L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ),
  voyagerLabels: L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ),
  stadia: L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
    {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "png",
    }
  ),
  OpenStreet: L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }),
};
watch(selectedLayer, (newVal) => {
  if (map.value && layers[newVal]) {
    map.value.removeLayer(baseLayer);
    baseLayer = layers[newVal];
    baseLayer.addTo(map.value);
  }
});
function showMarkerData(data) {
if (Array.isArray(data.tipo)) {
  const tipoArray = data.tipo;

  data.tipo_str = tipoArray
    .map((t) => t.poi_tipo_id?.tipo)
    .filter(Boolean)
    .join(", ");

  data.tipo_eng_str = tipoArray
    .map((t) => t.poi_tipo_id?.tipo_eng)
    .filter(Boolean)
    .join(", ");
} else {
  data.tipo_str = "";
  data.tipo_eng_str = "";
}

console.log(data);
scheda.value = data;

}

function goHome() {
  router.push({ name: "home" });
}
const updateVisiblePoiTypes = () => {
  if (!map.value) return;

  const bounds = map.value.getBounds();
  const visibleMarkers = markers.value.filter((marker) =>
    bounds.contains(marker.getLatLng())
  );

  const typesSet = new Set();
  visibleMarkers.forEach((marker) => {
    marker.poiTypes?.forEach((type) => typesSet.add(type));
  });

  visiblePoiTypes.value = poiTypes.value.filter((type) =>
    typesSet.has(type.tipo)
  );
};

const fetchPOIs = async () => {
  try {
    const [responseTouch, response] = await Promise.all([
      fetch(
        "https://db.santamariadellastradamatrice.it//items/Touch?limit=-1&fields=*.*.*"
      ),
      fetch(
        "https://db.santamariadellastradamatrice.it//items/POI?limit=-1&fields=*.*.*"
      ),
    ]);

    const touchInfo = await responseTouch.json();
    footerData.value = touchInfo.data[0];

    const imageIds = footerData.value.loghi.map(
      (logo) => logo.directus_files_id.id
    );

    const flattenedImageIds = imageIds.flat();
    footerData.value.images = flattenedImageIds;

    const data = await response.json();

    poiTypes.value = Array.from(
      new Map(
        data.data
          .flatMap(
            (item) => item.tipo?.map((t) => t.poi_tipo_id).filter(Boolean) || []
          )
          .map((obj) => [obj.id, obj])
      ).values()
    ).sort((a, b) => a.tipo.localeCompare(b.tipo));
    map.value = L.map("map", {
      maxBounds: [
        [41.461108, 14.577399],
        [41.917955, 14.941702],
      ],
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    }).setView([41.779565, 14.647518], 12.25);

    baseLayer = layers.default;
    baseLayer.addTo(map.value);

    markers.value = data.data
      .map(createMarker)
      .filter((marker) => marker !== null);
    renderMarkers();

    markers.value.forEach((marker) => allMarkers.addLayer(marker));

    allMarkers.addTo(map.value);
    map.value.on("moveend", updateVisiblePoiTypes);
    updateVisiblePoiTypes();

    document.getElementsByClassName(
      "leaflet-control-attribution"
    )[0].style.display = "none";
  } catch (error) {
    console.error("Error fetching POIs:", error);
  }
};
function renderMarkers() {
  requestIdleCallback(() => {
    markers.value.forEach((marker) => allMarkers.addLayer(marker));
    allMarkers.addTo(map.value);
    updateVisiblePoiTypes();
  });
}

function createMarker(poi) {
  if (!poi.mappa) return null;

  const [lon, lat] = poi.mappa.coordinates;
  const tipo = poi.tipo?.[0]?.poi_tipo_id.tipo || "default";
  const icon = iconCache[tipo] || iconCache.default;
  const titolo = lingua.value === "it" ? poi.titolo : poi.titolo_ENG;

  const marker = L.marker([lat, lon], { icon }).bindPopup(titolo);
  marker.data = poi;
  marker.poiTypes = poi.tipo?.map((t) => t.poi_tipo_id.tipo) || [];

  marker.on("click", () => showMarkerData(poi));
  return marker;
}

const setArea = (area) => {
  activeArea.value = area;

  const viewSettings = {
    A: { center: [41.625828, 14.709622], zoom: 14.25 },
    B: { center: [41.708944, 14.673752], zoom: 12.25 },
    SMS: { center: [41.63733, 14.714086], zoom: 18.25 },
  };

  if (map.value && viewSettings[area]) {
    const { center, zoom } = viewSettings[area];
    map.value.setView(center, zoom);
  }
};
const togglePOIType = (type) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
    selectedTypes.value = [...selectedTypes.value, type];
  }
};

watch(selectedTypes, updateVisibleMarkers, { deep: true });
function updateVisibleMarkers() {
  allMarkers.clearLayers();
  const filter = selectedTypes.value.length > 0;

  markers.value.forEach((marker) => {
    if (
      !filter ||
      selectedTypes.value.some((type) => marker.poiTypes.includes(type))
    ) {
      allMarkers.addLayer(marker);
    }
  });
}

onMounted(() => {
  fetchPOIs().then(() => {
    setArea("B");
    const attr = document.querySelector(".leaflet-control-attribution");
    attr?.classList?.add("hidden");
  });
});
</script>

<style scoped>
@font-face {
  font-family: "MyriadVariable";
  src: url("/Myriad Variable Concept.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
.hidden {
  display: none !important;
}

* {
  font-family: "MyriadVariable";
}
.map-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#map {
  height: 100%;
  width: 100%;
  z-index: 0;
}

.area-card-container {
  position: absolute;
  top: 5%;
  left: 2%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
  width: 15%;
  height: 40%;
}

.card-area {
  background-color: rgba(191, 191, 191, 0.9);
  color: #717171 !important;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px;
}

.card-area.active {
  background-color: rgba(181, 113, 113, 0.9);
  color: rgb(255, 255, 255) !important;

  border: 3px solid #ffffff;
}

.card-area h5 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
}
.tags-card {
  position: absolute;
  top: 50%;
  left: 2%;
  width: 15%;
  height: 30%;
  background-color: transparent;
  border-radius: 12px;
  z-index: 10;
  padding: 10px;
}

.tags-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.tag-card {
  background-color: rgba(191, 191, 191, 0.9);
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tag-card h5 {
  margin: 0;
  font-weight: 700;
  font-size: 16px;
}

.tag-card.active {
  border: 3px solid #ffffff;
  background-color: #444;
}

.info-card {
  background: url("/Mediamodifier-Design.svg");
  background-color: rgba(200, 200, 200, 0.7);
  background-size: 3000px;
  background-position-x: -400px;
  background-position-y: -600px;
  position: absolute;
  top: 5%;
  right: 2%;
  width: 17.5%;
  height: 85%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

.poi-scheda {
  background: url("/Mediamodifier-Design.svg");
  background-color: rgba(200, 200, 200, 0.7);
  background-size: 3000px;
  background-position-x: -400px;
  background-position-y: -600px;
  position: absolute;
  top: 0%;
  right: 0%;
  width: 25%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  backdrop-filter: blur(4px);
  padding: 1%;
}
.poi-scheda * {
  padding: 1%;
}
.change-layer {
  position: absolute;
  bottom: 2%;
  left: 2%;
  width: 15%;
  height: 7%;
  background-color: transparent;
  border-radius: 12px;
  z-index: 10;
  padding: 10px;
}

.mySVGS {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(222, 222, 222, 0.9);
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 100%;
}

.svg-left {
  flex-shrink: 0;
  margin-left: 2%;
}

.svg-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.change-layer label {
  font-size: 16px;
}
.checkbox-item {
  margin-bottom: 10px;
  font-weight: 600;
}

.tags-card h5 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
}

input[type="checkbox"] {
  transform: scale(1.5);
  margin-right: 10px;
}

label {
  text-transform: capitalize;
  font-size: 22px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 8px;
  padding: 10px;

  justify-content: center;

  align-content: center;
  margin-left: 25%;
}

.left-align {
  text-align: left;
  display: flex;
  align-items: center;
}
.checkbox-grid label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.card-area2 {
  background-color: rgba(191, 191, 191, 0.5);
  color: rgb(232, 230, 230);
}

.card-area2.active {
  background-color: var(--area-color);
  color: white;
}
.footer-images {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin: 30px;
}

.footer-images img {
  flex: 1;
  height: auto;
  object-fit: contain;
}
</style>
