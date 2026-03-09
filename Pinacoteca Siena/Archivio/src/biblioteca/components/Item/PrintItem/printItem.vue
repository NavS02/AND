<template>
  <main id="main" class="main">
    <!-- SEARCH ID FORM -->
   
    <!-- PRINT THIS CONTENT -->
    <section class="section profile" id="element">
      <!-- CARD WITH ALL THE DATA -->
      <div class="card mt-5" v-if="id != 0">
        <div class="card-header text-center">
          <img :src="imageHome" alt="" srcset="" style="width: 150px" />
          <br>
          <img :src="url" alt="" srcset="" style="max-width: 80%" />
          <br />
          <br />
          <h2 v-if="id != 0">Scheda n.{{ id }}</h2>
          <!-- <img :src="url" alt="" srcset="" class="center" style="width: 15%" /> -->
        </div>
        <div class="card-body">
          <Form :fields="fields"> </Form>
        </div>
      </div>
    </section>

    <!-- PRINT BUTTON -->
    <div class="center">
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        style="width: 100%"
        @click="printItem()"
        v-if="id != 0"
      >
        Print
      </button>
    </div>
  </main>
</template>
<script setup>
import { ref, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
import Form from "../../common/Form/Form.vue";
import * as settings from "../../../settings/";
import store from "../../../../store";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const currentId = ref();
const props = defineProps({
  id: { type: Number, default: null },
});
const { id } = toRefs(props);
const item = ref();
const collection = ref("Foto");
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
  // set non editable fields

  try {
    for (let index = 0; index < fields.value.length; index++) {
      fields.value[index].edit = "false";
    }

    // takes data of each field
    const response = await directus.items("Foto").readByQuery({
      limit: 1,
      filter: { id: { _eq: idOpera } },
    });

    item.value = response.data[0];
  } catch (error) {
    item.value = null;
  }
}

// THIS FUNCTION WORKS WHEN IS IN PRODUCTION
async function fetchImage(itemSelected) {
  let urlWithoutPort = url.value.replace(/:\d+/, "");
  urlWithoutPort += "/igm/images/preview/0001/" + itemSelected.image;
  
  const dataUrl = await convertToDataURL(urlWithoutPort);
  url.value = dataUrl;
  
  async function convertToDataURL(source) {
    const blob = await fetch(source).then((result) => result.blob());
    const dataUrl = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    return dataUrl;
  }


var elements = document.querySelectorAll('.btn.btn-outline-secondary');

elements.forEach(function(element) {
  element.remove();
});

}

function changeItem() {
  currentId.value = document.getElementById("idItem").value;
  router.push({ name: "printItem", params: { id: currentId.value } });
}
function printItem() {
  const cardBodies = document.querySelectorAll('.card-body');
  const formControls = document.querySelectorAll('.form-control');
  const cardHeaders = document.querySelectorAll('.card-header');

  cardBodies.forEach(card => {
    card.style.backgroundColor = 'white'; 
  });

  formControls.forEach(control => {
    control.style.backgroundColor = 'white'; 
  });

  cardHeaders.forEach(header => {
    header.style.backgroundColor = 'white';
  });

  var opt = {
    margin: 0.2,
    filename: "scheda_" + id.value + "_" + new Date() + ".pdf",
    image: { type: "jpeg", quality: 0.6 },
    html2canvas: { scale: 1, useCORS: true },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait", compress: true },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      console.log("PDF Generated");

      cardBodies.forEach(card => {
        card.style.backgroundColor = '';
      });
      formControls.forEach(control => {
        control.style.backgroundColor = ''; 
      });
      cardHeaders.forEach(header => {
        header.style.backgroundColor = ''; 
      });
    });
}




</script>
<style scoped></style>
