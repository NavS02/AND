<template>
  <main id="main" class="main" v-if="items">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px">
      <button type="button" class="btn btn-primary" @click="printItem()">
        <font-awesome-icon icon="print" />
      </button>
    </div>
    <section class="section profile" id="element">
      <div v-for="(item, index) in items" :key="index">
        
        [{{ item.bib_inventario
        }}<span v-if="item.bib_data_inventario && item.bib_inventario">, </span>
        <span v-if="item.bib_data_inventario">{{
          item.bib_data_inventario
        }}</span
        >]

        <span v-if="item.bib_autore.length > 1">
          <span v-for="(autore, index) in item.bib_autore" :key="index">
            <span class="first-letter" v-if="autore.bib_autore">
              {{ autore.bib_autore.charAt(0) }}
            </span>
            <span v-if="autore.bib_autore">
              {{ autore.bib_autore.slice(1) }}
            </span>
            <span v-if="index !== item.bib_autore.length - 1"> - </span>
            <span v-else>, </span>
          </span>
        </span>

        <span v-else-if="item.bib_autore.length == 1">
          <span class="first-letter" v-if="item.bib_autore[0].bib_autore">{{
            item.bib_autore[0].bib_autore.charAt(0)
          }}</span
          ><span v-if="item.bib_autore[0].bib_autore"
            >{{ item.bib_autore[0].bib_autore.slice(1) }}.
          </span>
        </span>

        <span v-if="item.bib_curatore.length > 1">
          <span v-for="(curatore, index) in item.bib_curatore" :key="index">
            <span class="first-letter" v-if="curatore.bib_curatore">{{
              curatore.bib_curatore.charAt(0)
            }}</span
            ><span v-if="curatore.bib_curatore">{{
              curatore.bib_curatore.slice(1)
            }}</span>
            <span v-if="index !== item.bib_curatore.length - 1">
              (a cura di) -
            </span>
            <span v-else> (a cura di), </span>
          </span>
        </span>

        <span v-else-if="item.bib_curatore.length == 1">
          <span class="first-letter" v-if="item.bib_curatore[0].bib_curatore">{{
            item.bib_curatore[0].bib_curatore.charAt(0)
          }}</span
          ><span v-if="item.bib_curatore[0].bib_curatore">{{
            item.bib_curatore[0].bib_curatore.slice(1)
          }}</span>
           (a cura di), 
        </span>
        <span v-if="item.bib_titolo">
          <i>{{ item.bib_titolo }}</i></span
        >
        <span v-if="item.bib_in !== null && item.bib_in !==''"> in {{ item.bib_in }} </span>
        <span v-if="item.bib_luogo2.bib_luogo !== null">, {{ item.bib_luogo2.bib_luogo }} </span>
        <span v-if="item.bib_editore2 !== null"
          >, {{ item.bib_editore2.bib_editore }}
        </span>
        <span v-if="item.bib_anno !== null">, {{ item.bib_anno }} </span>
        <span v-if="item.bib_pagine !== null">, {{ item.bib_pagine }} </span>
        <br />
        <br />
        <span v-if="item.bib_armadio">{{ item.bib_armadio.bib_armadio }}</span>
        <span v-if="item.collocazione_2 && item.bib_armadio">, </span>
        <span v-if="item.collocazione_2">{{ item.collocazione_2 }}</span>

        <br />
        <br />

        <p v-if="item.bib_note">[{{ item.bib_note }}]</p>
        <br />
        <hr />
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../../API";
import Form from "../../common/Form/Form.vue";
import * as settings from "../../../settings";
import store from "../../../../store";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const currentId = ref();
const props = defineProps({
  query: { type: String, default: null },
});
const { query } = toRefs(props);
const item = ref();
const items = ref([]);
const autrValues = ref();
const autsValues = ref();
const autmValues = ref();
const fotografoNames = ref();
const title = ref();
const queryParsed = ref();
const collection = ref("Foto");
const fields = ref([]); // fields settings
const url = ref(import.meta.env.VITE_API_BASE_URL);
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
watch(
  route,
  async () => {
    collection.value = "biblioteca";
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields();
    queryParsed.value = JSON.parse(query.value);
    // use an instant timeout to make sure the item will update
    if (
      queryParsed.value.filter &&
      queryParsed.value.filter.id &&
      queryParsed.value.filter.id._eq
    ) {
      setTimeout(async () => {
        const data = await store.collections.fetchOne(
          collection.value,
          queryParsed.value.filter.id._eq,
          true
        );
        fields.value = collectionFields;

        fetchItem(data);
      }, 0);
    } else {
      fetchItemArray(queryParsed.value);
    }
  },
  { immediate: true, deep: true }
);
async function fetchItemArray(query) {
    query.fields='*.*'
  const response = await directus.items("biblioteca").readByQuery(query);
  response.data.forEach((element) => {
    fetchItem(element);
  });
}
async function fetchItem(itemData) {
  if (itemData.bib_autore.length > 0) {
    let autoriId = itemData.bib_autore.map((object) => object.bib_autore_id);

    const response = await directus.items("bib_autore").readByQuery({
      limit: -1,
      filter: { id: { _in: autoriId } },
    });
    itemData.bib_autore = response.data;
  }
  if (itemData.bib_curatore.length > 0) {
    let curatoriId = itemData.bib_curatore.map(
      (object) => object.bib_curatore_id
    );

    const response = await directus.items("bib_curatore").readByQuery({
      limit: -1,
      filter: { id: { _in: curatoriId } },
    });
    itemData.bib_curatore = response.data;
  }

  items.value.push(itemData);
  console.log(items.value)
}

function printItem() {
  var opt = {
    margin: 0.2,
    filename: "scheda_"+ new Date() + ".pdf",
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
    });
}
</script>

<style scoped>
.draggable-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.draggable-item {
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  margin: 5px 0;
  cursor: grab;
}

.draggable-item:active {
  cursor: grabbing;
}

.center-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#custId {
  background-color: transparent;
  border: none;
  color: #000;
  text-align: center;
}
.first-letter {
  font-size: 1.15em;
}
</style>
