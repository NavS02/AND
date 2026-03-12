<template>
  &nbsp
  <main id="main" class="main">
    <!-- PRINT THIS CONTENT -->
    <section class="section profile" id="element">
      <!-- CARD WITH ALL THE DATA -->
      <div v-for="(fieldsFav, index) in myArray" :key="index">
        <div class="card mt-5" v-if="id != 0">
          <div class="card-header text-center">
            <img src="" alt="" srcset="" style="width: 300px" />
            <br />
            <br />
            <h2 v-if="id != 0">Scheda n.{{ id[index] }}</h2>
            <img :src="url+imagesArray[index]" alt="" srcset="" style="max-width:80%" :id="'image-'+index">          </div>
          <div class="card-body">
            <Form :fields="fieldsFav" :id="'form-' + index"> </Form>
            <div class="page-break"></div>
          </div>
        </div>
        <hr />
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
    <br />
    <Loader v-if="!loaded" />
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
import Loader from "../../common/Loader.vue";

const route = useRoute();
const router = useRouter();
const currentId = ref();

const loaded = ref(true);
const id = ref();
const item = ref();
const collection = ref("Foto");
const fields = ref([]); // fields settings
const url = ref("");
const favOpere = ref();
const favoriteFields = ref([]);
const myArray = ref([]);
const imagesArray=ref([])
watch(
  route,
  async () => {
    if (!collection.value) return;
    // retrieve the settings

    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
      fetchItems();
    }, 0);
  },
  { immediate: true, deep: true }
);

async function fetchItems(idOpera) {
    fetchImage()

  const itemSettings = settings[collection.value];
  // define the subset of fields you need to view in the table
  const collectionFields = itemSettings.fields();
  // set non editable fields
  const me = await directus.users.me.read();
  const myPref = await directus.items("pref_f").readByQuery({
    filter: {
      user_created: {
        _eq: me.id,
      },
    },
  });

  id.value = myPref.data.map((item) => item.id_opera);

  for (let index = 0; index < id.value.length; index++) {
    const data = await store.collections.fetchOne(
      collection.value,
      id.value[index],
      true
    );
    
    imagesArray.value.push(data.image)
    for (const field of collectionFields) {
      await field.setInitialValue(data?.[field.name]);
      field.edit = "false";
    }
    myArray.value.push(collectionFields);
  }
}
function fetchImage() {
  let urlWithoutPort = url.value.replace(/:\d+/, "");

  urlWithoutPort += "/fotografico/images/preview/0001/"
  url.value=urlWithoutPort
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
<style scoped>
.page-break {
  page-break-after: always;
}
</style>
