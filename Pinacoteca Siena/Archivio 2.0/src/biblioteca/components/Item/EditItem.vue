<template>
  <main id="main" class="main">
    <div v-if="loaded">
      <div class="mb-2">
        <ItemsNavigation :collection="collection" :id="id" />
      </div>
      <div class="succesAlert alert alert-success" role="alert" v-if="showAlert">
        Scheda n. {{ id }} salvata!
      </div>
      <h2 class="text-center">{{ myTitle }}</h2>
      <img :src="url" alt="" class="center" style="width: 15%" id="my-image" />
      <br />
      <hr />
      <Form :fields="fields">
        <template v-slot:footer="{ data, fields }">
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancel</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
            <button class="btn btn-sm btn-warning" @click="onEditOpera(id)" v-if="collection === 'app'">
              <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
              <span class="ms-1">Edita Opera</span>
            </button>
          </div>
        </template>
      </Form>
      <!-- Línea de tiempo -->
      <div v-if="prestiti.length > 0" class="timeline mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h4 class="text-center mb-0">Cronologia Prestiti</h4>
    <button class="btn btn-sm btn-outline-primary" @click="printTimeline">
      <font-awesome-icon icon="fa-solid fa-print" />
      <span class="ms-1">Stampa</span>
    </button>
  </div>

  <!-- contenido que se exportará -->
  <div id="timeline-to-print">
    <ul>
      <li v-for="(p, index) in prestiti" :key="p.id">
        <div class="timeline-content">
          <p><strong>{{ p.utente_nome }} {{ p.utente_cognome }}</strong> ({{ p.utente_email }})</p>
          <p><strong>Data inizio:</strong> {{ formatDate(p.date_created) }}</p>
          <p><strong>Data fine:</strong> {{ formatDate(p.fine_prestito) }}</p>
          <p><strong>Status:</strong> {{ p.status }}</p>
        </div>
      </li>
    </ul>
  </div>
</div>


    </div>
    <Loader v-if="!loaded" style="text-align: center; margin-top: 50%" />
  </main>
</template>

<script setup>
import { ref, watch, toRefs, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API";
import * as settings from "../../settings/";
import Form from "../common/Form/Form.vue";
import ItemsNavigation from "./ItemsNavigation.vue";
import store from "../../../store";
import Loader from "../common/Loader.vue";
import html2pdf from "html2pdf.js";

const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("");

const props = defineProps({
  collection: { type: String, default: "" },
  id: { type: String, default: null },
});
const { id, collection } = toRefs(props);

const route = useRoute();
const router = useRouter();
const image = ref();
const loaded = ref(false);
const fields = ref([]); // fields settings
const showAlert = ref(false);
const myTitle = ref();
const myItem = ref()

// watch the route and update data based on the collection param
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
      myItem.value = data
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;
      loaded.value = true;

      fetchTitle();
      if (collection.value == 'biblioteca') {
        checkPrestitoCronology()
      }
      // fecthImage();
    }, 0);
  },
  { immediate: true, deep: true }
);
const prestiti = ref([]);
function printTimeline() {
  const element = document.getElementById("timeline-to-print");

  const opt = {
    margin:       0.1,
    filename:     `cronologia_prestiti_libro_${id.value}.pdf`,
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 1.5 }, 
    jsPDF:        { 
      unit: "in", 
      format: [6.3, 4.7], // 16x12 cm
      orientation: "portrait" 
    }
  };

  html2pdf().set(opt).from(element).save();
}


async function checkPrestitoCronology() {
  let response = await directus.items("prestiti").readByQuery({
    filter: { libro_id: { _eq: id.value } },
    sort: ["-date_created"],
  });

  prestiti.value = response.data || [];
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT"); // dd/mm/yyyy
}

async function fetchTitle() {
  if (collection.value == "biblioteca") {
    const title = fields.value.find((field) => field.name === "bib_titolo");
    const inventario = fields.value.find(
      (field) => field.name === "bib_inventario"
    );
    myTitle.value =
      inventario.initialValue +
      " - " +
      title.initialValue +
      " (" +
      id.value +
      ")";
  }
}
async function onCancelClicked() {
  const confirmed = await modal.confirm({
    title: "Confirma",
    body: "Sei sicuro di voler lasciare questa pagina?",
  });
  if (!confirmed) return;
  goToList();
}
function onSaveClicked(data) {
  save(data());
}
function goToList() {
  if (collection.value == "biblioteca") {
    router.push({ name: "searchBib", params: { piano: "all" } });
  } else {
    router.push({ name: "listBib", collection: collection.value });
  }
}

async function onEditOpera(id) {
  let query = {
    limit: 1,
    filter: {
      app: {
        _eq: id,
      },
    },
  };

  // let response = await directus.items("Foto").readByQuery(query);
  router
    .push({
      name: "editItemFot",
      params: { id: response.data[0].id, collection: "Foto" },
    })
    .then(() => {
      location.reload();
    });
}
async function save(data) {
  try {
    const response = await directus
      .items(collection.value)
      .updateOne(id.value, data);
    // ALERT

    if (collection.value == "prestiti") {
      const id_libro = fields.value.find((field) => field.name === "libro_id");
      const fine_prestito = fields.value.find(
        (field) => field.name === "fine_prestito"
      );

      const dateString = fine_prestito.__value;
      const dateObject = new Date(dateString);

      const formattedDate = `${dateObject
        .getDate()
        .toString()
        .padStart(2, "0")}/${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${dateObject.getFullYear()}`;

      const response = await directus
        .items("biblioteca")
        .updateOne(id_libro.__value, { fine_prestito: formattedDate });
    }
    else if (collection.value == "biblioteca" && myItem.value.fine_prestito != null) {
      const response = await directus
        .items("prestiti")
        .readByQuery({ filter: { libro_id: { _eq: myItem.value.id } } });


      const response2 = await directus
        .items("prestiti")
        .updateOne(response.data[0].id, {
          libro_collocazione: myItem.value.collocazione_2,
          libro_armadio: myItem.value.bib_armadio?.bib_armadio,
          libro_anno: myItem.value.bib_anno,
          libro_inventario: myItem.value.bib_inventario,
          libro_luogo: myItem.value.bib_luogo2?.bib_luogo,
          libro_titolo: myItem.value.bib_titolo,



        });

    }
    showAlert.value = true;
    setTimeout(function () {
      showAlert.value = false;
    }, 3000);
  } catch (error) {
    console.error(error);
    toaster.toast({ title: "Error", body: error }, "top right");
  }
}
async function fecthImage() {
  url.value = import.meta.env.VITE_API_BASE_URL; //url of directus
  const imgresponse = await directus.items(collection.value).readByQuery({
    filter: {
      id: {
        _eq: id.value,
      },
    },
  });
  image.value = imgresponse.data[0].icona; //takes the id of the image
  if (image.value != null) {
    const imageUrl = url.value + "/assets/" + image.value; // generates url
    const imageElement = document.getElementById("my-image");

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // CODE64 IMAGE
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result; //code64 the url
          imageElement.src = base64data;
        };
      });
  } else {
    const imageElement = document.getElementById("my-image");
    imageElement.src = null;
  }
}
</script>

<style scoped>
/* SAVE AND CANCEL BUTTON */
.buttons {
  display: flex;
  gap: 5px;
}

/* IMAGE */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.succesAlert {
  width: 25%;
  text-align: center;

  position: fixed;
  right: 0;
}

.timeline {
  position: relative;
  padding-left: 30px;
  border-left: 3px solid #0d6efd;
  /* línea azul */
}

.timeline ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline li {
  position: relative;
  margin-bottom: 20px;
}

.timeline li::before {
  content: "";
  position: absolute;
  left: -11px;
  top: 5px;
  width: 15px;
  height: 15px;
  background: #0d6efd;
  border-radius: 50%;
  border: 2px solid #fff;
}

.timeline-content {
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
@media print {
  .btn, .buttons {
    display: none; 
  }
}
#timeline-to-print {
  font-size: 10px;  
  padding: 4px;      
}

#timeline-to-print .timeline-content {
  padding: 4px 6px;
  margin: 4px 0;
}

</style>
