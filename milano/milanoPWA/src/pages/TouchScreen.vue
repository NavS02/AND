<template>
  <div id="map" style="height: 80vh; width: 100%; margin-top: 2%"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { directus } from "../API";

export default {
  async mounted() {
    const map = L.map("map").setView([45.4642, 9.19], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "<a href='https://www.ambientinarratividigitali.it/'><strong>AND srl<strong></a>",
    }).addTo(map);
    try {
      const response = await directus.items("touch").readByQuery({
        filter: {
          pubblicata: { _eq: true },
        },
        limit: -1,
      });
let url = import.meta.env.VITE_API_BASE_URL;
      const data = response.data;
      data.forEach((item) => {
        item.icona= url + "/assets/" + item.icona;
        const marker = L.marker([
          item.mappa.coordinates[1],
          item.mappa.coordinates[0],
        ]).addTo(map);
        const popupContent = `
        <div >
        <h4>${item.titolo} </h4>
          <div class="text-center">
            <img src='${item.icona}' style='max-width:100px'/>
            <br>
          </div>
          </div>
          
        `;

        marker.bindPopup(popupContent);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
