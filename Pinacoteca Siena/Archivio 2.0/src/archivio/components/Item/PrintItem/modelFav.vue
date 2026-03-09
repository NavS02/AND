<template>
  &nbsp;
  <main id="main" class="main">
    <div style="position: fixed; top: 70px; right: 10px; padding: 10px;z-index:999">
      <button type="button" class="btn btn-primary" @click="printItem" :disabled="isPrinting">
        <font-awesome-icon v-if="!isPrinting" icon="print" />
        <font-awesome-icon v-else icon="spinner" spin />
      </button>

    </div>
    <section class="section profile" id="element" ref="printSection">
      <div v-for="(item, index) in myArray" :key="index">
        <div class="card mt-5" v-if="id != 0">
          <div class="card-header text-center">
            <img src="/logoSiena.png" alt="" srcset="" style="width: 300px" />
            <br />
            <br />
            <h2 v-if="id != 0">Scheda n.{{ id[index] }}</h2>
            <img v-if="item.imageUrl && item.imageUrl !== '/not-found.svg'" :src="item.imageUrl" alt="Icona"
              style="width:20%" />
          </div>
          <div class="card-body">
            <table style="width: 100%; border-collapse: collapse" v-if="item.fields.length > 0">
              <tbody>
                <tr v-for="field in item.fields.filter(f =>
                  f?.name !== 'icona' &&
                  f?.value !== null && f?.value !== undefined &&
                  (!(typeof f.value === 'boolean') || f.value === true) &&
                  (!(Array.isArray(f.value)) || f.value.length > 0) &&
                  (!(typeof f.value === 'string') || f.value.trim() !== '')
                )" :key="field?.name">


                  <td style="width: 40%; padding: 6px; vertical-align: top; font-weight: bold">
                    {{ field?.label }}
                  </td>

                  <td style="width: 60%; padding: 6px; vertical-align: top">
                    <template
                      v-if="Array.isArray(field.value) && field.value.length > 0 && typeof field.value[0] === 'object'">
                      <div v-for="(subItem, idx) in field.value" :key="idx">
                        <div v-if="field.preview && typeof field.preview === 'function'">
                          <div
                            v-if="Object.values(subItem).length === 1 && typeof Object.values(subItem)[0] === 'object'">
                            <div v-html="field.preview(Object.values(subItem)[0])"></div>
                          </div>
                          <div v-else>
                            <div v-html="field.preview(subItem)"></div>
                          </div>
                        </div>
                        <div v-else>
                          <div
                            v-if="Object.values(subItem).length === 1 && typeof Object.values(subItem)[0] === 'object'">
                            {{ JSON.stringify(Object.values(subItem)[0]) }}
                          </div>
                          <div v-else>
                            {{ JSON.stringify(subItem) }}
                          </div>
                        </div>
                      </div>
                    </template>


                    <template v-else-if="typeof field.value === 'boolean'">
                      {{ field.value ? 'Si' : 'No' }}
                    </template>

                    <template v-else>
                      {{ field.value }}
                    </template>
                  </td>
                </tr>

              </tbody>
            </table>
            <div class="page-break"></div>
          </div>
        </div>
        <hr />
      </div>

    </section>

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
const printSection = ref(null);

const loaded = ref(true);
const id = ref();
const item = ref();
const collection = ref("opera");
const fields = ref([]); // fields settings
const url = ref("/not-found.svg");
const favOpere = ref();
const favoriteFields = ref([]);
const myArray = ref([]);
const isPrinting = ref(false);

watch(
  route,
  async () => {
    if (!collection.value) return;
    setTimeout(async () => {
      fetchItems();
    }, 0);
  },
  { immediate: true, deep: true }
);

async function fetchItems(idOpera) {
  const itemSettings = settings[collection.value];
  const collectionFields = itemSettings.fields();

  myArray.value = [];

  const me = await directus.users.me.read();
  const myPref = await directus.items("pref").readByQuery({
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

    const fieldsClone = collectionFields.map(field => Object.create(field));

    for (const field of fieldsClone) {
      await field.setInitialValue(data?.[field.name]);
      field.edit = "false";
    }

    let imageUrl = "/not-found.svg";
    if (data?.icona?.id) {
      imageUrl = import.meta.env.VITE_API_BASE_URL + "/assets/" + data.icona.id;
    }

    myArray.value.push({ fields: fieldsClone, imageUrl });
  }
}




function fetchImage(item, position) {
  url.value = import.meta.env.VITE_API_BASE_URL + "/assets/" + item.icona.id;
  console.log(url.value);
  document.getElementById("image-" + position).src = url.value;

}
function printItem() {
  isPrinting.value = true;

  const opt = {
    margin: 0.2,
    filename: new Date() + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1.5, useCORS: true },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
  };

  html2pdf()
    .set(opt)
    .from(document.getElementById("element"))
    .save()
    .then(() => {
      console.log("PDF Generated");
    })
    .finally(() => {
      isPrinting.value = false;
    });
}


</script>
<style scoped>
* {
  box-shadow: none !important;
}

tr,
thead,
tbody,
tfoot {
  page-break-inside: avoid !important;
}

img {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  max-width: 100%;
}

.card,
.card-header,
.card-body,
table,
table tr {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

.page-break {
  page-break-after: always;
  break-after: always;
}
</style>
