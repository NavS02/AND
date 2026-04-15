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
        <h5>Matrice</h5>
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

    <div class="info-card" v-if="footerData && !scheda">
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
  <h1></h1>

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
          {{ lingua === "it" ? scheda?.titolo : scheda?.titolo_ENG }}
        </h3>
      </div>
      <div
        style="margin-top: -20px; text-align: center"
        v-if="scheda?.cover?.root"
      >
        <img
          :src="scheda?.cover?.root"
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
            <tr v-if="scheda?.tipo">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua == "it" ? "Tipo" : "Type" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua == "it" ? scheda?.tipo : scheda?.tipo_eng }}
              </td>
            </tr>
            <tr v-if="scheda?.autore">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Autore" : "Author" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda?.autore : scheda?.autore_ENG }}
              </td>
            </tr>
            <tr v-if="scheda?.soggetto">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Soggetto" : "Subject" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda?.soggetto : scheda?.soggetto_ENG }}
              </td>
            </tr>
            <tr v-if="scheda?.data">
              <th style="border: none; padding-right: 0.5em">
                {{ lingua === "it" ? "Data" : "Date" }}:
              </th>
              <td style="border: none; color: #717171 !important">
                {{ lingua === "it" ? scheda?.data : scheda?.data_ENG }}
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
          v-html="lingua === 'it' ? scheda?.descrizione : scheda?.descrizione_ENG"
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
let currentOverlay = null;
let matriceCircle = null;
let smsCircle = null;

const imageBoundsDefault = [
  [41.346108, 13.859399],
  [42.041955, 15.657702],
];

const imageBoundsA = [
  [41.6068, 14.69745],
  [41.6173, 14.72495],
];

const imageBoundsSMS = [
  [41.63436, 14.7061],
  [41.64036, 14.7221],
];

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
};

function showMarkerData(data) {
  console.log(data);
  scheda.value = data;
}
function goHome() {
  router.push({ name: "home" });
}
const updateVisiblePoiTypes = () => {
  if (!map.value) return;
  console.log("im here");
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
    const responseTouch = await fetch("/data/dataTouch.json");
    const touchInfo = await responseTouch.json();
    footerData.value = touchInfo.data[0];

    const imageIds = footerData.value.loghi.map(
      (logo) => logo.directus_files_id.id
    );

    const flattenedImageIds = imageIds.flat();
    footerData.value.images = flattenedImageIds;

    const response = await fetch("/data/dataPOI.json");
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
    const imageBounds = [
      [41.498108, 14.242399 - 0.001],
      [41.954955, 15.306702 - 0.001],
    ];

map.value = L.map("map", {
  crs: L.CRS.EPSG3857,
  maxBounds: imageBoundsDefault,
  maxBoundsViscosity: 1.0,
  zoomControl: false,
  attributionControl: false,
  minZoom: 11,
  maxZoom: 21,
  scrollWheelZoom: false,
  touchZoom: false,
  doubleClickZoom: false,
  keyboard: false,
         dragging: false,

});

map.value.dragging.disable();
    console.log(data);
    markers.value = data.data
      .map((poi) => {
        if (poi.mappa) {
          const lat = poi.mappa?.coordinates[1];
          const lon = poi.mappa?.coordinates[0];

          let iconUrl;

          switch (poi.tipo?.[0]?.poi_tipo_id.tipo) {
            case "cammini":
              iconUrl = "/marker-icon-2x-black.png";
              break;
            case "gold":
              iconUrl = "/marker-icon-2x-gold.png";
              break;
            case "natura":
              iconUrl = "/marker-icon-2x-green.png";
              break;
            case "edifici storici":
              iconUrl = "/marker-icon-2x.png";
              break;
            case "archeologia":
              iconUrl = "/marker-icon-2x-orange.png";
              break;
            case "red":
              iconUrl = "/marker-icon-2x-red.png";
              break;
            case "chiese":
              iconUrl = "/marker-icon-2x-violet.png";
              break;
            case "arte":
              iconUrl = "/marker-icon-2x-yellow.png";
              break;
            default:
              iconUrl = "/marker-icon-2x-grey.png";
          }

          const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          });
          let titolo;
          if (lingua.value === "it") {
            titolo = poi.titolo;
          } else {
            titolo = poi.titolo_ENG;
          }
          const marker = L.marker([lat, lon], { icon }).bindPopup(titolo);
          marker.data = poi;
          marker.poiTypes = poi.tipo?.map((t) => t.poi_tipo_id.tipo);
          marker.poiTypesEng = poi.tipo?.map((t) => t.poi_tipo_id.tipo_eng);
          marker.color = poi.tipo?.map((t) => t.poi_tipo_id.colore);
          marker.data.tipo = marker.poiTypes.join(", ");
          marker.data.tipo_eng = marker.poiTypesEng.join(", ");

          marker.on("click", () => {
            showMarkerData(marker.data);
            console.log(marker.data);
          });
          return marker;
        }
      })
      .filter((marker) => marker !== undefined);

    markers.value.forEach((marker) => allMarkers.addLayer(marker));

    allMarkers.addTo(map.value);
    updateVisiblePoiTypes();

    document.getElementsByClassName(
      "leaflet-control-attribution"
    )[0].style.display = "none";
  } catch (error) {
    console.error("Error fetching POIs:", error);
  }
};

const overlays = {
  A: L.imageOverlay("/mappa3.png", imageBoundsA),
  SMS: L.imageOverlay("/mappa2.png", imageBoundsSMS),
  default: L.imageOverlay("/mappa1.png", imageBoundsDefault),
};

const setArea = (area) => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }

  activeArea.value = area;

  const viewSettings = {
    A: { center: [41.613226, 14.710369], zoom: 17 },
    B: { center: [41.636532, 14.813551], zoom: 4 },
    SMS: { center: [41.63733, 14.714086], zoom: 18.25 },
    default: { center: [41.636532, 14.813551], zoom: 4 },
  };

  const overlayConfigs = {
    A: { url: "/mappa3.png", bounds: imageBoundsA },
    SMS: { url: "/mappa2.png", bounds: imageBoundsSMS },
    B: { url: "/mappa1.png", bounds: imageBoundsDefault },
    default: { url: "/mappa1.png", bounds: imageBoundsDefault },
  };

  const { center, zoom } = viewSettings[area] || viewSettings.default;
  const config = overlayConfigs[area] || overlayConfigs.default;

  const maxBounds = config.bounds;

  map.value = L.map("map", {
    center,
    zoom,
    maxBounds,
    maxBoundsViscosity: 1.0,
    zoomControl: false,
    attributionControl: false,
    minZoom: 11,
    maxZoom: 21,
    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: false,
    keyboard: false,
    crs: L.CRS.EPSG3857,
  });
map.value.dragging.disable();

map.value.touchZoom.disable();

map.value.scrollWheelZoom.disable();

map.value.doubleClickZoom.disable();

map.value.keyboard.disable();
  currentOverlay = L.imageOverlay(config.url, config.bounds);
  currentOverlay.addTo(map.value);

  allMarkers.clearLayers();

  if (area === "B") {
    const matriceCoords = [41.61, 14.7152];
    const smsCoords = [41.63725, 14.71395];

    matriceCircle = L.circle(matriceCoords, {
      radius: 1500,
      color: "rgb(181, 113, 113)",
      fillColor: "#ffffff95",
    }).addTo(map.value);

    // const arrowIcon = L.divIcon({
    //   html: `
    //     <div style="display: flex; align-items: center; user-select: none; width: 300px;">
    //       <div style="margin-right: 10px; font-size: 2.5rem; font-weight: bold; font-family: Arial, Helvetica, sans-serif; color: #b57171; background: transparent; white-space: nowrap;">
    //         Esplora Matrice
    //       </div>

    //       <svg width="80px" height="80px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b57171" style="flex-shrink: 0;">
    //         <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#b57171" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    //       </svg>
    //     </div>
    //   `,
    //   className: "",
    //   iconSize: [300, 80],
    //   iconAnchor: [0, 40],
    // });

    // L.marker([matriceCoords[0] -0.028, matriceCoords[1] - 0.27], {
    //   icon: arrowIcon,
    // }).addTo(map.value);

    smsCircle = L.circle(smsCoords, {
      radius: 1000,
      color: "rgb(181, 113, 113)",
      fillColor: "#ffffff95",
      fillOpacity: 0.5,
    }).addTo(map.value);


const fingerprintSVG = `
  <style>
    .fingerprint {
      width: 45px;
      height: 45px;
      fill: rgb(181, 113, 113);
      stroke: rgb(181, 113, 113);
      stroke-width: 0.0002;
      animation: pulse 2s infinite;
      transform-origin: center;
      display: block;
      margin: 0 auto;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.7;
      }
    }
  </style>

  <svg class="fingerprint" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.68 7.85c-.374.094-.607.497-.52.9.717 3.328.873 6.815.452 10.086-.053.41.212.79.592.846a.655.655 0 0 0 .097.007c.341 0 .639-.271.688-.646.444-3.452.28-7.128-.475-10.632-.087-.405-.46-.653-.834-.56zm-1.611 4.223c-.382.038-.663.404-.628.816.17 1.968.125 3.91-.132 5.772-.056.41.206.791.585.852a.612.612 0 0 0 .103.008c.339 0 .636-.267.687-.64.273-1.98.32-4.043.141-6.13-.035-.413-.386-.72-.756-.678zm1.09-6.659c-.784.197-1.45.712-1.876 1.449a3.445 3.445 0 0 0-.379 2.454c.088.41.168.82.237 1.229.068.408.44.677.809.603.378-.075.627-.466.558-.873a30.238 30.238 0 0 0-.25-1.299 1.853 1.853 0 0 1 .205-1.32c.23-.398.589-.676 1.01-.781.872-.22 1.741.37 1.943 1.309.746 3.461.942 6.93.58 10.309-.043.411.23.783.612.83a.647.647 0 0 0 .08.006c.349 0 .649-.282.69-.664.379-3.551.174-7.192-.608-10.82-.375-1.743-1.991-2.834-3.612-2.432zm-2.411.533a.79.79 0 0 0-.114-1.054.661.661 0 0 0-.976.123 5.744 5.744 0 0 0-.34.524 6.095 6.095 0 0 0-.67 4.343c.594 2.757.733 5.588.401 8.19-.052.41.214.788.594.845a.714.714 0 0 0 .096.006c.342 0 .64-.272.688-.647.353-2.78.207-5.8-.425-8.733a4.51 4.51 0 0 1 .746-3.597zm8.362 6.872c-.383.02-.68.372-.66.786a34.322 34.322 0 0 1-.059 4.131c-.032.414.253.775.636.81a.742.742 0 0 0 .057.002c.359 0 .663-.297.692-.69.107-1.422.128-2.878.062-4.327-.019-.414-.354-.723-.728-.712zm-.17-1.035a.649.649 0 0 0 .087-.006c.381-.05.65-.425.604-.836a37.924 37.924 0 0 0-.606-3.663c-.552-2.574-2.75-4.443-5.223-4.443-.391 0-.782.047-1.164.142-.316.08-.625.19-.921.327-.352.165-.514.607-.362.987.153.38.563.555.914.39.219-.102.45-.184.682-.242.278-.07.564-.104.85-.104 1.835 0 3.462 1.38 3.87 3.283.25 1.158.446 2.338.58 3.508.044.38.344.657.69.657zm2.342-5.068a8.344 8.344 0 0 0-2.02-3.913.66.66 0 0 0-.983 0 .8.8 0 0 0-.002 1.067 6.86 6.86 0 0 1 1.651 3.208c.647 3.003.937 6.085.861 9.098-.01.414.292.824.676.824h.019c.375 0 .684-.375.695-.782a40.575 40.575 0 0 0-.897-9.502zM3.39 12.855a.664.664 0 0 0 .102-.008c.38-.06.642-.442.587-.851a25.027 25.027 0 0 0-.332-1.887 7.148 7.148 0 0 1 .785-5.098c.883-1.53 2.267-2.598 3.894-3.006a5.846 5.846 0 0 1 4.193.558c.342.187.76.037.933-.333.173-.37.035-.821-.308-1.007a7.153 7.153 0 0 0-5.13-.68c-1.99.5-3.682 1.805-4.762 3.674a8.742 8.742 0 0 0-.96 6.232c.128.594.233 1.187.311 1.765.05.373.348.64.687.64zM3.597 14h-.023c-.384 0-.684.25-.672.663.027.848.004 1.58-.07 2.39-.037.412.242.778.624.818a.647.647 0 0 0 .069.003.671.671 0 0 0 .69-.625c.08-.875.106-1.723.077-2.637C4.28 14.207 3.97 14 3.597 14z"/>
  </svg>
`;
const fingerprintSVG2 = `
  <style>
    .fingerprint {
      
    }

    }
  </style>

  <svg style="width: 30px;
      height: 30px;
      fill: rgb(181, 113, 113);
      stroke: rgb(181, 113, 113);
      stroke-width: 0.0002;
      animation: pulse 2s infinite;
      transform-origin: center;
      display: block;
      margin: 0 auto;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.68 7.85c-.374.094-.607.497-.52.9.717 3.328.873 6.815.452 10.086-.053.41.212.79.592.846a.655.655 0 0 0 .097.007c.341 0 .639-.271.688-.646.444-3.452.28-7.128-.475-10.632-.087-.405-.46-.653-.834-.56zm-1.611 4.223c-.382.038-.663.404-.628.816.17 1.968.125 3.91-.132 5.772-.056.41.206.791.585.852a.612.612 0 0 0 .103.008c.339 0 .636-.267.687-.64.273-1.98.32-4.043.141-6.13-.035-.413-.386-.72-.756-.678zm1.09-6.659c-.784.197-1.45.712-1.876 1.449a3.445 3.445 0 0 0-.379 2.454c.088.41.168.82.237 1.229.068.408.44.677.809.603.378-.075.627-.466.558-.873a30.238 30.238 0 0 0-.25-1.299 1.853 1.853 0 0 1 .205-1.32c.23-.398.589-.676 1.01-.781.872-.22 1.741.37 1.943 1.309.746 3.461.942 6.93.58 10.309-.043.411.23.783.612.83a.647.647 0 0 0 .08.006c.349 0 .649-.282.69-.664.379-3.551.174-7.192-.608-10.82-.375-1.743-1.991-2.834-3.612-2.432zm-2.411.533a.79.79 0 0 0-.114-1.054.661.661 0 0 0-.976.123 5.744 5.744 0 0 0-.34.524 6.095 6.095 0 0 0-.67 4.343c.594 2.757.733 5.588.401 8.19-.052.41.214.788.594.845a.714.714 0 0 0 .096.006c.342 0 .64-.272.688-.647.353-2.78.207-5.8-.425-8.733a4.51 4.51 0 0 1 .746-3.597zm8.362 6.872c-.383.02-.68.372-.66.786a34.322 34.322 0 0 1-.059 4.131c-.032.414.253.775.636.81a.742.742 0 0 0 .057.002c.359 0 .663-.297.692-.69.107-1.422.128-2.878.062-4.327-.019-.414-.354-.723-.728-.712zm-.17-1.035a.649.649 0 0 0 .087-.006c.381-.05.65-.425.604-.836a37.924 37.924 0 0 0-.606-3.663c-.552-2.574-2.75-4.443-5.223-4.443-.391 0-.782.047-1.164.142-.316.08-.625.19-.921.327-.352.165-.514.607-.362.987.153.38.563.555.914.39.219-.102.45-.184.682-.242.278-.07.564-.104.85-.104 1.835 0 3.462 1.38 3.87 3.283.25 1.158.446 2.338.58 3.508.044.38.344.657.69.657zm2.342-5.068a8.344 8.344 0 0 0-2.02-3.913.66.66 0 0 0-.983 0 .8.8 0 0 0-.002 1.067 6.86 6.86 0 0 1 1.651 3.208c.647 3.003.937 6.085.861 9.098-.01.414.292.824.676.824h.019c.375 0 .684-.375.695-.782a40.575 40.575 0 0 0-.897-9.502zM3.39 12.855a.664.664 0 0 0 .102-.008c.38-.06.642-.442.587-.851a25.027 25.027 0 0 0-.332-1.887 7.148 7.148 0 0 1 .785-5.098c.883-1.53 2.267-2.598 3.894-3.006a5.846 5.846 0 0 1 4.193.558c.342.187.76.037.933-.333.173-.37.035-.821-.308-1.007a7.153 7.153 0 0 0-5.13-.68c-1.99.5-3.682 1.805-4.762 3.674a8.742 8.742 0 0 0-.96 6.232c.128.594.233 1.187.311 1.765.05.373.348.64.687.64zM3.597 14h-.023c-.384 0-.684.25-.672.663.027.848.004 1.58-.07 2.39-.037.412.242.778.624.818a.647.647 0 0 0 .069.003.671.671 0 0 0 .69-.625c.08-.875.106-1.723.077-2.637C4.28 14.207 3.97 14 3.597 14z"/>
  </svg>
`;

const fingerprintIconMatrice = L.divIcon({
  html: fingerprintSVG,
  className: "",
  iconSize: [50, 50],     
  iconAnchor: [25, 25],  
});

const fingerprintIconSMS = L.divIcon({
  html: fingerprintSVG2,
  className: "",
  iconSize: [50, 50],     
  iconAnchor: [25,15],   
});

const fingerprintMarkerMatrice = L.marker(matriceCoords, { icon: fingerprintIconMatrice }).addTo(map.value);
const fingerprintMarkerSMS = L.marker(smsCoords, { icon: fingerprintIconSMS }).addTo(map.value);


    fingerprintMarkerMatrice.on("click", () => {
      setArea("A");
    });
       fingerprintMarkerSMS.on("click", () => {
      setArea("SMS");
    });

    markers.value.forEach((marker) => {
      const latlng = marker.getLatLng();
      if (
        !matriceCircle.getBounds().contains(latlng) &&
        !smsCircle.getBounds().contains(latlng)
      ) {
        allMarkers.addLayer(marker);
      }
    });
  } else {
    markers.value.forEach((marker) => {
      allMarkers.addLayer(marker);
    });
  }

  allMarkers.addTo(map.value);
  updateVisiblePoiTypes();

  if (selectedTypes.value.length > 0) {
    allMarkers.clearLayers();
    markers.value.forEach((marker) => {
      if (selectedTypes.value.some((type) => marker.poiTypes.includes(type))) {
        allMarkers.addLayer(marker);
      }
    });
  }
};

const togglePOIType = (type) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
    selectedTypes.value = [...selectedTypes.value, type];
  }
};

watch(selectedTypes, () => {
  allMarkers.clearLayers();

  const isAreaB = activeArea.value === "B";

  if (selectedTypes.value.length === 0) {
    markers.value.forEach((marker) => {
      const latlng = marker.getLatLng();
      if (
        !isAreaB ||
        (matriceCircle &&
          smsCircle &&
          !matriceCircle.getBounds().contains(latlng) &&
          !smsCircle.getBounds().contains(latlng))
      ) {
        allMarkers.addLayer(marker);
      }
    });
  } else {
    markers.value.forEach((marker) => {
      const latlng = marker.getLatLng();
      if (
        selectedTypes.value.some((type) => marker.poiTypes.includes(type)) &&
        (!isAreaB ||
          (matriceCircle &&
            smsCircle &&
            !matriceCircle.getBounds().contains(latlng) &&
            !smsCircle.getBounds().contains(latlng)))
      ) {
        allMarkers.addLayer(marker);
      }
    });
  }
});

onMounted(() => {
  fetchPOIs().then(() => {
    setArea("B");
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
  z-index: 0;
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
