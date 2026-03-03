<template>
  <div class="text-left">
    <img src="/MuseoDiocesano_CMYK.jpg" alt="" style="width: 250px; margin-top: 5px" />
    <hr />
  </div>
  <br />
  <div class="container">
    <div v-for="(item, index) in items" :key="index">
      <router-link
        class="nav-link"
        :to="{
          name: 'InfoItem',
          params: { item: item.JSON,lastRoute:'null' },
        }"
      >
      
        <div class="card custom-card" style="margin-top:-15px">
          <div class="card-body" style="margin: -10px !important">
            <div class="row">
              <div class="col-5">
                <div class="custom-div text-center" v-if="online">
                  <img 
                    :src="item.icona"
                    alt=""
                    srcset=""
                    style="object-fit: contain" :id="'image'+index"
                  /> 
                </div>
                 <div class="custom-div text-center" v-else>
                  SEI OFFLINE
                </div>
              </div>
              <div class="text-right col-7">
                {{ item.titolo }}
                <br />
                <br />
                <span
                  style="font-style: italic; font-size: 14px; float: right"
                  >{{ item.autore }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";

const data = ref(JSON.parse(localStorage.getItem("listOpere")));

const items = ref();
const imageurl = ref("/logoMilanoSmall.png");
const online=ref(true)

async function fetchItems() {
 
  items.value=data.value
  try {
    for (let index = 0; index < items.value.length; index++) {
   
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }
  } catch (error) {
    console.log(error);
  }
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

document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
});
onMounted(async () => {
  await fetchItems();
});
</script>
<style scoped>
.custom-div {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-div img {
  max-width: 100px;
  max-height: 100px;
}
.custom-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-title {
  font-size: 12px;
  text-align: right;
}
</style>
