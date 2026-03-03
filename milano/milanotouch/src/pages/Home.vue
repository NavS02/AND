<template>
  <div class="page-container">
    <div class="map-container">
      <div id="map"></div>

      <div class="panel" style="width: 22% !important">
        <div v-if="itemData !== null">
          <div class="item-container">
            <div class="text-center" style="margin-top: 0">
              <h5
                style="
                  font-family: 'Montserrat', sans-serif;
                  color: #142684;
                  font-weight: 700;
                "
              >
                {{ itemData.nome }}
                
              </h5>
              <div style=" font-family: 'Montserrat', sans-serif;
                  color: black;
                  font-weight: 600;font-size: 18px;">
                  {{itemData.comune}}</div>
            

            </div>
            <br>
                
            <br />
            <div style="margin: 0; padding: 0">
              <img
                :src="url + '/assets/' + itemData.icona"
                style="width: 100%"
              />
            </div>
            <div style="padding: 5%">
              <hr />
            </div>
            <div
              class="description-container"
              style="
                overflow-y: auto;
                max-height: 800px;
                padding-left: 5%;
                padding-right: 5%;
                text-align: justify;
                font-weight: 500;
              "
              v-html="
                showFullDescription
                  ? itemData.descrizione_breve
                  : truncatedDescription
              "
            ></div>

            <button
              v-if="showMoreButton"
              class="readMoreBtn"
              style="float: right"
              @click="showChiesa(itemData)"
            >
              Leggi di più
            </button>
            <br />
            <div style="padding: 5%">
              <hr />
            </div>
            <div
              class="accordion"
              id="accordionExample"
              style="padding-left: 2%; padding-right: 5%"
            >
              <div class="accordion-item">
                <h2
                  class="accordion-header"
                  id="headingThree"
                  style="margin-left: 0; margin-right: 0"
                >
                  <button
                    class="accordion-button headerAccordion"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                    style="padding-left: 0; padding-right: 0"
                  >
                    <span style="margin-left: 3%">Opere</span>
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div
                      v-for="opera in itemData.items"
                      :key="opera.id"
                      class="card"
                      style="display: flex"
                    >
                      <div
                        class="card-body"
                        style="display: flex; align-items: center; padding: 0"
                        @click="showItem(opera)"
                      >
                        <div
                          style="
                            width: 100px;
                            height: 80px;
                            overflow: hidden;
                            margin-right: 1%;
                          "
                        >
                          <img
                            :src="url + '/assets/' + opera.icona"
                            style="width: 80px; height: 80px; object-fit: cover"
                          />
                        </div>
                        <h5 class="card-title" style="font-size: 16px">
                          {{
                            opera.titolo.length > 40
                              ? opera.titolo.slice(0, 40) + "..."
                              : opera.titolo
                          }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="itemData == null">
          <div class="text-center" style="color: #00458d; margin-top: 25%">
            <img src="/MuseoDiocesano_CMYK.png" alt="" style="width: 350px" />
            <br /><br /><br />
            <h1 style="margin-top: 15%">IL MUSEO</h1>
            <h1>E</h1>
            <h1>IL TERRITORIO DELLA DIOCESI AMBROSIANA</h1>
          </div>
          <div
            style="
              margin-top: 15%;
              text-align: center;
              color: #00458d;
              padding: 20px;
            "
          >
            <h4>
              Fai clic su un pin per scoprire i luoghi di provenienza delle
              opere giunte in Museo dal territorio della Diocesi
            </h4>
          </div>
          <div style="margin-top: 5%; text-align: center">
            Realizzato con il contributo di:<br /><img
              src="/logo-fondazionecariplo.png"
              style="width: 50%"
              alt=""
              srcset=""
            />
            <br />
            <br />

            <button
              id="chiudi2"
              type="button"
              class="btn btn-danger"
              style="
                font-size: 20px;
                font-weight: 600;
                padding: 10px 20px;
                z-index: 9999 !important;
                background-color: var(--default-color-06);
              "
              @click="showCredits()"
            >
              Crediti
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div id="myModal" class="modal">
      <div class="modal-dialog" style="width: 80%"></div>
      <div class="modal-dialogCrediti"></div>
      <div class="modal-dialogChiesa"></div>
    </div>
    <div class="footerPanel">
      <!-- <button
        class="custom-btn2 btn-3"
        id="layoutbtn"
        style="margin-right: 10px; padding: 5px 10px"
        @click="toggleLayer()"
      >
        <span style="margin-top: 8%"> Mostra la Diocesi </span>
      </button> -->
      <div class="footer" style="font-size: 25px">
        <button
          class="custom-btn btn-3"
          @click="selectView('milano')"
          id="milanoBtn"
          style="margin-right: 10px; padding: 5px 10px"
        >
          <span style="margin-top: 8%">
            <font-awesome-icon icon="fa-regular fa-building" /> &nbsp; Milano
          </span>
        </button>
        <button
          class="custom-btn btn-3"
          @click="selectView('comune')"
          id="comuneBtn"
          style="margin-right: 10px; padding: 5px 10px"
        >
          <span style="margin-top: 8%">
            <font-awesome-icon icon="fa-solid fa-map-location-dot" /> &nbsp;
            Diocesi
          </span>
        </button>
        <button
          class="custom-btn btn-3"
          @click="goOpere()"
          style="padding: 5px 10px"
        >
          <span style="margin-top: 8%">Le Opere</span>
        </button>
        <button
          class="custom-btn2 btn-3-home"
          style="background: lightgrey; margin-left: 6%"
          onclick="location.reload();"
        >
          <span style="margin-top: 8%">
            <font-awesome-icon icon="fa-solid fa-house"
          /></span>
        </button>
      </div>
    </div>
    <div
      id="test"
      style="
        font-size: 25px;
        position: absolute;
        bottom: 20px;
        right: 25%;
        z-index: 1001 !important;
      "
    ></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { directus } from "../API";
import { ref, onMounted, shallowReactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const itemData = ref(null);
const showFullDescription = ref(false);
const truncatedDescription = ref("");
const showMoreButton = ref(false);
const map = ref(null);
const route = useRoute();
const router = useRouter();
const chiese = ref([]);
const continueL = ref(true);
const url = ref(import.meta.env.VITE_API_BASE_URL);
const showOpera = ref(false);
const imageOverlay = ref(null);
const layoutIsChecked = ref(true);
onMounted(async () => {
  map.value = L.map("map", {
    zoomControl: false,
    maxBounds: [
      [45.030996, 10.232882],
      [46.274211, 8.244939],
    ],
  }).setView([45.4642, 9.19], 15);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '<a href="https://www.ambientinarratividigitali.it/">AND srl</a>',
      subdomains: "abcd",
      maxZoom: 17,
      minZoom: 10,
      maxBounds: [
        [45.030996, 10.232882],
        [46.274211, 8.244939],
      ],
    }
  ).addTo(map.value);

  const response = await directus.items("touch").readByQuery({
    filter: {
      pubblicata: { _eq: true },
    },
    sort: "data",
    limit: -1,
  });

  // const response2 = await directus.items("touch_comune").readByQuery({});
  // const response3 = await directus.items("touch_tipologia").readByQuery({});
  const response4 = await directus.items("touch_chiesa").readByQuery({});

  const data = response.data;
  let activeMarker = null;

  data.forEach((item) => {
    if (item.chiesa !== null) {
      const findObject = response4.data.find((obj) => obj.id == item.chiesa);
      response4.data.forEach((chiesa) => {
        if (item.chiesa == chiesa.id) {
          item.chiesa = chiesa.nome;
        }
      });
      if (findObject) {
        if (continueL.value) {
          continueL.value = false;
        }

        // Create a marker and add it to the map
        const marker = L.marker(
          [findObject.mappa.coordinates[1], findObject.mappa.coordinates[0]],
          {
            icon: L.icon({
              iconUrl: "/marker-icon-2x.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }
        ).addTo(map.value);
        marker.on("click", () => {
          if (activeMarker) {
            // Reset the icon of the active marker
            activeMarker.setIcon(
              L.icon({
                iconUrl: "marker-icon.png",
              })
            );
          }

          // Set the new active marker
          activeMarker = marker;

          // Change the icon of the clicked marker
          marker.setIcon(
            L.icon({
              iconUrl: "marker-icon-red.png",
            })
          );

          // Update the itemData
          itemData.value = findObject;
        });

        if (!findObject.items) {
          findObject.items = [];
        }

        findObject.items.push(item);
      }
    }
  });
});

function selectView(view) {
  if (view === "milano") {
    let element = document.getElementById("milanoBtn");
    element.style.backgroundColor = "var(--default-color-1) ";

    let element2 = document.getElementById("comuneBtn");
    element2.style.backgroundColor = "var(--default-color-06)";
    map.value.setView([45.4642, 9.19], 15);
    // let filterEl = document.getElementById("layoutbtn");
    toggleLayer("disable");

    // filterEl.style.display = "none";
  } else if (view === "comune") {
    let element = document.getElementById("comuneBtn");
    element.style.backgroundColor = "var(--default-color-1) ";
    let element2 = document.getElementById("milanoBtn");
    element2.style.backgroundColor = "var(--default-color-06)";
    map.value.setView([45.640761, 9.193226], 10);
    // let filterEl = document.getElementById("layoutbtn");
    // filterEl.style.display = "block";
    toggleLayer("active");
  }
}

function toggleLayer(action) {
  if (action === "disable") {
    map.value.eachLayer(function (layer) {
      if (layer instanceof L.GeoJSON) {
        map.value.removeLayer(layer);
      }
    });
    layoutIsChecked.value = true;
    // let element = document.getElementById("layoutbtn");
    // element.style.backgroundColor = "var(--default-color-06) ";
  } else if (action === "active" && !layoutIsChecked.value) {
    fetch("/out.json")
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: function (feature) {
            return {
              color: feature.properties.color,
              weight: 5,
            };
          },
        }).addTo(map.value);
      });
    layoutIsChecked.value = false;
    // let element = document.getElementById("layoutbtn");
    // element.style.backgroundColor = "var(--default-color-1) ";
  } else if (layoutIsChecked.value) {
    fetch("/out.json")
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: function (feature) {
            return {
              color: feature.properties.color,
              weight: 5,
            };
          },
        }).addTo(map.value);
      });
    layoutIsChecked.value = false;
    // let element = document.getElementById("layoutbtn");
    // element.style.backgroundColor = "var(--default-color-1) ";
  } else {
    map.value.eachLayer(function (layer) {
      if (layer instanceof L.GeoJSON) {
        map.value.removeLayer(layer);
      }
    });
    layoutIsChecked.value = true;
    let element = document.getElementById("layoutbtn");
    element.style.backgroundColor = "var(--default-color-06) ";
  }
}

function goOpere() {
  router.push({ name: "opere" });
}

function showItem(item) {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialog");
  const modalDialog2 = myModal.querySelector(".modal-dialogCrediti");
  const modalDialog3 = myModal.querySelector(".modal-dialogChiesa");
  modalDialog.innerHTML += `
  <div class="item-container" style="padding: 1%;width:100%;height:900px !important;">
    <div class="text-center" style="width: 100%">
      <h5
        style="
          font-weight: bold;
          font-family: Montserrat;
          color: #00458d;
          background-color: white;
          margin: -10px;
        "
      >
    
      </h5>
      <div class="text-right closeBtn" style="text-align: right">
          <button
            id="chiudi" 
            type="button"
            class="btn btn-danger"
            style="
              font-size: 20px;
              font-weight: 600;
              padding: 10px 20px;
              z-index: 9999 !important;
              background-color:var(--default-color-06)

            "
            
          >
            Chiudi
          </button>
        </div>
    </div>
    <br />
  </h3>
    <h4 style="font-weight:600">${item.autore ? item.autore : ""}</h4>

    <h5>  ${item.titolo ? item.titolo : ""}</h5>

    <br />
  <div class="row">
  <div class="col-6 text-center" >
 <img src="${url.value + "/assets/" + item.icona}" alt="${
    item.titolo
  }" style="max-width: 90%; max-height: 700px" />
  </div>
  <div class="col-6" >
 <ul style="font-size:16px">
      <li><strong>Materia e tecnica: </strong>${item.materia ? item.materia : ""}</li>
    ${
      item.provenienza
        ? `<li><strong>Provenienza: </strong>${item.provenienza}</li>`
        : ""
    }

<li>
  <strong>Collocazione in museo: </strong>
  ${item.piano ? item.piano : ""}
  ${item.piano && (item.sala || item.parete || item.specifiche) ? ", " : ""}
  ${item.sala ? item.sala : ""}
  ${item.sala && (item.parete || item.specifiche) ? ", " : ""}
  ${item.parete ? item.parete : ""}
  ${item.parete && item.specifiche ? ", " : ""}
  ${item.specifiche ? item.specifiche : ""}
</li>


    </ul>
   <div style="padding-left:10%;padding-right:10%"><hr></div>
     <div
      class="description-container"
      style="overflow-y: auto; max-height: 800px"
    >
      ${item.descrizione ? item.descrizione : ""}
    </div>
  </div>
</div>
   
  </div>
`;
  var btnClose = document.getElementById("chiudi");
  btnClose.addEventListener("click", closeModal);
  myModal.style.display = "block";
  modalDialog2.style.display = "none";
  modalDialog3.style.display = "none";
  modalDialog.style.display = "block";
}

function closeModal() {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialog");
  const modalDialogC = myModal.querySelector(".modal-dialogCrediti");
  const modalDialogChiesa = myModal.querySelector(".modal-dialogChiesa");
  modalDialogChiesa.innerHTML = "";
  modalDialogC.innerHTML = "";
  modalDialog.innerHTML = "";
  myModal.style.display = "none";
}
watch(
  () => itemData,
  () => {
    showFullDescription.value = false;
    truncateDescription();
  },
  { deep: true }
);

const truncateDescription = () => {
  if (itemData && itemData.value.descrizione_breve) {
    let description = itemData.value.descrizione_breve;
    if (description.length > 300) {
      const lastSpaceIndex = description.lastIndexOf(" ", 300);
      truncatedDescription.value =
        description.substring(0, lastSpaceIndex) + "...";
      showMoreButton.value = true;
    } else {
      truncatedDescription.value = description;
      showMoreButton.value = false;
    }
  }
};

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
function showCredits() {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialogCrediti");
  const modalDialog2 = myModal.querySelector(".modal-dialog");
  const modalDialog3 = myModal.querySelector(".modal-dialogChiesa");
  modalDialog2.display = "none";
  modalDialog.innerHTML += `
  <div class="item-container" style="padding: 1%;width:100%">
    <div class="text-center" style="width: 100%">
      
      <div class="text-right closeBtn" style="text-align: right">
          <button
            id="chiudi" 
            type="button"
            class="btn btn-danger"
            style="
              font-size: 20px;
              font-weight: 600;
              padding: 10px 20px;
              z-index: 9999 !important;
              background-color:var(--default-color-06)

            "
            
          >
            Chiudi
          </button>
          <br>
       
        </div>
          <img src="/MuseoDiocesano_CMYK.png" style="width: 420px;">
          <br>
          <br>
          <br>
          Realizzato con il contributo di Fondazione CARIPLO
          <img src="/logo-fondazionecariplo.png" style="width:380px;">
          <br>
          <br>
          <br>
           Ideazione e software:
           <br>
          <img src="/logoAND.png" style="width:270px">
    </div>
 
   
  </div>
`;
  var btnClose = document.getElementById("chiudi");
  btnClose.addEventListener("click", closeModal);
  myModal.style.display = "block";
  modalDialog2.style.display = "none";
  modalDialog3.style.display = "none";
}
function showChiesa(item) {
  const myModal = document.getElementById("myModal");
  const modalDialog = myModal.querySelector(".modal-dialog");
  const modalDialog2 = myModal.querySelector(".modal-dialogCrediti");
  const modalDialog3 = myModal.querySelector(".modal-dialogChiesa");
  modalDialog.innerHTML += `
  <div class="item-container" style="padding: 1%;width:100%;height:900px !important;">
    <div class="text-center" style="width: 100%">
      <h5
        style="
          font-weight: bold;
          font-family: Montserrat;
          color: #00458d;
          background-color: white;
          margin: -10px;
        "
      >
    
      </h5>
      <div class="text-right closeBtn" style="text-align: right">
          <button
            id="chiudi" 
            type="button"
            class="btn btn-danger"
            style="
              font-size: 20px;
              font-weight: 600;
              padding: 10px 20px;
              z-index: 9999 !important;
              background-color:var(--default-color-06)

            "
            
          >
            Chiudi
          </button>
        </div>
    </div>
    <br />
    <h4 style="font-weight:600"> ${item.nome}</h4>
    <h5>${item.comune}</h5>

    <br />
<div class="row" style="max-height:75% !important;">
  <div class="col-6 text-center" >
 <img src="${url.value + "/assets/" + item.icona}" alt="${
    item.titolo
  }" style="max-width: 90%; max-height: 700px" />
  </div>
  <div class="col-6" >
 
   <div style="padding-left:10%;padding-right:10%"><hr></div>
     <div
      class="description-container"
      style="overflow-y: auto; max-height: 600px"
    >
      ${item.descrizione_breve ? item.descrizione_breve : ""}
    </div>
  </div>
</div>
   
  </div>
`;
  var btnClose = document.getElementById("chiudi");
  btnClose.addEventListener("click", closeModal);
  myModal.style.display = "block";
  modalDialog2.style.display = "none";
  modalDialog3.style.display = "none";
  modalDialog.style.display = "block";
}
(function () {
  const refreshTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  let timeout;

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      location.reload();
    }, refreshTime);
  }

  window.addEventListener("DOMContentLoaded", resetTimer);
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("mousedown", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("scroll", resetTimer);
  window.addEventListener("touchstart", resetTimer);
})();
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
* {
  font-family: "Montserrat";
}
:root {
  --default-color-06: rgba(18, 81, 132, 0.6);
  --default-color-1: rgba(18, 81, 132, 1);
}
.custom-btn {
  width: 180px;
  height: 70px;
  color: #fff;
  padding: 10px 25px;
  font-family: "Montserrat";
  font-weight: 500;
  background: transparent;
  cursor: none;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.custom-btn2 {
  width: 70px;
  height: 70px;
  color: #fff;
  padding: 10px 25px;
  font-family: "Montserrat";
  font-weight: 500;
  background: transparent;
  cursor: none;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
.buttonHome {
  width: 70px;
  height: 70px;
}

.btn-3 {
  background: rgba(18, 80, 132, 0.6);
  border-radius: 15px;
  width: 200px;
  height: 80px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3-home {
  background: rgba(18, 80, 132, 0.6);
  border-radius: 15px;
  width: 80px;
  height: 80px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3-2 {
  background: #0051cc;
  width: 80px;
  height: 80px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-danger {
  background: rgba(104, 4, 12, 0.85);
  border: none;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.map-container {
  flex: 1;
  position: relative;
  z-index: 0;
}
.map-container2 {
  flex: 1;
  position: relative;
  z-index: 0;
  justify-content: center;
  overflow: hidden;
}

#map {
  width: 100% !important;
  height: 100% !important;
}
#map img{
  image-resolution: 300dpi;
}
#map2 {
  width: 100% !important;
  height: 300px !important;
  overflow: hidden;
}

.panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 22%;
  height: 100%;
  background-color: rgba(248, 248, 248, 0.827);
  padding-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
.footerPanel {
  position: fixed;
  bottom: 0;
  left: 0;
  bottom: 20px;
  background: transparent;
  padding: 10px;
  height: 100px;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 30%;
  right: 30%;
  bottom: 20px;
  text-align: center;
  background: transparent;
  padding: 10px;
  height: 100px;
}
.header {
  position: fixed;
  bottom: 0;
  top: 20px;
  text-align: center;
  background: transparent;
  padding: 10px;
  height: 100px;
}

.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.closeBtn {
  z-index: 1000 !important;
}
.modal-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 80%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  font-family: Montserrat;
}
.modal-dialogCrediti {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 70%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  font-family: Montserrat;
}
.modal-dialogChiesa {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  font-family: Montserrat;
}

h3,
h4,
h5 {
  font-family: Montserrat;
}

.description-container {
  overflow-y: auto;
  max-height: 800px;
  word-wrap: break-word;
  font-family: "Montserrat", sans-serif;
}
.readMoreBtn {
  color: white;
  background-color: var(--default-color-06);
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
  border-width: 0;
  border-radius: 5px;
  margin-right: 5%;
}
.headerAccordion {
  background-color: var(--default-color-06) !important;
  color: white !important;
  font-weight: 550;
}

.content::-webkit-scrollbar {
  display: none;
}
.accordion-button::after {
  background-image: initial;
}

.accordion-button:not(.collapsed)::after {
  background-image: initial;
}
#layoutbtn {
  display: none;
}
* {
  cursor: none !important;
}
</style>
