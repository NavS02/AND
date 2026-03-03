<template>
  <div class="text-left">
    <img
      src="/MuseoDiocesano_CMYK.jpg"
      alt=""
      style="width: 250px; margin-top: 5px"
    />
    <hr />
  </div>
  <div class="text-center">
    <button
      type="button"
      class="btn btn-light"
      style="margin-right: 40px"
      @click="setnewView('Map')"
    >
      Mappa
    </button>
    <button type="button" class="btn btn-light" @click="setnewView('Lista')">
      Lista
    </button>
    <div v-if="optionSelected === 'Lista'">
      <ListItems :itemsData="items" />
    </div>
  </div>
  <div id="map" v-if="optionSelected === 'Map'">
    <div class="mycarousel" style="margin-top: 20px">
      <carousel :items-to-show="1" @slide-end="setNewPiano()">
        <slide :key="slide">
          <img
            usemap="#workmap3"
            src="/pianoTerra.png"
            style="width: 366px; height: 358px"
            id="piano terra"
          />
          <map name="workmap3" id="clickableimagearea3">
            <area
              shape="poly"
              coords="71.8216033777786,84.33597366330063,258.4489515488245,85.96828283097742,256.8166423811477,111.5411264579137,72.36570643367087,110.9970234020214"
              target="_self"
              rel=""
              @click="selectedRoom('Opere IV – XVII sec.')"
            />
            <area
              target=""
              alt=""
              title=""
              coords="278,119,315,80"
              shape="rect"
              @click="selectedRoom('Crociera')"
            />

            <area
              shape="poly"
              coords="276.4043523932691,38.08721391245835,276.9484554491614,69.10108809831729,341.1526160444484,38.63131696835061,340.6085129885561,70.18929421010182"
              target="_self"
              rel=""
              @click="selectedRoom('Sculture di Lucio Fontana XX sec.')"
            />
            <area
              shape="poly"
              coords="275.8602493373769,119.1585692404054,313.9474632498352,119.1585692404054,315.0356693616198,252.4638179340096,274.7720432255923,251.9197148781174"
              target="_self"
              rel=""
              @click="
                selectedRoom(
                  'Sala dell’Arciconfraternita del SS. Sacramento (dipinti XVIII sec.)'
                )
              "
            />
            <area
              shape="poly"
              coords="48.96927503030359,130.0406303582506,70.73339726599409,132.2170425818197,70.73339726599409,287.8305165670066,47.88106891851907,287.8305165670066"
              target="_self"
              rel=""
              @click="selectedRoom('Mostre temporanee (PT)')"
            />
          </map>
        </slide>
        <slide :key="slide">
          <img
            usemap="#workmap2"
            src="/primo2.png"
            style="width: 366px; height: 350px"
            id="primo piano"
          />
          <map name="workmap2" id="clickableimagearea2">
            <area
              shape="poly"
              coords="73.99801560134765,102.8354775636375,165.4073289912477,102.2913745077452,164.8632259353554,121.3349814639744,75.08622171313218,121.3349814639744"
              target="_self"
              rel=""
              @click="
                selectedRoom('Dipinti XVI – XVII sec. (Collezione Monti)')
              "
            />
            <area
              shape="poly"
              coords="167.0396381589244,102.8354775636375,221.9940468040429,102.2913745077452,221.9940468040429,123.5113936875435,165.4073289912477,123.5113936875435"
              target="_self"
              rel=""
              @click="selectedRoom('Disegni XV – XX sec. (Collezione Sozzani)')"
            />
            <area
              shape="poly"
              coords="277.4925585050537,102.2913745077452,278.5807646168382,122.9672906316512,223.0822529158275,124.599599799328,221.4499437481507,102.8354775636375"
              target="_self"
              rel=""
              @click="
                selectedRoom('Opere XIII – XV sec. (Collezione Schubert)')
              "
            />
            <area
              shape="poly"
              coords="73.4539125454554,79.43904616027028,277.4925585050537,79.98314921616253,279.6689707286227,102.8354775636375,75.63032476902444,102.2913745077452"
              target="_self"
              rel=""
              @click="selectedRoom('Dipinti XIV – XX sec.')"
            />
            <area
              shape="poly"
              coords="70.73339726599409,57.13082086868753,95.76213783703814,55.49851170101074,96.85034394882267,79.98314921616253,71.8216033777786,82.15956143973159"
              target="_self"
              rel=""
              @click="selectedRoom('Opere XVII sec. (Collezione Visconti)')"
            />
            <area
              shape="poly"
              coords="257.36074543704,60.3954392040411,94.67393172525361,60.93954225993336,261.1694668282858,79.98314921616253,96.85034394882267,80.5272522720548"
              target="_self"
              rel=""
              @click="
                selectedRoom(
                  'Dipinti XVII – XVIII sec. (Collezione Pozzobonelli)'
                )
              "
            />
            <area
              shape="poly"
              coords="276.9484554491614,245.3904782074102,260.0812607165013,246.4786843191947,258.4489515488245,122.4231875757589,280.213073784515,122.9672906316512"
              target="_self"
              rel=""
              @click="
                selectedRoom('Fondi oro XIV – XV sec. (Collezione Crespi)')
              "
            />
            <area
              shape="poly"
              coords="316.6679785292966,245.3904782074102,316.6679785292966,275.8602493373769,279.1248676727305,275.8602493373769,279.1248676727305,245.9345812633025"
              target="_self"
              rel=""
              @click="
                selectedRoom('Sculture XV – XIX sec. (Collezione Marcenaro)')
              "
            />
            <area
              shape="poly"
              coords="31.01387418585894,121.3349814639744,74.54211865723991,122.4231875757589,72.90980948956313,301.4330929643132,26.11694668282858,304.1536082437745"
              target="_self"
              rel=""
              @click="selectedRoom('Mostre temporanee (PP)')"
            />
          </map>
        </slide>
        <slide :key="slide">
          <img usemap="#workmap" :src="`/ipogeo2.png`" id="ipogeo" />
          <map name="workmap" id="clickableimagearea">
            <area
              shape="poly"
              coords="44.96530296649905,115.183346367575,85.16351780618967,115.183346367575,85.55003910272517,263.2210029406665,45.73834555957003,263.6075242372019"
              rel=""
              @click="selectedRoom('VI – XX sec. Arredo liturgico')"
            />
          </map>
        </slide>
        <template #addons>
          <Pagination />
        </template>
      </carousel>
      <div class="text-center">
        <div
          style="display: flex; align-items: baseline; justify-content: center"
        >
          <div
            v-if="actualRoomColor !== null"
            :style="
              'width: 20px; height: 20px; background-color:' + actualRoomColor
            "
            style="display: inline-block"
          ></div>

          <h2>&nbsp; {{ currentPiano }}</h2>
        </div>

        <h5 style="vertical-align: top">&nbsp; {{ actualRoom }}</h5>
        <div v-if="!loaded">
          <svg viewBox="25 25 50 50">
  <circle r="20" cy="50" cx="50"></circle>
</svg>
        </div>
       
      </div>
      <br />
      <div v-if="actualRoom == ''" class="text-center">
        <h4>Nessuna opera trovata</h4>
      </div>
      <div class="container" v-if="loaded && selectedItems !== null">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-12 col-4"
            v-for="(item, index) in selectedItems"
            :key="index"
          >
            <div v-if="currentPiano == item.piano" class="itemsCard">
              <router-link
                class="nav-link"
                :to="{
                  name: 'InfoItem',
                  params: { item: item.JSON },
                }"
              >
                <div
                  class="card"
                  v-if="online == true"
                  :style="{
                    'background-image': 'url(' + item.icona + ')',
                    'background-position': 'center center',
                    'background-size': 'cover',
                  }"
                >
                  <div class="card-body"></div>
                </div>
                <div class="card" v-else>
                  <div class="card-body">
                    <div class="text-center">
                      {{ item.titolo.slice(0, 16)
                      }}{{ item.titolo.length > 19 ? "..." : "" }}
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-else id="nonCreated"></div>
          </div>
        </div>
      </div>
      <div class="container" v-else-if="loaded && selectedItems == null">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-12 col-4"
            v-for="(item, index) in items"
            :key="index"
          >
            <div v-if="currentPiano == item.piano" class="itemsCard">
              <div class="nav-link" @click="goToOpere(item)">
                <div
                  class="card"
                  v-if="online == true"
                  :style="{
                    'background-image': 'url(' + item.icona + ')',
                    'background-position': 'center center',
                    'background-size': 'cover',
                  }"
                >
                  <div class="card-body"></div>
                </div>
                <div class="card" v-else>
                  <div class="card-body">
                    <div class="text-center">
                      {{ item.titolo.slice(0, 16)
                      }}{{ item.titolo.length > 19 ? "..." : "" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else id="nonCreated"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {{ filter }}
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref, toRefs, onMounted, watch } from "vue";
import { directus } from "../API";
import ListItems from "./ListItems.vue";
import { useRouter } from "vue-router";

const mydata = ref({
  items: [
    { image: "/pianoTerra.png", piano: "piano terra" },
    { image: "/primo2.png", piano: "primo piano" },
    { image: "/ipogeo2.png", piano: "ipogeo" },
  ],
});

const items = ref();
const imageurl = ref("/logoMilanoSmall.png");
const currentPiano = ref("");
const optionSelected = ref("Map");
const online = ref(true);
const data = ref(JSON.parse(localStorage.getItem("listOpere")));
const loaded = ref(false);
const selectedItems = ref(null);
const actualRoom = ref();
const actualRoomColor = ref();
const router = useRouter();
const currentFilter = ref();

const imagesToSave = ["/pianoTerra.png", "/primo2.png", "/ipogeo2.png"];
try {
  $("map#clickableimagearea").imageMapResize();
} catch (error) {}

function goToOpere(item) {
  router.push({
    name: "InfoItem",
    params: { item: item.JSON },
  });
}
function selectedRoom(room) {
  actualRoomColor.value = null;
  const filteredItems = items.value.filter((item) => item.salaLabel === room);

  selectedItems.value = filteredItems;
  if (selectedItems.value.length > 0) {
    actualRoomColor.value = selectedItems.value[0].colore;
    actualRoom.value = room;
  } else {
    actualRoom.value = "";
  }
}
async function setnewView(option) {
  optionSelected.value = option;
  if (option == "Map") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    fetchImages();

    setNewPiano("piano terra");
  }
}
setNewPiano();
function setNewPiano(piano) {
  const activeSlides = document.querySelectorAll("li.carousel__slide--active");

  activeSlides.forEach((slide) => {
    const image = slide.querySelector("img");

    if (image) {
      if (currentPiano.value !== image.getAttribute("id")) {
        const imageId = image.getAttribute("id");
        currentPiano.value = imageId;
        fetchItems();
      }
    }
  });
  actualRoom.value = null;
  selectedItems.value = null;
  actualRoomColor.value = null;
}
async function fetchItems() {
  try {
    loaded.value = false;

    items.value = data.value;

    for (let index = 0; index < items.value.length; index++) {
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }
    items.value.forEach((item) => {
     
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error(error);
  } finally {
    loaded.value = true;
    removeNonCreatedElements();
  }
}
async function removeNonCreatedElements() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  var elementosAEliminar = document.querySelectorAll("#nonCreated");
  elementosAEliminar.forEach(function (elemento) {
    var elementoPadre = elemento.parentNode;
    elementoPadre.remove();
  });
}

function fetchImages() {
  let myImages = JSON.parse(localStorage.getItem("myImages"));

  if (myImages) {
    myImages.forEach((element) => {
      let imageInCode = document.querySelector(`img[src="${element.source}"]`);
      if (imageInCode) {
        imageInCode.src = element.base64src;
      }
    });
  } else {
    console.log("No saved images.");
  }
}

function onlineChanged(newValue, oldValue) {
  fetchImages();
}
onMounted(async () => {
  if (navigator.onLine == false) {
    online.value = navigator.onLine;
  }
  await fetchItems();
  setNewPiano();
  fetchImages();
});
</script>

<style scoped>
.mycarousel {
  margin-top: 30%;
}
img {
  width: 200px;
}
.card {
  border-radius: 0;
  height: 100px;
  margin-right: 0;
}
h2::first-letter {
  text-transform: uppercase;
}
svg {
 width: 3.25em;
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: hsl(214, 97%, 59%);
 stroke-width: 2;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}

</style>
