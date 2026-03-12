<template>
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element">
      <div class="text-center" style="color: grey" v-if="item">
        <img
          :src="url"
          alt=""
          srcset=""
          style="max-width: 600px; padding: 10px; border: 1px solid grey"
        />
        <br />
        <br />
        <br />
        <a
          v-if="url && url !== undefined && url !== '' && url !== null"
          :href="imageUrl"
          target="_blank"
        >
          <button type="button" class="btn btn-secondary">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
        </a>
        <br />
        <h5>{{ item.id }} - {{ item.nome }}</h5>
        <div style="width: 70%; margin-left: 15%">
          <hr
            style="
              margin: 0 auto;
              height: 2px;
              background-color: black;
              border: none;
            "
          />
        </div>
      </div>
      <br />
      <br />
      <div style="width: 100%">
        <div style="width: 75%; margin: 0 auto" v-if="item">
          <div class="row">
            <div
              class="col-md-4"
              v-if="item.foglio !== null && item.foglio !== ''"
            >
              Foglio
            </div>
            <div
              class="col-md-8"
              v-if="item.foglio !== null && item.foglio !== ''"
            >
              {{ item.foglio }}
            </div>
            <div
              class="col-md-4"
              v-if="item.quadrante !== null && item.quadrante !== ''"
            >
              Quadrante
            </div>
            <div
              class="col-md-8"
              v-if="item.quadrante !== null && item.quadrante !== ''"
            >
              {{ item.quadrante }}
            </div>
            <div
              class="col-md-4"
              v-if="item.orientamento !== null && item.orientamento !== ''"
            >
              Orientamento
            </div>
            <div
              class="col-md-8"
              v-if="item.orientamento !== null && item.orientamento !== ''"
            >
              {{ item.orientamento }}
            </div>
            <div
              class="col-md-4"
              v-if="item.scala !== null && item.scala !== ''"
            >
              Scala
            </div>
            <div
              class="col-md-8"
              v-if="item.scala !== null && item.scala !== ''"
            >
              {{ item.scala }}
            </div>
            <div class="col-md-4" v-if="item.anno !== null && item.anno !== ''">
              Anno
            </div>
            <div class="col-md-8" v-if="item.anno !== null && item.anno !== ''">
              {{ item.anno }}
            </div>
            <div
              class="col-md-4"
              v-if="item.in_commercio !== null && item.in_commercio !== ''"
            >
              Edizione in commercio
            </div>
            <div
              class="col-md-8"
              v-if="item.in_commercio !== null && item.in_commercio !== ''"
            >
              {{ item.in_commercio }}
            </div>
            <div
              class="col-md-4"
              v-if="item.note !== null && item.note !== '' && item.note !== ' '"
            >
              Note
            </div>
            <div
              class="col-md-8"
              v-if="item.note !== null && item.note !== '' && item.note !== ' '"
            >
              {{ item.note }}
            </div>
            <div class="col-md-4" v-if="item.link !== null && item.link !== ''">
              Link
            </div>
            <div class="col-md-8" v-if="item.link !== null && item.link !== ''">
              {{ item.link }}
            </div>
          </div>
        </div>
      </div>
      <!-- {{ item }} -->
    </section>
  </main>
</template>
<script setup>
import { ref, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
import * as settings from "../../../settings";
import store from "../../../../store";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const currentId = ref();
const props = defineProps({
  id: { type: Number, default: null },
});
const imageUrl = ref();
const { id } = toRefs(props);
const item = ref();
const title = ref();
const collection = ref("serie_italiana");
const fields = ref([]); // fields settings
const url = ref(import.meta.env.VITE_API_BASE_URL);
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
watch(
  route,
  async () => {
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields();
    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
      const data = await store.collections.fetchOne(
        collection.value,
        id.value,
        true
      );
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;

      fetchItem(id.value);
    }, 0);
  },
  { immediate: true, deep: true }
);

async function fetchItem(idOpera) {
  const response = await directus.items("serie_italiana").readByQuery({
    filter: {
      id: {
        _eq: idOpera,
      },
    },
  });

  item.value = response.data[0];

  title.value = "";

  fetchImage(item.value);
}
async function fetchImage(itemSelected) {
  let urlWithoutPort = url.value.replace(/:\d+/, "");
  urlWithoutPort +=
    "/cartografia/public/images/foto_digitales/" + itemSelected.link;
  imageUrl.value =
  urlWithoutPort 

  try {
    const dataUrl = await convertToDataURL(urlWithoutPort);
    url.value = dataUrl;
  } catch (error) {
    console.log(error);
  }

  console.log("This is a test");
  async function convertToDataURL(source) {
    const blob = await fetch(source).then((result) => result.blob());
    const dataUrl = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    return dataUrl;
  }
}
// THIS FUNCTION WORKS WHEN IS IN PRODUCTION

function changeItem() {
  currentId.value = document.getElementById("idItem").value;
  router.push({ name: "printItem", params: { id: currentId.value } });
}
function printItem() {
  var opt = {
    margin: 0.2,
    filename: "SI_scheda_" + id.value + "_" + new Date() + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1, useCORS: true },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      console.log("PDF Generated");

      cardBodies.forEach((card) => {
        card.style.backgroundColor = "";
      });
      formControls.forEach((control) => {
        control.style.backgroundColor = "";
      });
      cardHeaders.forEach((header) => {
        header.style.backgroundColor = "";
      });
    });
}
</script>
