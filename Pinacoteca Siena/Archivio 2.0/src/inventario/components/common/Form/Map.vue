<template>
  {{ field.label }}:
  <br />
  <br />
  <div id="map-container">
    <div id="map"></div>
    <pre id="coordinates" class="coordinates"></pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { toRefs, computed } from "vue";
const props = defineProps({
  modelValue: {},
  field: {},
});
const emit = defineEmits(["update:modelValue"]);

const { modelValue, field } = toRefs(props);

const data = computed({
  get() {
    return modelValue.value;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmF2czAyIiwiYSI6ImNsa2kxM2lybDA2Yncza21qb2YxeW5ndnIifQ.8ld3MBwHYeIBZjobdOE_5A";
  const coordinates = document.getElementById("coordinates");
  const mapContainer = document.getElementById("map-container");
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: data.value ? data.value.coordinates : [9.19, 45.4642], // Use data.value if not null, otherwise use a default value
    zoom: 8,
  });
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
  );
  const marker = new mapboxgl.Marker({
    draggable: true,
  })
    .setLngLat(data.value ? data.value.coordinates : [9.19, 45.4642]) // Use data.value if not null, otherwise use a default value
    .addTo(map);

  function onDragEnd() {
    const lngLat = marker.getLngLat();
    coordinates.style.display = "block";
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    const newCoordinates = [lngLat.lng, lngLat.lat];
    
    if (data.value) {
      data.value.coordinates = newCoordinates;
      field.value = data.value;
    } else {
      // If data.value is null, create a new object
      data.value = {
        type: "Point",
        coordinates: newCoordinates,
      };
      field.value = data.value;
    }
  }

  marker.on("dragend", onDragEnd);

  map.on("resize", () => {
    map.resize();
  });
});
</script>


<style scoped>
.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 40px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  border-radius: 3px;
  display: none;
}

#map-container {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  width: 800px;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
