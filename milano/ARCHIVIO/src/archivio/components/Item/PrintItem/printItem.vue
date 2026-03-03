<template>
  &nbsp
  <main id="main" class="main">
    <!-- SEARCH ID FORM -->
    <div class="text-center">
      <input
        type="number"
        class="form-control text-center"
        id="idItem"
        required=""
        placeholder="Enter an ID"
        :value="currentId"
        min="1" 
        
      />
      <button type="button" class="btn btn-primary mt-1" @click="changeItem()">
        Cerca
      </button>
    </div>
    <!-- PRINT THIS CONTENT -->
    <section class="section profile" id="element">
      <!-- CARD WITH ALL THE DATA -->
      <div class="card mt-5" v-if="id != 0">
        <div class="card-header text-center">
          <img src="/logoMilanoBlue.png" alt="" srcset="" style="width: 300px" />
          <br />
          <br />
          <h2 v-if="id != 0">Scheda n.{{ id }}</h2>
          <img :src="url" alt="" srcset="" class="center" style="width: 15%" />
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
const collection = ref("opera");
const fields = ref([]); // fields settings
const url = ref("/not-found.svg");
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
    let filesField=null
    for (let index = 0; index < fields.value.length; index++) {
      fields.value[index].edit = "false";
      if(fields.value[index].name=='files'){
        console.log(fields.value[index])
        filesField=fields.value[index]
        fields.value.splice(index,1)
      }
    }
    if(filesField !==null){
      fields.value.push(filesField)
    }

    // takes data of each field
    const response = await directus.items("opera").readByQuery({
      limit: 1,
      filter: { id: { _eq: idOpera } },
    });

    item.value = response.data[0];
    fetchImage(item.value);
  } catch (error) {
    item.value = null;
  }
}
function fetchImage(itemSelected) {
  url.value =
    import.meta.env.VITE_API_BASE_URL + "/assets/" + itemSelected.icona;
}
function changeItem() {
  currentId.value = document.getElementById("idItem").value;
  router.push({ name: "printItem", params: { id: currentId.value } });
}
function printItem() {
  var opt = {
    margin: 0.2,
    filename: "scheda_" + id.value + "_" + new Date() + ".pdf",
    image: { type: "png", quality: 0.5 },
    html2canvas: { scale: 2, useCORS: true },
     pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
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
<style scoped></style>
