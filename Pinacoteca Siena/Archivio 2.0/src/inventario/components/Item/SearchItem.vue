<template>
  <main id="main" class="main" v-if="userRolePermissions">
    <!-- FORM WITH SARCH INPUTS -->
    <div class="col-12">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-id`">ID:</label>
          <input type="number" class="form-control" v-model="form.id" :id="`form-id`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-invn`">Inventario (INVN):</label>
          <input type="text" class="form-control" v-model="form.invn" :id="`form-invn`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-inventario_1930`">Inventario 1930:</label>
          <input type="text" class="form-control" v-model="form.inventario_1930" :id="`form-inventario_1930`"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-inventario_1973`">Inventario 1973:
          </label>
          <input type="text" class="form-control" v-model="form.inventario_1973" :id="`form-inventario_1973`"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-provenienza`">NCTN:</label>
          <input type="text" class="form-control" v-model="form.nctn" :id="`form-nctn`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-ibs`">IBS:</label>
          <input type="text" class="form-control" v-model="form.ibs" :id="`form-ibs`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-inv_oggetto`">Oggetto:</label>
          <input type="text" class="form-control" v-model="form.inv_oggetto" :id="`form-inv_oggetto`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-sgti`">Soggetto (SGTI):</label>
          <input type="text" class="form-control" v-model="form.sgti" :id="`form-sgti`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-mtc`">Materia:</label>
          <input type="text" class="form-control" v-model="form.materia" :id="`form-materia`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-inv_collocazione`">Collocazione</label>

          <select class="form-select" aria-label="inv_collocazione" v-model="form.inv_collocazione"
            :id="'form-inv_collocazione'">
            <option v-for="(col, index) in inv_collocazione" :key="index" :value="col">
              {{ col }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-provenienza`">Provenienza:</label>
          <input type="text" class="form-control" v-model="form.provenienza" :id="`form-provenienza`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-autore`">Autore (AUTN):</label>
          <input type="text" class="form-control" v-model="form.autore" :id="`form-autore`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
      <div class="row">

        
      </div>
      <div class="row">
        <div class="form-check form-switch col-md-4" style="margin-top: 50px">
          <label for="form-dismesso" class="resti"> Dismesso </label>
          <input class="form-check-input" type="checkbox" v-model="form.dismesso" id="form-dismesso" />
        </div>
      </div>
      <br />
      <button type="button" class="btn btn-outline-primary" @click="fetchData('all')">
        Cerca
      </button>
      &nbsp;
      <button type="button" class="btn btn-outline-danger" @click="clearData()">
        Annulla
      </button>
      <hr />
      <!-- DROPDOWN WITH PAGINATION CONFIG -->
      <div class="btn-group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Mostra: {{ resultLimit }}
        </button>
        <ul class="dropdown-menu">
          <li @click="infoQty(5)">5</li>
          <li @click="infoQty(10)">10</li>
          <li @click="infoQty(25)">25</li>
          <li @click="infoQty(50)">50</li>
          <li @click="infoQty(100)">100</li>
          <li @click="infoQty(250)">250</li>
          <li @click="infoQty(500)">500</li>
           <li @click="infoQty(500)">50000</li>
        </ul>
      </div>
      &nbsp;
      {{ totalResult }} schede trovate
      <i :class="{
        'bi bi-info-circle-fill': showInfo,
        'bi bi-info-circle': !showInfo,
      }" @click="showInfo = !showInfo"></i>
      &nbsp;
      <div v-if="showInfo">
        <hr />
        {{ totalResult }}/{{ schedeQTY.data.length }} schede. <br />
        Pagina {{ currentPage }}/{{ totalPages }} ({{ resultLimit }} schede per
        pagina).
      </div>

      <div class="form-check" style="float: right">
        <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDefault1"
          v-model="selectedInterface" value="list" />
        <label class="form-check-label" for="flexRadioDefault1"> Lista </label>
      </div>

      <div class="form-check" style="float: right">
        <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDefault2"
          v-model="selectedInterface" value="card" />

        <label class="form-check-label" for="flexRadioDefault2">
          Carta &nbsp;
        </label>
      </div>
      <br />
      <div style="float: right">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Cerca" id="advancedSearch" :disabled="secondFilter"
            v-model="advancedSearchInput" />
          <div class="input-group-append">
            <button type="button" class="btn btn-outline-danger" v-if="advancedSearchInput !== ''"
              @click="clearAdvancedSearch()">
              <i class="bi bi-x"></i>
            </button>
            <button type="button" @click="filterTable()" class="btn btn-light" :disabled="advancedSearchInput == ''">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <br />
      <div class="card gradient-dark-grey" style="margin-top: 30px">
        <div class="card-header">
          <div class="">
            <header class="mb-2"></header>
          </div>
        </div>
        <!-- TABLE WITH RESULTS -->
        <div class="card-body" v-if="selectedInterface === 'list'">
          <div class="table-responsive">
            <Table class="table v-middle m-0" :items="items" :fields="fields" id="table">
              <template #cell(actions)="{ item }">
                <div class="actions">
                  <button title="edit" class="btn btn-sm btn-light" @click="onEditClicked(item)"
                    v-if="userRolePermissions.inventario.edit">
                    <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                  </button>

                  <button title="save" class="btn btn-sm btn-light text-danger" @click="onSaveClicked(item)">
                    <i class="bi bi-heart" :id="'saveButton-' + item.id"></i>
                  </button>
                  <button title="delete" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)"
                    v-if="userRolePermissions.inventario.delete">
                    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                  </button>

                  <button title="STAMPA" class="btn btn-sm btn-light" @click="onInfoClicked(item)">
                    <font-awesome-icon icon="fa-solid fa-print" />
                  </button>
                  <button title="APP" class="btn btn-sm btn-light" @click="createApp(item)"
                    v-if="userRolePermissions.inventario.create">
                    <i class="bi bi-phone" :id="'phoneButton-' + item.id"></i>
                  </button>

                  <button title="WEB" class="btn btn-sm btn-light" @click="createWeb(item)"
                    v-if="userRolePermissions.inventario.create">
                    <i class="bi bi-tv" :id="'webButton-' + item.id"></i>
                  </button>

                  <!-- <button
                    title="TouchScreen"
                    class="btn btn-sm btn-light"
                    @click="createTouch(item)"
                  >
                    <i class="bi bi-map" :id="'touchButton-' + item.id"></i>
                  </button> -->
                </div>
              </template>
              <template #cell(opera)="{ item }">
                <div class="actions text-center">
                  <button title="OA" class="btn btn-xl btn-light" @click="createOA(item)"
                    v-if="userRolePermissions.inventario.create">
                    <i class="bi bi-palette" :id="'OAButton-' + item.id" style="width: 100%"></i>
                  </button>
                </div>
              </template>
            </Table>
          </div>
        </div>
        <!-- CARDS WITH ITEMS -->
        <div class="card-body" v-if="selectedInterface === 'card'">
          <div class="row">
            <div class="col-15">
              <div class="row">
                <div v-for="(item, index) in items" :key="index" class="mb-3 col-md-3" style="margin-bottom: 20px">
                  <div class="card" style="height: 100%; margin: -5px">
                    <div class="card-body">
                      <h4 class="text-center">id {{ item.id }}</h4>

                      <button title="save" class="btn btn-sm btn-light text-danger text-center"
                        style="position: absolute; top: 10px; right: 10px" @click="onSaveClicked(item)">
                        <i class="bi bi-heart" :id="'saveButton-' + item.id"></i>
                      </button>
                      <div class="text-center" style="
                          border: 1px solid #999999;
                          width: 300px;
                          height: 300px;
                          margin: 0 auto;
                          margin-top: 15px;
                        ">
                        <img :src="'http://195.231.23.205:8075/assets/' + item.icona" alt="" style="
                            max-width: 250px;
                            max-height: 250px;
                            margin-top: 15px;
                          " :id="'photo-' + index" />
                      </div>
                      <div class="text-center">
                        <h5 style="margin-top: 20px">
                          {{ item.inv_oggetto }}<br />
                          {{ item.autore }}<br />
                          <i>{{ item.soggetto }}</i>
                        </h5>
                        <div class="actions">
                          <button title="edit" class="btn btn-sm btn-light" @click="onEditClicked(item)"
                            v-if="userRolePermissions.inventario.edit">
                            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                          </button>

                          <button title="DELETE" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)"
                            v-if="userRolePermissions.inventario.delete">
                            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                          </button>
                          <button title="STAMPA" class="btn btn-sm btn-light" @click="onInfoClicked(item) || isAdmin">
                            <font-awesome-icon icon="fa-solid fa-print" />
                          </button>
                          <button title="APP" class="btn btn-sm btn-light" @click="createApp(item)"
                            v-if="userRolePermissions.inventario.create">
                            <i class="bi bi-phone" :id="'phoneButton-' + item.id"></i>
                          </button>
                          <button title="WEB" class="btn btn-sm btn-light" @click="createWeb(item)"
                            v-if="userRolePermissions.inventario.create">
                            <i class="bi bi-tv" :id="'webButton-' + item.id"></i>
                          </button>
                          <!-- <button
                            title="TouchScreen"
                            class="btn btn-sm btn-light"
                            @click="createTouch(item)"
                          >
                            <i
                              class="bi bi-map"
                              :id="'touchButton-' + item.id"
                            ></i>
                          </button>  -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PAGINATION -->
        <nav aria-label="...">
          <ul class="pagination" style="display: flex; flex-wrap: wrap; justify-content: center">
            <li class="page-item" @click="skipPage('first')" :id="'before'" v-if="totalPages > 0">
              <a class="page-link">First</a>
            </li>
            <li class="page-item" @click="skipPage('substract')" :id="''"
              v-if="totalPages > 0 && currentPage - 1 !== 0">
              <a class="page-link">
                <span>{{ currentPage - 1 }}</span>
              </a>
            </li>
            <li class="page-item" @click="skipPage('current')" :id="'tablePage-'" v-if="totalPages > 0">
              <a class="page-link" style="background-color: #0a58ca; color: white">{{ currentPage }}</a>
            </li>
            <li class="page-item" @click="skipPage('pass')" :id="'tablePage-'"
              v-if="totalPages > 0 && currentPage + 1 !== totalPages + 1">
              <a class="page-link"> {{ currentPage + 1 }}</a>
            </li>

            <li class="page-item" @click="skipPage('last')" :id="'tablePage-'" v-if="totalPages > 0">
              <a class="page-link">Last</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- PRINT OPTIONS -->
    <div class="modal fade show" id="ExtralargeModal" tabindex="-1" style="display: block" aria-modal="true"
      role="dialog" v-if="showAlert">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
          <!-- Header -->
          <div class="modal-header bg-primary text-white" style="background-color: #A57704 !important">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-printer me-2"></i>
              {{ currentItem?.autore ? currentItem.autore : '' }}
              {{ currentItem?.autore && currentItem?.soggetto ? ' — ' : '' }}
              {{ currentItem?.soggetto ? currentItem.soggetto : '' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
              @click="closeAlert"></button>
          </div>

          <!-- Body -->
          <div class="modal-body bg-light">
            <div class="row g-4">
              <!-- Card 1 -->
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm text-center cardSelector hover-card"
                  @click="printScheda(item)">
                  <div class="card-body py-4">
                    <i class="bi bi-file-earmark-text fs-1 text-primary mb-3"></i>
                    <h5 class="card-title fw-semibold">Stampa scheda</h5>
                    <p class="text-muted small">Stampa una scheda dettagliata.</p>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm text-center cardSelector hover-card" @click="printS(item)">
                  <div class="card-body py-4">
                    <i class="bi bi-heart-pulse fs-1 text-danger mb-3"></i>
                    <h5 class="card-title fw-semibold">Stampa sanitaria</h5>
                    <p class="text-muted small">Genera una stampa descrittiva dell’opera</p>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm text-center cardSelector hover-card" @click="printP(item)">
                  <div class="card-body py-4">
                    <i class="bi bi-clipboard-data fs-1 text-success mb-3"></i>
                    <h5 class="card-title fw-semibold">Stampa prestito</h5>
                    <p class="text-muted small">Genera una stampa di prestito.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-5 gap-3">
              <button class="btn btn-outline-primary px-4" @click="exportJson(item)">
                <i class="bi bi-filetype-json me-2"></i> Esporta in JSON
              </button>
              <button class="btn btn-outline-success px-4" @click="exportCsv(item)">
                <i class="bi bi-filetype-csv me-2"></i> Esporta in CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOADER ANIMATION -->
    <Loaded v-if="!loaded" />
    <h1 class="text-center" v-if="noResult">Nessun risultato</h1>
  </main>
</template>

<script setup>
import { useStorage } from "../../../utils/useStorage";
import { ref, computed, watch, inject, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API/";
import * as settings from "../../settings/";
import Table from "../common/Table/Table.vue";
import Loaded from "../common/Loader.vue";
import { onMounted } from "vue";
import store from "../../../store";

const route = useRoute();
const router = useRouter();
const modal = inject("$modalManager");

const prefilter = ref(false);
const storageManager = useStorage("advanced-search-form-INV");
const inv_collocazione = ref([]);
const showInfo = ref(false);
const totalItems2 = ref(0);
const collection = [];
const items = ref(null);
const fields = ref([]);
var itemsFiltered = [];
var totalResult = ref(0);
var totalPages = ref();
let currentPage = ref(0);
let currentItem = ref();
let selectedInterface = ref("list");
const advancedSearchInput = ref("");
const url = ref();
let imageurl = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
const me = ref();
const showAlert = ref(false);
const counter = ref(0);
const loaded = ref(true);
const image = ref();
let noResult = ref(false);
let resultLimit = ref(50);
const schedeQTY = ref();
const itemsBeforeAdvancedSearch = ref();
const props = defineProps({
  piano: { type: String, default: "" },
});
const secondFilter = ref(false)

const { piano } = toRefs(props);
const makeEmptyForm = () => ({
  id: "",
  autore: "",
  sgti: "",
  invn: "",
  ibs: "",
  inv_oggetto: "",
  materia: "",
  nctn: "",
  provenienza: "",
  inventario_1930: "",
  inventario_1973: "",
  inv_collocazione: "",
  dismesso: false,
  deposito: false,
  esposta: false,
  // inMuseo: false,
});



const form = ref(storageManager.get() ?? makeEmptyForm());
const role = ref();
const isAdmin = ref(false);
const create = ref(false);
const edit = ref(false);
const cancel = ref(false);

const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);

// watch the route and update data based on the collection param
watch(
  route,
  () => {
    form.value = JSON.parse(sessionStorage.getItem('advanced-search-form-INV')) ?? makeEmptyForm();
    const hasValue = Object.values(form.value).some(val => {
      if (typeof val === 'string' && val.trim() !== "") return true;
      if (typeof val === 'boolean' && val === true) return true;
      if (typeof val === 'number' && !isNaN(val)) return true;
      return false;
    });
    if (hasValue) {
      fetchData();
    }
    collection.value = "inventario";
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    fetchRelationalItems();
    getUserData();
  },
  { immediate: true, deep: true }
);
watch(selectedInterface, () => {
  skipPage("first");
  //IMAGES
  if (selectedInterface.value === "card" && itemsFiltered.data) {
  }
});


onMounted(async () => {
  if (piano.value !== "all") {
    prefilter.value = true;
    fetchData();
  }

  try {
    const response = await fetch("/permission.json");
    permissions.value = await response.json();
    const logged = await userStore.getUserInfo();
    if (permissions.value[logged.role]) {
      userRolePermissions.value = permissions.value[logged.role].permission;
    } else {
      console.log("Permissions not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
async function exportCsv(item) {
  const response = await directus.items('inventario').readOne(currentItem.value.id, {
    fields: ['*.*.*']
  });


  const replacer = (key, value) => (value === null ? '' : value);
  const header = Object.keys(response);

  let csv = [response].map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
  );

  csv.unshift(header.join(','));
  csv = csv.join('\r\n');

  const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "item_" + currentItem.value.id + ".csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

async function exportJson(item) {
  const response = await directus.items('inventario').readOne(currentItem.value.id, {
    fields: [
      '*.*.*',]
  });
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "item_" + currentItem.value.id + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
async function getUserData() {
  me.value = await directus.users.me.read();
  role.value = me.value.role;

  create.value = true;
  edit.value = true;
  cancel.value = true;
}
const createLink = computed(() => ({
  name: "createItem",
  params: { collection: collection.value },
}));
async function fetchRelationalItems() {
  const response2 = await directus
    .items("inv_collocazione")
    .readByQuery({ limit: -1, sort: "inv_collocazione" });
  inv_collocazione.value = response2.data.map((item) => item.inv_collocazione);
  inv_collocazione.value.push("");

  // TOTAL RESULTS
  schedeQTY.value = await directus.items("inventario").readByQuery({
    fields: ["COUNT(*)"],
    limit: -1,
  });
}
function infoQty(qty) {
  try {
    let data;
    if (qty !== undefined && qty !== "advanced") {
      resultLimit.value = qty;
    } else if (qty == "advanced") {
      data = itemsBeforeAdvancedSearch.value.data;
    } else {
      data = itemsFiltered.data;
    }

    items.value = data.slice(0, resultLimit.value);
    if (qty == "advanced") {
      totalResult.value = data.length;
    } else {
      totalResult.value = itemsFiltered.data.length;
    }
    totalPages.value = Math.ceil(totalResult.value / resultLimit.value);
  } catch (error) { }
  skipPage("first");
}

// CHANGE PAGE
function skipPage(page) {
  if (page == "pass" && currentPage.value < totalPages.value) {
    currentPage.value++;
  } else if (page == "substract" && currentPage.value > 1) {
    currentPage.value--;
  } else if (page == "first") {
    currentPage.value = 1;
  } else if (page == "last") {
    currentPage.value = totalPages.value;
  }
  let data = 0;
  if (itemsBeforeAdvancedSearch.value !== undefined) {
    data = itemsBeforeAdvancedSearch.value.data;
  } else {
    data = itemsFiltered.data;
  }
  data.slice(1, 3);
  items.value = data.slice(
    (currentPage.value - 1) * resultLimit.value,
    currentPage.value * resultLimit.value
  );
  fetchIcons();
  fetchRelations();
}

async function fetchData(predata) {
  me.value = await directus.users.me.read();
  clearAdvancedSearch();

  items.value = null;
  role.value = me.value.role;
  let rolResponse = await directus
    .items("directus_roles")
    .readByQuery({ filter: { id: { _eq: role.value } } });
  if (rolResponse.data[0].name === "Administrator") {
    isAdmin.value = true;
  }

  storageManager.set(form.value);

  counter.value = 0;
  loaded.value = false;
  let query = {
    limit: -1,
    filter: {},
    fields:
      "id,invn,inventario_1930,inventario_1973,IBS,autore,soggetto,quantita,icona,app,web,inv_oggetto,oa",
  };
  if (piano.value !== "all" && prefilter.value) {
    makeEmptyForm();
    let queryFromParams = JSON.parse(piano.value);

    const myTimeout = setTimeout(console.log("prefilter"), 4000);
    query = queryFromParams;

    window.scrollTo(0, 0);
    prefilter.value = false;
  } else {
    if (form.value.id !== "" && form.value.id !== undefined) {
      query["filter"]["id"] = { _eq: form.value.id };
    }
    if (form.value.autore !== "" && form.value.autore !== undefined) {
      query["filter"]["autore"] = { _contains: form.value.autore };
    }

    if (form.value.sgti !== "" && form.value.sgti !== undefined) {
      query["filter"]["soggetto"] = { _contains: form.value.sgti };
    }
    if (form.value.ibs !== "" && form.value.ibs !== undefined) {
      query["filter"]["IBS"] = { _contains: form.value.ibs };
    }
    if (form.value.inv_oggetto !== "" && form.value.inv_oggetto !== undefined) {
      const privateData = await directus.items("inv_oggetto").readByQuery({
        filter: {
          inv_oggetto: {
            _contains: form.value.inv_oggetto,
          },
        },
        limit: -1,
      });
      if (privateData.data.length > 0) {
        const ogtdId = privateData.data.map(({ id }) => id);
        query["filter"]["inv_oggetto"] = { _in: ogtdId };
      } else {
        query["filter"]["inv_oggetto"] = { _in: null };
      }
    }
    // INVENTARIO
    if (form.value.invn !== "" && form.value.invn !== undefined) {
      query["filter"]["invn"] = {
        _contains: form.value.invn,
      };
    }
    if (form.value.materia !== "" && form.value.materia !== undefined) {
      const privateData = await directus.items("inv_materia").readByQuery({
        filter: {
          inv_materia: { _contains: form.value.materia },
        },
        limit: -1,
      });
      const idmtc = privateData.data.map(({ id }) => id);

      const opereMtc = await directus
        .items("inventario_inv_materia")
        .readByQuery({
          filter: {
            inv_materia_id: { _in: idmtc },
          },
          limit: -1,
        });
      const idOpereMTC = opereMtc.data.map(({ id }) => id);
      query["filter"]["inv_materia"] = {
        _in: idOpereMTC,
      };
    }

    if (
      form.value.inventario_1930 !== "" &&
      form.value.inventario_1930 !== undefined
    ) {
      query["filter"]["inventario_1930"] = { _eq: form.value.inventario_1930 };
    }
    if (form.value.dismesso !== false && form.value.dismesso !== undefined) {
      query["filter"]["dismesso"] = { _eq: true };
    }
    if (form.value.deposito !== false && form.value.deposito !== undefined) {
      query["filter"]["deposito"] = { _eq: true };
    }
    if (form.value.esposta !== false && form.value.esposta !== undefined) {
      query["filter"]["in_museo"] = { _eq: true };
    }
    if (form.value.esposta !== false && form.value.deposito !== false) {
      query["filter"]["deposito"] = { _eq: null };
    }
    // if (form.value.inMuseo !== false) {
    //   query["filter"]["in_museo"] = { _eq: true };
    // }

    if (form.value.nctn !== "" && form.value.nctn !== undefined) {
      query["filter"]["nctn"] = {
        _contains: form.value.nctn,
      };
    }
    if (form.value.provenienza !== "" && form.value.provenienza !== undefined) {
      query["filter"]["provenienza"] = {
        _contains: form.value.provenienza,
      };
    }
    if (
      form.value.inventario_1973 !== "" &&
      form.value.inventario_1973 !== undefined
    ) {
      query["filter"]["inventario_1973"] = { _eq: form.value.inventario_1973 };
    }
    if (
      (form.value.inv_collocazione !== "" &&
        form.value.inv_collocazione !== undefined) ||
      predata !== "all"
    ) {
      if (predata !== "all") {
        form.value.inv_collocazione = predata;
      }
      const response = await directus.items("inv_collocazione").readByQuery({
        filter: {
          inv_collocazione: { _eq: form.value.inv_collocazione },
        },
        limit: -1,
      });
      const idCollocazione = response.data.map(({ id }) => id);
      query["filter"]["inv_collocazione"] = {
        _in: idCollocazione,
      };
    }
  }

  try {
    query["filter"]["status"] = { _eq: "attivo" };
    const response = await directus.items('inventario').readByQuery(query);
    itemsFiltered = response;
    const { data = [] } = response;
    if (data.length < 1) {
      items.value = null;
    } else {
      loaded.value = true;

      items.value = data;
      noResult.value = false;

      totalItems2.value = items.value.length;
    }
  } catch (error) {
    items.value = null;
  }

  // SAVED ITEMS
  if (items.value == null) {
    loaded.value = true;
    noResult.value = true;
  }

  infoQty();
}
async function fetchRelations() {
  counter.value = 0;
  let autoreNames = "";
  let ogtdNames = "";
  let inventarioNames = "";
  let query = {
    limit: -1,
    filter: {},
  };
  const opereAutore = await directus.items("opera_autore").readByQuery(query);
  const autoreData = await directus.items("autore").readByQuery(query);

  const ogtdData = await directus.items("ogtd").readByQuery(query);

  const opereInventario = await directus
    .items("opera_inventario")
    .readByQuery(query);
  const inventarioData = await directus.items("inventario").readByQuery(query);

  // AUTORE
  items.value.forEach((item) => {
    autoreNames = "";
    if (
      Array.isArray(item.autore) &&
      (item.autore.length > 0 || item.autore !== null)
    ) {
      item.autore.forEach((itemAutore) => {
        opereAutore.data.forEach((relationalItem) => {
          if (relationalItem.id == itemAutore) {
            autoreData.data.forEach((relationalAutore) => {
              if (relationalItem.autore_id == relationalAutore.id) {
                autoreNames += relationalAutore.autn + " ";
              }
            });
          }
        });
      });
      try {
        items.value[counter.value].autore = autoreNames;
      } catch (error) { }

      counter.value++;
    }
  });
  // OGTD
  counter.value = 0;
  items.value.forEach((item) => {
    ogtdNames = "";
    if (item.ogtd !== null && item.ogtd !== "") {
      ogtdData.data.forEach((ogtdItem) => {
        if (ogtdItem.id == item.ogtd) {
          items.value[counter.value].ogtd = ogtdItem.ogtd;
        }
      });
    }
    counter.value++;
  });
  console.log('test');

  // INV
  counter.value = 0;
  items.value.forEach((item) => {
    inventarioNames = "";
    if (Array.isArray(item.inv) && item.inv.length > 0 && item.inv !== null) {
      item.inv.forEach((itemInv) => {
        opereInventario.data.forEach((relationalItem) => {
          if (relationalItem.id == itemInv) {
            inventarioData.data.forEach((relationalInv) => {
              if (relationalItem.inventario_id == relationalInv.id) {
                inventarioNames += relationalInv.invn + " ";
              }
            });
          }
        });
      });
    }
    try {
      // items.value[counter.value].inv = inventarioNames;
    } catch (error) { }

    counter.value++;
  });
  try {
    for (let index = 0; index < items.value.length; index++) {
      document.getElementById("photo-" + index).src = imageurl.value;
    }

    url.value = import.meta.env.VITE_API_BASE_URL;
    const imagesDirectory = await directus
      .items("directus_files")
      .readByQuery({ limit: -1 });
    counter.value = 0;

    items.value.forEach((item) => {
      if (item.icona !== null) {
        imagesDirectory.data.forEach((imageItem) => {
          if (item.icona == imageItem.id) {
            image.value = imageItem.id;
          }
        });

        let imageElement = document.getElementById("photo-" + counter.value);
        const imageUrl = url.value + "/assets/" + image.value; // generates url
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
      }

      counter.value++;
    });
  } catch (error) { }
}
async function fetchIcons() {
  // SAVE BUTTON
  me.value = await directus.users.me.read();

  let query2 = {
    limit: -1,
    filter: {
      user_created: {
        _eq: me.value.id,
      },
    },
  };
  const responseSaved = await directus.items("prefI").readByQuery(query2);

  for (let x = 0; x < responseSaved.data.length; x++) {
    try {
      let iconSaved = document.getElementById(
        "saveButton-" + responseSaved.data[x].id_opera
      );

      iconSaved.className = "bi bi-heart-fill";
    } catch (error) { }
  }
  // PHONE BUTTON
  for (let index = 0; index < items.value.length; index++) {
    if (items.value[index].app !== null) {
      try {
        let iconPhone = document.getElementById(
          "phoneButton-" + items.value[index].id
        );

        iconPhone.className = "bi bi-phone-fill";
      } catch (error) { }
    }
  }
  for (let index = 0; index < items.value.length; index++) {
    if (items.value[index].web !== null) {
      try {
        let iconWeb = document.getElementById(
          "webButton-" + items.value[index].id
        );

        iconWeb.className = "bi bi-tv-fill";
      } catch (error) { }
    }
  }

  // TOUCHSCREEN BUTTON
  for (let index = 0; index < items.value.length; index++) {
    if (
      items.value[index].touch !== null &&
      items.value[index].touch !== undefined
    ) {
      try {
        let iconTouch = document.getElementById(
          "touchButton-" + items.value[index].id
        );

        iconTouch.className = "bi bi-map-fill";
      } catch (error) { }
    }
  }

  for (let index = 0; index < items.value.length; index++) {
    if (items.value[index].oa !== null && items.value[index].oa !== undefined) {
      try {
        let iconTouch = document.getElementById(
          "OAButton-" + items.value[index].id
        );

        iconTouch.className = "bi bi-palette-fill";
      } catch (error) { }
    }
  }
}

function clearData() {
  storageManager.remove();
  form.value = makeEmptyForm();
  totalResult.value = 0;
  totalPages.value = 0;
  currentPage.value = 0;
  url.value = window.location.origin;
  itemsFiltered = null;
  loaded.value = true;
  // CLEAR TABLEE
  items.value = null;
  clearAdvancedSearch();
}

async function deleteItem(item) {
  await directus.items("inventario").updateOne(item.id, { status: "bozza" });

  fetchData();
}
function onEditClicked(item) {
  router.push({
    name: "editItemArc",
    params: { id: item.id, collection: collection.value },
  });
}
async function onDeleteClicked(item) {
  const confirmed = await modal.confirm({
    title: "Confirm",
    body: "Sei sicuro di voler eliminare questo elemento?",
  });
  if (confirmed) deleteItem(item);
}
function onInfoClicked(item) {
  currentItem.value = item;
  showAlert.value = true;
}

async function onSaveClicked(item) {
  let iconSaved = document.getElementById("saveButton-" + item.id);
  if (iconSaved.classList.contains("bi-heart")) {
    iconSaved.className = "bi bi-heart-fill";
    await directus.items("prefI").createOne({
      id_opera: item.id,
    });
  } else {
    iconSaved.className = "bi bi-heart";

    let query = {
      limit: -1,
      filter: {
        id_opera: {
          _eq: item.id,
        },
        user_created: {
          _eq: me.value.id,
        },
      },
    };

    iconSaved.className = "bi bi-heart";
    let response = await directus.items("prefI").readByQuery(query);
    await directus.items("prefI").deleteOne(response.data[0].id);
  }
}

function closeAlert() {
  showAlert.value = false;
}
function printS() {
  router.push({
    name: "modelSan",
    params: { id: currentItem.value.id },
  });
}
function printP() {
  router.push({
    name: "modelPres",
    params: { id: currentItem.value.id },
  });
}
function printScheda() {
  router.push({
    name: "printItem",
    params: { id: parseInt(currentItem.value.id) },
  });
}

async function createApp(itemSelected) {
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: itemSelected.id },
    },
    limit: 1,
  });
  let item = Myitem.data[0];

  let iconPhone = document.getElementById("phoneButton-" + item.id);
  if (iconPhone.classList.contains("bi-phone") && item.inv_materia !== null) {
    const opereMtc = await directus
      .items("inventario_inv_materia")
      .readByQuery({
        filter: {
          inventario_id: { _in: item.id },
        },
        limit: -1,
      });
    const idOpereMTC = opereMtc.data.map(
      ({ inv_materia_id }) => inv_materia_id
    );

    const mtcValueApp = await directus.items("inv_materia").readByQuery({
      filter: {
        id: { _in: idOpereMTC },
      },
      limit: -1,
    });
    let mtcAPP = "";
    for (let index = 0; index < mtcValueApp.data.length; index++) {
      mtcAPP += mtcValueApp.data[index].inv_materia + " ";
    }

    iconPhone.className = "bi bi-phone-fill";

    const response2 = await directus.items("app").createOne({
      icona: item.icona,
      invn: item.invn,
      autn: itemSelected.autore,
      inv_oggetto: itemSelected.inv_oggetto,
      piano: item.inv_piano,
      materia: mtcAPP,
      sala: item.inv_sala,
      parete: item.parete,
      sgti: itemSelected.soggetto,
      descrizione: item.descrizione,
      specifiche: item.ubi_specifica,
      id_opera: item.id,
    });
    const response = await directus
      .items("inventario")
      .updateOne(item.id, { app: response2.id });
  }
}
async function createWeb(itemSelected) {
  var mtcApp = "";
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: itemSelected.id },
    },
    limit: 1,
  });
  let item = Myitem.data[0];

  let iconWeb = document.getElementById("webButton-" + item.id);
  if (iconWeb.classList.contains("bi-tv") && item.inv_materia !== null) {
    const opereMtc = await directus
      .items("inventario_inv_materia")
      .readByQuery({
        filter: {
          inventario_id: { _in: item.id },
        },
        limit: -1,
      });
    const idOpereMTC = opereMtc.data.map(
      ({ inv_materia_id }) => inv_materia_id
    );

    try {
      const mtcValueApp = await directus.items("inv_materia").readByQuery({
        filter: {
          id: { _in: idOpereMTC },
        },
        limit: -1,
      });
      mtcApp = ""; // Corrected variable name
      for (let index = 0; index < mtcValueApp.data.length; index++) {
        mtcApp += mtcValueApp.data[index].inv_materia + " ";
      }
    } catch (error) {
      mtcApp = ""; // Corrected variable name
    }

    try {
      const oggettoValueApp = await directus.items("inv_oggetto").readByQuery({
        filter: {
          id: { _eq: itemSelected.inv_oggetto },
        },
        limit: -1,
      });
      itemSelected.inv_oggetto = oggettoValueApp.data[0].inv_oggetto;
    } catch (error) {
      itemSelected.inv_oggetto = "";
    }

    iconWeb.className = "bi bi-tv-fill";
    const response2 = await directus.items("web").createOne({
      icona: item.icona,
      invn: item.inventario_1973,
      autn: itemSelected.autore,
      ogtd: itemSelected.inv_oggetto,
      piano: item.inv_piano,
      materia: mtcApp,
      sala: item.inv_sala,
      parete: item.parete,
      sgti: itemSelected.soggetto,
      descrizione: item.descrizione,
      specifiche: item.ubi_specifica,
      id_opera: item.id,
    });
    const response = await directus
      .items("inventario")
      .updateOne(item.id, { web: response2.id });
  }
}

async function createOA(itemSelected) {
  var mtcApp = "";
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: itemSelected.id },
    },
    fields: "*.*",
    limit: 1,
  });
  let item = Myitem.data[0];

  let iconWeb = document.getElementById("OAButton-" + item.id);
  if (iconWeb.classList.contains("bi-palette") && item.inv_materia !== null) {
    const opereMtc = await directus
      .items("inventario_inv_materia")
      .readByQuery({
        filter: {
          inventario_id: { _in: item.id },
        },
        limit: -1,
      });
    const idOpereMTC = opereMtc.data.map(
      ({ inv_materia_id }) => inv_materia_id
    );
    try {
      const mtcValueApp = await directus.items("inv_materia").readByQuery({
        filter: {
          id: { _in: idOpereMTC },
        },
        limit: -1,
      });
      mtcApp = ""; // Corrected variable name
      for (let index = 0; index < mtcValueApp.data.length; index++) {
        mtcApp += mtcValueApp.data[index].inv_materia + " ";
      }
    } catch (error) {
      mtcApp = ""; // Corrected variable name
    }
    try {
      const idOpereStima = item.inv_stima.map(
        ({ inv_stima_id }) => inv_stima_id
      );

      const stimaValue = await directus.items("inv_stima").readByQuery({
        filter: {
          id: { _in: idOpereStima },
        },
        limit: -1,
      });
      item.inv_stima = stimaValue.data;

      let stimaTempString = "";
      for (let index = 0; index < stimaValue.data.length; index++) {
        stimaTempString += stimaValue.data[index].inv_stis;
        // if (stimaValue.data[index].inv_stim) {
        //   stimaTempString += " (" + stimaValue.data[index].inv_stim + ")";
        // }
        if (index > 0) {
          stimaTempString += ", ";
        }
        console.log(stimaTempString);
      }
      item.inv_stima = stimaTempString;
      if (item.inv_stima == []) {
        item.inv_stima = null;
      }
    } catch (error) {
      console.log("Error fetching stima (OA)" + error);
      item.inv_stima = "";
    }

    try {
      const oggettoValueApp = await directus.items("inv_oggetto").readByQuery({
        filter: {
          id: { _eq: itemSelected.inv_oggetto },
        },
        limit: -1,
      });
      itemSelected.inv_oggetto = oggettoValueApp.data[0].inv_oggetto;
    } catch (error) {
      itemSelected.inv_oggetto = "";
    }
    iconWeb.className = "bi bi-palette-fill";
    console.log(item.inv_collocazione);
    if (item.inv_collocazione == null) {
      item.inv_collocazione = {};
      item.inv_collocazione.inv_collocazione = "";
    }

    const response2 = await directus.items("opera").createOne({
      icona: item.icona,
      inventario: item.id,
      nctn: itemSelected.nctn,
      ogtd_oa: itemSelected.inv_oggetto,
      qntn: itemSelected.quantita,
      sgti: itemSelected.soggetto,
      deposito: itemSelected.deposito,
      piano: itemSelected.inv_piano,
      sala: item.inv_sala,
      parete: item.parete,
      specifiche: item.ubi_specifica,
      acquisizione: item.acquisizione,
      materia: mtcApp,
      misure: item.misure,
      autore_inv: itemSelected.autore,
      data: item.data,
      oss: item.note,
      cdgs: item.proprieta,
      dismesso: item.dismesso,
      provenienza: item.provenienza,
      prestito_inv: item.prestito,
      invn: item.invn,
      ibs: item.IBS,
      inventario_1930: item.inventario_1930,
      inventario_1973: item.inventario_1973,
      collocazione_inv: item.inv_collocazione.inv_collocazione,
      stima_inv: item.inv_stima,
    });
    const response = await directus
      .items("inventario")
      .updateOne(item.id, { oa: response2.id });
  }
}

async function createTouch(itemSelected) {
  const Myitem = await directus.items("inventario").readByQuery({
    filter: {
      id: { _eq: itemSelected.id },
    },
    limit: -1,
  });
  let item = Myitem.data[0];
  let iconPhone = document.getElementById("touchButton-" + item.id);
  if (iconPhone.classList.contains("bi-map")) {
    const opereMtc = await directus.items("opera_mtc").readByQuery({
      filter: {
        id: { _in: item.mtc },
      },
      limit: -1,
    });
    const idOpereMTC = opereMtc.data.map(({ mtc_id }) => mtc_id);

    const mtcValueApp = await directus.items("mtc").readByQuery({
      filter: {
        id: { _in: idOpereMTC },
      },
      limit: -1,
    });
    let mtcAPP = "";
    for (let index = 0; index < mtcValueApp.data.length; index++) {
      mtcAPP += mtcValueApp.data[index].mtc + " ";
    }

    iconPhone.className = "bi bi-map-fill";
    const MyItem = await directus.items("inventario").readByQuery({
      filter: {
        id: { _eq: item.id },
      },
      limit: -1,
    });
    // TAKE AUTORE INFO
    let autaValues = "";
    let autsID = [];
    let autsValues = "";

    try {
      const autoreOpera = await directus.items("opera_autore").readByQuery({
        filter: {
          id: { _in: MyItem.data[0].autore },
        },
        limit: -1,
      });

      const autoreIds = autoreOpera.data.map((item) => item.autore_id);
      const autores = await directus.items("autore").readByQuery({
        filter: {
          id: { _in: autoreIds },
        },
        limit: -1,
      });

      for (let index = 0; index < autores.data.length; index++) {
        autaValues += autores.data[index].auta + "";
        autsID.push(autores.data[index].auts);
      }
      const autsAutore = await directus.items("auts").readByQuery({
        filter: {
          id: { _in: autsID },
        },
        limit: -1,
      });

      for (let index = 0; index < autsAutore.data.length; index++) {
        autsValues += autsAutore.data[index].auts + " ";
      }
    } catch (error) {
      autaValues = "";
      autsValues = "";
      item.autore = "";
    }
    // COLLEZIONE
    let appCollection;
    try {
      const collezione = await directus.items("collezione").readByQuery({
        filter: {
          id: { _eq: item.collezione },
        },
        limit: -1,
      });
      appCollection = collezione.data[0].collezione;
    } catch (error) {
      appCollection = "";
    }
    // Localizzazione

    let tclFinal = "";
    let prvcFinal = "";
    let prcdFinal = "";
    try {
      const locIDS = MyItem.data.map((item) => item.localizzazione);

      const locOpera = await directus
        .items("opera_localizzazione")
        .readByQuery({
          filter: {
            id: { _in: locIDS },
          },
          limit: -1,
        });
      const locFinalId = locOpera.data.map((item) => item.localizzazione_id);
      const localizzazioneFinal = await directus
        .items("localizzazione")
        .readByQuery({
          filter: {
            id: { _in: locFinalId },
          },
          limit: -1,
        });
      for (let index = 0; index < localizzazioneFinal.data.length; index++) {
        prcdFinal += localizzazioneFinal.data[index].prcd + " ";

        const prvcResult = await directus.items("prvc").readByQuery({
          filter: {
            id: { _in: localizzazioneFinal.data[index].prvc },
          },
          limit: -1,
        });
        for (let index = 0; index < prvcResult.data.length; index++) {
          prvcFinal += prvcResult.data[index].prvc + " ";
        }

        const tclResult = await directus.items("tcl").readByQuery({
          filter: {
            id: { _in: localizzazioneFinal.data[index].tcl },
          },
          limit: -1,
        });
        for (let index = 0; index < tclResult.data.length; index++) {
          tclFinal += tclResult.data[index].tcl + " ";
        }
      }
    } catch (error) { }
    const response2 = await directus.items("touch").createOne({
      icona: item.icona,
      invn: item.invn,
      autn: itemSelected.autore,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      inv_oggetto: itemSelected.inv_oggetto,
      piano: item.piano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: item.sala,
      parete: item.parete,
      sgti: itemSelected.sgti,
      descrizione: item.descrizione_breve,
      specifiche: item.specifiche,
      id_opera: item.id,
      mappa: {
        type: "Point",
        coordinates: [9.186859843491261, 45.46276475217099],
      },
    });
    const response = await directus
      .items("inventario")
      .updateOne(item.id, { touch: response2.id });
  }
}

function filterTable() {
  secondFilter.value = true
  const searchInput = advancedSearchInput.value.toLowerCase();
  itemsBeforeAdvancedSearch.value = itemsFiltered.data;
  let itemsToSearch = itemsFiltered.data;
  const filteredItems = itemsToSearch.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchInput);
      }
      return false;
    });
  });
  itemsBeforeAdvancedSearch.value.data = filteredItems;
  infoQty("advanced");
}
function clearAdvancedSearch() {
  advancedSearchInput.value = "";
  secondFilter.value = false;
  try {
  filterTable();
  } catch (error) { }

}
</script>

<style scoped>
.pagination-container {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  overflow: auto;
}

h5 {
  font-size: 16px;
}

.resti {
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.acqn:checked {
  background-color: red;
}

.cardSelector {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.cardSelector:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 2;
}
</style>
