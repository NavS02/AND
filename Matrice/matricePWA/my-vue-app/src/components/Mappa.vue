<template>
  <div class="page-container">
    <div class="header-image">
      <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />
    </div>

    <div class="list-button" style="text-align: right; margin-right: 20px">
      <div @click="goToElenco()" class="link">
{{
          currentTranslations.visualizza_elenco || "Visualizza l'elenco"
        }}

         <span class="arrow">➔</span>
      </div>
    </div>

    <div id="map" class="map-container">
      <div id="map" class="map-container">
        <div class="map-controls-overlay">
          <button @click="mostraVista">+/-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const route = useRoute();
const router = useRouter();
const apiData = ref([]);
const currentView = ref("attuale");
let mapInstance;

const currentLanguage = ref("italiano");
const currentTranslations = ref({});
const loadTranslations = async () => {
  try {
    let data;
    const stored = localStorage.getItem("translations");

    if (stored) {
      data = JSON.parse(stored);
    } else {
      const response = await fetch("/translations.json");
      data = await response.json();
      localStorage.setItem("translations", JSON.stringify(data));
    }

    currentLanguage.value = route.params.lingua || "italiano";
    currentTranslations.value = data[currentLanguage.value];
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};
watch(
  () => route.params.lingua,
  async (newLang, oldLang) => {
    if (newLang !== oldLang) {
      await loadTranslations();
    }
  },
  { immediate: true }
);
function goToElenco() {
  router.push({ name: "Elenco", params: { lingua: route.params.lingua } });
}
function mostraVista() {
  if (currentView.value === "attuale") {
    mostraVistaEstesa();
    currentView.value = "estesa";
  } else {
    mostraVistaAttuale();
    currentView.value = "attuale";
  }
}
const fetchData = async () => {
  try {
    const datiMemorizzati = localStorage.getItem("poiData");

    if (datiMemorizzati) {
      apiData.value = JSON.parse(datiMemorizzati);
      addMarkersToMap();
    } else {
      const risposta = await fetch(
        "https://db.santamariadellastradamatrice.it/items/POI?fields=*.*.*"
      );
      const dati = await risposta.json();
      apiData.value = dati.data;

      localStorage.setItem("poiData", JSON.stringify(dati.data));
      addMarkersToMap();
    }
  } catch (error) {
    console.error("Errore nel recuperare i dati dall'API:", error);
  }
};


const mostraVistaAttuale = () => {
  const bounds = [
    [41.6354, 14.71336],
    [41.63685, 14.71467],
  ];
  const hole = [
    [41.6354, 14.71337],
    [41.6354, 14.71467],
    [41.6368, 14.71467],
    [41.6368, 14.71337],
  ];

  mapInstance.eachLayer((layer) => {
    if (layer instanceof L.ImageOverlay || layer instanceof L.Polygon) {
      mapInstance.removeLayer(layer);
    }
  });

  const outer = [
    [
      [-90, -180],
      [90, -180],
      [90, 180],
      [-90, 180],
    ],
  ];

  L.polygon([outer[0], hole], {
    color: "#ffffff",
    fillColor: "#ffffff",
    fillOpacity: 1,
    weight: 0,
    interactive: false,
  }).addTo(mapInstance);

  L.imageOverlay("/mappaChiaro.svg", bounds, {
    opacity: 1,
    rotationAngle: 50,
  }).addTo(mapInstance);

  mapInstance.setMaxBounds(bounds);
  mapInstance.setView([41.636095, 14.714031], 18.5);
};

const mostraVistaEstesa = () => {
  const centerLat = 41.637504;
  const centerLng = 14.71402;

  const latRadius = 0.008;
  const lngRadius = 0.008;

  const bounds = [
    [centerLat - latRadius, centerLng - lngRadius],
    [centerLat + latRadius - 0.0006, centerLng + lngRadius - 0.00018],
  ];

  const hole = [
    [41.638, 14.7136],
    [41.638, 14.7144],
    [41.639, 14.7144],
    [41.639, 14.7136],
  ];

  mapInstance.eachLayer((layer) => {
    if (layer instanceof L.ImageOverlay || layer instanceof L.Polygon) {
      mapInstance.removeLayer(layer);
    }
  });

  const outer = [
    [
      [-90, -180],
      [90, -180],
      [90, 180],
      [-90, 180],
    ],
  ];

  L.polygon([outer[0], hole], {
    color: "#ffffff",
    fillColor: "#ffffff",
    fillOpacity: 0,
    weight: 0,
    interactive: false,
  }).addTo(mapInstance);

  L.imageOverlay("/mappaVilla.svg", bounds, {
    opacity: 1,
  }).addTo(mapInstance);

  mapInstance.setMinZoom(16);

  mapInstance.setMaxBounds(bounds);
  mapInstance.setView([41.637251, 14.713944
], 16.5);
};

const addUserLocationToMap = (map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: "#87b4eb",
          color: "#FFFFFF",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        map.setView([lat, lng], 19);
      },
      (error) => {
        console.error("Error :", error);
      }
    );
  }
};

const addMarkersToMap = () => {
  mapInstance = L.map("map", {
    center: [41.636095, 14.714031],
    zoom: 18.5,
    minZoom: 18,
    maxZoom: 21,
    maxBounds: [
      [41.6354, 14.71337],
      [41.6368, 14.71467],
    ],
    maxBoundsViscosity: 1.0,
    zoomSnap: 0.25,
    zoomDelta: 1,
    inertia: false,
    worldCopyJump: false,
    noWrap: true,
    zoomControl: false,
  });

  mostraVistaAttuale();

  apiData.value.forEach((poi) => {
    if (poi.app_ts.includes("APP") && poi.mappa) {
      const [lng, lat] = poi.mappa.coordinates;
      const tipo = poi.tipo?.[0]?.poi_tipo_id?.tipo?.toLowerCase() || "";
      let iconUrl;

      switch (tipo) {
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

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
      }).addTo(mapInstance);
      if(currentLanguage.value=== "italiano") {
        marker.bindPopup(`<b>${poi.titolo}</b><br>`);
      } else {
      marker.bindPopup(`<b>${poi.titolo_ENG}</b><br>`);

      }
    }
  });

  document.querySelector(".leaflet-control-attribution")?.remove();

  addUserLocationToMap(mapInstance);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.header-title {
}

.list-button {
  text-align: center;
  margin: 1rem 0;
}

.link {
  color: #c20000;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
}

.arrow {
  margin-left: 0.3rem;
}

.map-container {
  height: calc(100vh - 300px);
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.map-controls button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #c20000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.map-controls button:hover {
  background-color: #a10000;
}

.leaflet-container {
  background-color: white;
}
.map-controls-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1000;
}
.map-controls-overlay button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c20000;
  color: white;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}
.map-controls-overlay button {
  background-color: #c20000;
  color: white;
  border: none;
  border-radius: 5px;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.map-controls-overlay button:hover {
  background-color: #a10000;
}
</style>
