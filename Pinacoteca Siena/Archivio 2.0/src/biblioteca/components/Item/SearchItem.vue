<template>
  <main id="main" class="main" v-if="userRolePermissions">
    <!-- FORM WITH SARCH INPUTS -->
    <div class="col-12">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-invn`">Numero scheda (INVN):</label>

          <input type="text" class="form-control" v-model="form.invn" :id="`form-invn`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-id`">ID:</label>
          <input type="text" class="form-control" v-model="form.id" :id="`form-id`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-bib_autore`">Autore:</label>
          <AutoComplete v-model="form.bib_autore" forceSelection fluid :suggestions="itemsA" @complete="searchA" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-curatore`">Curatore:</label>
          <AutoComplete v-model="form.curatore" forceSelection fluid :suggestions="itemsC" @complete="searchC" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-bib_titolo`">Titolo:</label>
          <input type="text" class="form-control" v-model="form.bib_titolo" :id="`form-bib_titolo`" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-bib_collocazione`">Collocazione:</label>
          <input type="text" class="form-control" v-model="form.bib_collocazione" :id="`form-bib_collocazione`"
            aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-bib_armadio`">Armadio:</label>
          <AutoComplete v-model="form.bib_armadio" forceSelection fluid :suggestions="itemsCo" @complete="searchCo" />
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
        {{ totalResult }}/{{ numberWithCommas(schedeQTY) }} schede.
        <br />
        Pagina {{ currentPage }}/{{ totalPages }} ({{ resultLimit }} schede per
        pagina).
      </div>

      <div class="form-check" style="float: right;display:none">
        <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDefault1"
          v-model="selectedInterface" value="list" />
        <label class="form-check-label" for="flexRadioDefault1"> Lista </label>
      </div>

      <!-- <div class="form-check" style="float: right">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDisabled"
          id="flexRadioDefault2"
          v-model="selectedInterface"
          value="card"
          disabled
        />

        <label class="form-check-label" for="flexRadioDefault2">
          Carta &nbsp;
        </label>
      </div> -->
      <br />
      <div style="float: right">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Cerca" id="advancedSearch"
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
      <div style="text-align:center"> <button type="button" class="btn btn-outline-warning"
          v-if="totalResult < 51 && totalResult !== 0" @click="stampaLista()">Stampa tutte le schede della
          pagina</button>
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
                    v-if="userRolePermissions.biblioteca.edit">
                    <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                  </button>

                  <button title="save" class="btn btn-sm btn-light text-danger" @click="onSaveClicked(item)">
                    <i class="bi bi-heart" :id="'saveButton-' + item.id"></i>
                  </button>
                  <button title="delete" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)"
                    v-if="userRolePermissions.biblioteca.delete">
                    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                  </button>

                  <button title="Info" class="btn btn-sm btn-light" @click="stampaLibroSingolo(item)">
                    <font-awesome-icon icon="fa-solid fa-eye" />
                  </button>
                </div>
              </template>

              <template #cell(prestito)="{ item }" v-if="userRolePermissions.biblioteca.create">
                <button title="Info" class="btn btn-sm btn-light" @click="onInfoClickedP(item)"
                  style="width: 100%; height: 100%" v-if="item.fine_prestito == null">
                  <font-awesome-icon icon="fa-solid fa-book-open-reader" size="2xl" />
                </button>
                <span v-else>{{ item.fine_prestito }}</span>
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
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        ">
                        <img :src="imageurlBase +
                          '/igm/images/preview/0001/' +
                          item.image
                          " alt="" style="max-width: 250px; max-height: 250px" :id="'photo-' + index" />
                      </div>
                      <div class="text-center">
                        <h5 style="margin-top: 20px">
                          {{ item.image }}<br />
                          {{ item.invn }}<br />
                          <i>{{ item.sglt }}</i>
                        </h5>
                        <div class="actions">
                          <button title="edit" class="btn btn-sm btn-light" @click="onEditClicked(item)"
                            v-if="userRolePermissions.biblioteca.edit">
                            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                          </button>

                          <button title="delete" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)"
                            v-if="userRolePermissions.biblioteca.delete">
                            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                          </button>
                          <button title="Info" class="btn btn-sm btn-light" @click="onInfoClicked(item) || isAdmin">
                            <font-awesome-icon icon="fa-solid fa-eye" />
                          </button>
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
    <div class="modal fade show" id="ExtralargeModal" tabindex="-1" style="display: block;z-index: 999;" aria-modal="true"
      role="dialog" v-if="showAlert">

      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tipo di stampa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closeAlert"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12" @click="stampaLibroSingolo(currentItem)">
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa scheda</h5>
                    <img src="/stampaLibro.png" style="width: 100%; max-height: 600px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PRESTITO -->
    <div class="modal fade show" id="ExtralargeModal" tabindex="-1" style="display: block;z-index: 999;" aria-modal="true"
      role="dialog" v-if="showAlertP">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ currentItem.bib_titolo }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closeAlert"></button>
          </div>
          <div class="modal-body">
            <br />
            <h4>LIBRO</h4>
            <hr />
            <Table class="table v-middle m-0" :items="currentItemT" :fields="fields2" id="table"></Table>
            <br />
            <h4>UTENTE</h4>
            <hr />
            <Form :fields="fieldsU"> </Form>
            <h4>DATA DI FINE DEL PRESTITO</h4>
            <hr />

            <input class="form-control form-control-lg" type="date" placeholder=".form-control-lg" id="dateInput" />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeAlert()">
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="checkCampsPrestito()">
              Salva
            </button>
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
import AutoComplete from "primevue/autocomplete";
import Form from "../common/Form/Form.vue";
import StampaLibro from "./PrintItem/stampaLibro.vue";
import store from "../../../store";

const route = useRoute();
const router = useRouter();
const modal = inject("$modalManager");

const originalitemsA = ref();
const originalitemsC = ref();
const originalitemsCo = ref();
const itemsA = ref();
const itemsC = ref();
const itemsCo = ref();

const storageManager = useStorage("advanced-search-form-BIB");
const mtct_F = ref([]);
const showInfo = ref(false);
const totalItems2 = ref(0);
const collection = [];
const items = ref(null);
const fields = ref([]);
const fields2 = ref([]);
const fieldsU = ref([]);

var itemsFiltered = [];
var totalResult = ref(0);
var totalPages = ref();
let currentPage = ref(0);
let currentItem = ref();
let selectedInterface = ref("list");
const advancedSearchInput = ref("");
const url = ref();
let imageurlBase = ref(generateURL());
const me = ref();
const showAlert = ref(false);
const showAlertP = ref(false);
const counter = ref(0);
const loaded = ref(true);
let noResult = ref(false);
const ogtt = ref([]);
const lrcr = ref([]);
const currentItemT = ref([]);
let resultLimit = ref(50);
const schedeQTY = ref();
const itemsBeforeAdvancedSearch = ref();
const props = defineProps({
  piano: { type: String, default: "" },
});

const { piano } = toRefs(props);
const makeEmptyForm = () => ({
  id: "",
  bib_titolo: "",
  bib_autore: "",
  bib_curatore: "",
  bib_collocazione: "",
  bib_inventario: "",
  bib_armadio: "",
});
const form = ref(storageManager.get() ?? makeEmptyForm());
const role = ref();
const isAdmin = ref(true);
const create = ref(false);
const edit = ref(false);
const cancel = ref(false);
const queryToPrint = ref();
const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);
// watch the route and update data based on the collection param
watch(
  route,
  () => {
    getUserData();
    collection.value = "biblioteca";
        form.value = JSON.parse(sessionStorage.getItem('advanced-search-form-BIB')) ?? makeEmptyForm();
    const hasValue = Object.values(form.value).some(val => {
      if (typeof val === 'string' && val.trim() !== "") return true;
      if (typeof val === 'boolean' && val === true) return true;
      if (typeof val === 'number' && !isNaN(val)) return true;
      return false;
    });
    if (hasValue) {
      fetchData();
    }
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    fetchRelationalItems();
  },
  { immediate: true, deep: true }
);
watch(selectedInterface, () => {
  skipPage("first");
  //IMAGES
});
onMounted(async () => {
  if (piano.value !== "all") {
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
function generateURL() {
  let url = import.meta.env.VITE_API_BASE_URL;
  let urlWithoutPort = url.replace(/:\d+/, "");
  return urlWithoutPort;
}

function searchA(event) {
  itemsA.value = originalitemsA.value;

  const filtered = itemsA.value.filter(
    (item) => item.toUpperCase().includes(event.query.toUpperCase()) // Filters the suggestions
  );

  itemsA.value = filtered;
}
function searchC(event) {
  itemsC.value = originalitemsC.value;

  const filtered = itemsC.value.filter(
    (item) => item.toUpperCase().includes(event.query.toUpperCase()) // Filters the suggestions
  );

  itemsC.value = filtered;
}
function searchCo(event) {
  itemsCo.value = originalitemsCo.value;

  const filtered = itemsCo.value.filter(
    (item) => item.toUpperCase().includes(event.query.toUpperCase()) // Filters the suggestions
  );

  itemsCo.value = filtered;
}
async function getUserData() {
  // me.value = await directus.users.me.read();
  // role.value = me.value.role;
  // let response = await directus.items("directus_permissions").readByQuery({
  //   filter: {
  //     role: {
  //       _eq: role.value,
  //     },
  //     action: {
  //       _neq: "read",
  //     },
  //     collection: {
  //       _eq: collection.value,
  //     },
  //   },
  //   limit: -1,
  // });
  // response.data.forEach((element) => {
  //   switch (element.action) {
  //     case "create":
  //       create.value = true;
  //       break;
  //     case "update":
  //       edit.value = true;
  //       break;
  //     case "delete":
  //       cancel.value = true;
  //       break;
  //   }
  // });
  create.value = true;
  edit.value = true;
  cancel.value = true;
}
const createLink = computed(() => ({
  name: "createItem",
  params: { collection: collection.value },
}));
async function fetchRelationalItems() {
  const response = await directus
    .items("mtct_F")
    .readByQuery({ limit: -1, sort: "mtct_F" });
  mtct_F.value = response.data.map((item) => item.mtct_F);
  mtct_F.value.push("");

  // BEFORE IT WAS ogtd_f
  const response2 = await directus
    .items("ogtt_F")
    .readByQuery({ limit: -1, sort: "ogtt" });
  ogtt.value = response2.data.map((item) => item.ogtt);
  ogtt.value.push("");
  const response3 = await directus
    .items("lrcr_f")
    .readByQuery({ limit: -1, sort: "lrcr" });
  lrcr.value = response3.data.map((item) => item.lrcr);
  lrcr.value.push("");
  // TOTAL RESULTS

  const responseA = await directus
    .items("bib_autore")
    .readByQuery({ limit: -1, sort: "bib_autore" });
  itemsA.value = responseA.data.map((item) => item.bib_autore);

  originalitemsA.value = itemsA.value;

  const responseC = await directus
    .items("bib_curatore")
    .readByQuery({ limit: -1, sort: "bib_curatore" });
  itemsC.value = responseC.data.map((item) => item.bib_curatore);
  originalitemsC.value = itemsC.value;

  const responseCo = await directus
    .items("bib_armadio")
    .readByQuery({ limit: -1, sort: "bib_armadio" });
  itemsCo.value = responseCo.data.map((item) => item.bib_armadio);
  originalitemsCo.value = itemsCo.value;

  schedeQTY.value = await directus.items("Foto").readByQuery({
    filter: { status: { _eq: "attivo" } },
    aggregate: { count: "*" },
  });

  schedeQTY.value = schedeQTY.value.data[0].count;
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
      totalResult.value = numberWithCommas(data.length);
    } else {
      totalResult.value = numberWithCommas(itemsFiltered.data.length);
    }
    totalPages.value = Math.ceil(totalResult.value / resultLimit.value);
  } catch (error) { }
  skipPage("first");
}
function numberWithCommas(x) {
  // var parts = x.toString().split(".");
  // parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
  // return parts.join(".");
  return x;
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

async function fetchData(settings) {
  try {
  } catch (error) { }
  storageManager.set(form.value);

  const emptyFields = Object.values(form.value).every((value) => value === "");

  if (emptyFields && piano.value == "all") {
    const confirmed = await modal.alert({
      title: "ERRORE",
      body: "È necessario inserire un filtro ",
    });
  } else {
    counter.value = 0;
    loaded.value = false;
    let query = {
      limit: -1,
      filter: {},
      fields:
        "id,bib_inventario,bib_titolo,bib_autore,bib_curatore,bib_anno,collocazione_2,bib_luogo2.bib_luogo,bib_armadio.bib_armadio,fine_prestito",
    };
    if (piano.value !== "all") {
      makeEmptyForm();
      let queryFromParams = JSON.parse(piano.value);

      const myTimeout = setTimeout(console.log("prefilter"), 4000);
      query = queryFromParams;
      piano.value = "all";
    } else {
      if (form.value.bib_titolo !== "") {
        query["filter"]["bib_titolo"] = { _contains: form.value.bib_titolo };
      }
      if (form.value.id !== "" && form.value.id !== undefined) {
        query["filter"]["id"] = { _eq: parseInt(form.value.id) };
      }
      if (form.value.invn !== "" && form.value.invn !== undefined) {
        query["filter"]["bib_inventario"] = { _eq: form.value.invn };
      }
      if (form.value.bib_autore !== "" && form.value.bib_autore !== undefined) {
        query["filter"]["bib_autore"] = {
          bib_autore_id: {
            bib_autore: {
              _contains: form.value.bib_autore,
            },
          },
        };
      }
      if (form.value.curatore !== "" && form.value.curatore !== undefined) {
        query["filter"]["bib_curatore"] = {
          bib_curatore_id: {
            bib_curatore: {
              _eq: form.value.curatore,
            },
          },
        };
      }

      if (
        form.value.bib_collocazione !== "" &&
        form.value.bib_collocazione !== undefined
      ) {
        query["filter"]["collocazione_2"] = {
          _contains: form.value.bib_collocazione,
        };
      }
      if (
        form.value.bib_armadio !== "" &&
        form.value.bib_armadio !== undefined
      ) {
        query["filter"]["bib_armadio"] = {
          bib_armadio: {
            _eq: form.value.bib_armadio,
          },
        };
      }
    }

    query["filter"]["status"] = { _eq: "attivo" };
    queryToPrint.value = query;
    try {
      const response = await directus
        .items('biblioteca')
        .readByQuery(query);
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
}
async function fetchRelations() {
  counter.value = 0;
  let autoreNames = "";
  let curatoreNames = "";
  let query = {
    limit: -1,
    filter: {},
  };
  const opereAutore = await directus
    .items("biblioteca_bib_autore")
    .readByQuery(query);
  const opereCuratore = await directus
    .items("biblioteca_bib_curatore")
    .readByQuery(query);
  const autoreData = await directus.items("bib_autore").readByQuery(query);
  const curatoreData = await directus.items("bib_curatore").readByQuery(query);
  // AUTORE
  items.value.forEach((item) => {
    autoreNames = "";
    curatoreNames = "";
    if (
      Array.isArray(item.bib_autore) &&
      (item.bib_autore.length > 0 || item.bib_autore !== null)
    ) {
      item.bib_autore.forEach((itemAutore) => {
        opereAutore.data.forEach((relationalItem) => {
          if (relationalItem.id == itemAutore) {
            autoreData.data.forEach((relationalAutore) => {
              if (relationalItem.bib_autore_id == relationalAutore.id) {
                autoreNames += `${relationalAutore.bib_autore} `;
              }
            });
          }
        });
      });
      try {
        items.value[counter.value].bib_autore = autoreNames;
      } catch (error) { }
    }
    if (
      Array.isArray(item.bib_curatore) &&
      (item.bib_curatore.length > 0 || item.bib_curatore !== null)
    ) {
      item.bib_curatore.forEach((itemCuratore) => {
        opereCuratore.data.forEach((relationalItem) => {
          if (relationalItem.id == itemCuratore) {
            curatoreData.data.forEach((relationalCuratore) => {
              if (relationalItem.bib_curatore_id == relationalCuratore.id) {
                curatoreNames += `${relationalCuratore.bib_curatore} `;
              }
            });
          }
        });
      });
      try {
        items.value[counter.value].bib_curatore = curatoreNames;
      } catch (error) { }
    }
    counter.value++;
  });

  document.querySelectorAll("table tr").forEach((tr) => {
    let lastTd = tr.querySelector("td:last-child");

    if (lastTd && lastTd.querySelector("span")) {
      console.log("arrived");

      tr.querySelectorAll("td").forEach((td) => {
        td.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
      });
    }
  });
}
async function fetchIcons() {
  const buttons = document.querySelectorAll('[id^="saveButton-"]');
  buttons.forEach((button) => {
    if (button.classList.contains("bi-heart-fill")) {
      button.classList.replace("bi-heart-fill", "bi-heart");
    }
  });

  // SAVE BUTTON
  if (me.value == undefined) {
    me.value = await directus.users.me.read();
  }
  let query2 = {
    limit: -1,
    filter: {
      user_created: {
        _eq: me.value.id,
      },
    },
  };
  const responseSaved = await directus.items("pref_b").readByQuery(query2);
  for (let x = 0; x < responseSaved.data.length; x++) {
    try {
      let iconSaved = document.getElementById(
        "saveButton-" + responseSaved.data[x].id_bib
      );

      iconSaved.className = "bi bi-heart-fill";
    } catch (error) { }
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
  piano.value = "all";
}

async function deleteItem(item) {
  await directus.items("biblioteca").updateOne(item.id, { status: "bozza" });

  fetchData();
}
function onEditClicked(item) {
  router.push({
    name: "editItemBib",
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

function onInfoClickedP(item) {
  currentItemT.value = [];
  showAlertP.value = true;
  currentItem.value = item;
  currentItemT.value.push(item);
  fields2.value = fields.value
    .filter((field) => field.key !== "actions" && field.key !== "prestito")
    .map((field) => ({ ...field, sortable: false }));

  const itemSettings2 = settings["bib_prestito"];
  const collectionFields = itemSettings2.fields();
  fieldsU.value = collectionFields;
  setTimeout(() => {
    const dateInput = document.getElementById("dateInput");

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);

    const formattedDate = currentDate.toISOString().split("T")[0];

    dateInput.value = formattedDate;
  }, 500);
}

async function checkCampsPrestito() {
  let error = false;
  if (fieldsU.value[0].__value == null) {
    alert("È necessario selezionare un utente.");
    error = true;
  }
  const dateInput = document.getElementById("dateInput");
  const inputDate = new Date(dateInput.value);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    // console.log("OK DATE");
  } else if (inputDate.toDateString() === today.toDateString()) {
    alert("La data inserita è una data passata.");
    error = true;
  } else {
    alert("La data inserita è una data passata.");
    error = true;
  }
  if (error == false) {
    await directus.items("prestiti").createOne({
      libro_id: currentItem.value.id,
      libro_inventario: currentItem.value.bib_inventario,
      libro_titolo: currentItem.value.bib_titolo,
      libro_autore: currentItem.value.bib_autore,
      libro_curatore: currentItem.value.bib_curatore,
      libro_anno: currentItem.value.bib_anno,
      libro_collocazione: currentItem.value.collocazione_2,
      libro_luogo: currentItem.value.bib_luogo2?.bib_luogo,
      libro_armadio: currentItem.value.bib_armadio?.bib_armadio,
      utente_nome: fieldsU.value[0].__value.bib_nome,
      utente_cognome: fieldsU.value[0].__value.bib_cognome,
      utente_ufficio: fieldsU.value[0].__value.bib_ufficio,
      utente_email: fieldsU.value[0].__value.bib_email,
      utente_telefono: fieldsU.value[0].__value.bib_telefono,
      fine_prestito: inputDate,
    });

    const formattedDate = `${inputDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${inputDate.getFullYear()}`;

    const response = await directus
      .items("biblioteca")
      .updateOne(currentItem.value.id, { fine_prestito: formattedDate });
    closeAlert();
    fetchData();
  } else {
  }
}
function stampaLista() {
  queryToPrint.value.fields = "*";
  queryToPrint.value.limit = 50;

  let queryString = JSON.stringify(queryToPrint.value);

  router.push({
    name: "printLibro",
    params: { query: queryString },
  });
}
function stampaLibroSingolo(item) {
  console.log(item);
  queryToPrint.value.fields = "id";
  queryToPrint.value.filter = {};
  queryToPrint.value.limit = 50;
  queryToPrint.value.filter.id = { _eq: item.id };
  console.log(queryToPrint.value);
  let queryString = JSON.stringify(queryToPrint.value);

  router.push({
    name: "printLibro",
    params: { query: queryString },
  });
}
async function onSaveClicked(item) {
  let iconSaved = document.getElementById("saveButton-" + item.id);
  if (iconSaved.classList.contains("bi-heart")) {
    iconSaved.className = "bi bi-heart-fill";
    await directus.items("pref_b").createOne({
      id_bib: item.id,
      invn: item.bib_inventario,
      titolo: item.bib_titolo,
      autore: item.bib_autore,
    });
  } else {
    iconSaved.className = "bi bi-heart";

    let query = {
      limit: -1,
      filter: {
        id_bib: {
          _eq: item.id,
        },
        user_created: {
          _eq: me.value.id,
        },
      },
    };

    iconSaved.className = "bi bi-heart";
    let response = await directus.items("pref_b").readByQuery(query);
    await directus.items("pref_b").deleteOne(response.data[0].id);
  }
}

function closeAlert() {
  showAlert.value = false;
  showAlertP.value = false;
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
function printScheda2() {
  router.push({
    name: "printItem2",
    params: { id: parseInt(currentItem.value.id) },
  });
}
async function createApp(itemSelected) {
  const Myitem = await directus.items("opera").readByQuery({
    filter: {
      id: { _eq: itemSelected.id },
    },
    limit: -1,
  });
  let item = Myitem.data[0];
  let iconPhone = document.getElementById("phoneButton-" + item.id);
  if (iconPhone.classList.contains("bi-phone")) {
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

    iconPhone.className = "bi bi-phone-fill";
    const MyItem = await directus.items("biblioteca").readByQuery({
      filter: {
        id: { _eq: item.id },
      },
      limit: -1,
    });
    // TAKE bib_autore INFO
    let autaValues = "";
    let autsID = [];
    let autsValues = "";

    try {
      const bib_autoreOpera = await directus
        .items("biblioteca_bib_autore")
        .readByQuery({
          filter: {
            id: { _in: MyItem.data[0].bib_autore },
          },
          limit: -1,
        });

      const bib_autoreIds = bib_autoreOpera.data.map(
        (item) => item.bib_autore_id
      );
      const bib_autores = await directus.items("bib_autore").readByQuery({
        filter: {
          id: { _in: bib_autoreIds },
        },
        limit: -1,
      });

      for (let index = 0; index < bib_autores.data.length; index++) {
        autaValues += bib_autores.data[index].auta + "";
        autsID.push(bib_autores.data[index].auts);
      }
      const autsbib_autore = await directus.items("auts").readByQuery({
        filter: {
          id: { _in: autsID },
        },
        limit: -1,
      });

      for (let index = 0; index < autsbib_autore.data.length; index++) {
        autsValues += autsbib_autore.data[index].auts + " ";
      }
    } catch (error) {
      autaValues = "";
      autsValues = "";
      item.bib_autore = "";
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
    const response2 = await directus.items("app").createOne({
      icona: item.icona,
      invn: item.invn,
      autn: itemSelected.bib_autore,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtt: itemSelected.ogtt,
      piano: item.piano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: item.sala,
      parete: item.parete,
      curatore: itemSelected.curatore,
      descrizione: item.descrizione_breve,
      specifiche: item.specifiche,
      id_foto: item.id,
    });
    const response = await directus
      .items("opera")
      .updateOne(item.id, { app: response2.id });
  }
}
async function createTouch(itemSelected) {
  const Myitem = await directus.items("opera").readByQuery({
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
    const MyItem = await directus.items("opera").readByQuery({
      filter: {
        id: { _eq: item.id },
      },
      limit: -1,
    });
    // TAKE bib_autore INFO
    let autaValues = "";
    let autsID = [];
    let autsValues = "";

    try {
      const bib_autoreOpera = await directus
        .items("opera_bib_autore")
        .readByQuery({
          filter: {
            id: { _in: MyItem.data[0].bib_autore },
          },
          limit: -1,
        });

      const bib_autoreIds = bib_autoreOpera.data.map(
        (item) => item.bib_autore_id
      );
      const bib_autores = await directus.items("bib_autore").readByQuery({
        filter: {
          id: { _in: bib_autoreIds },
        },
        limit: -1,
      });

      for (let index = 0; index < bib_autores.data.length; index++) {
        autaValues += bib_autores.data[index].auta + "";
        autsID.push(bib_autores.data[index].auts);
      }
      const autsbib_autore = await directus.items("auts").readByQuery({
        filter: {
          id: { _in: autsID },
        },
        limit: -1,
      });

      for (let index = 0; index < autsbib_autore.data.length; index++) {
        autsValues += autsbib_autore.data[index].auts + " ";
      }
    } catch (error) {
      autaValues = "";
      autsValues = "";
      item.bib_autore = "";
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
      autn: itemSelected.bib_autore,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtt: itemSelected.ogtt,
      piano: item.piano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: item.sala,
      parete: item.parete,
      curatore: itemSelected.curatore,
      descrizione: item.descrizione_breve,
      specifiche: item.specifiche,
      id_foto: item.id,
      mappa: {
        type: "Point",
        coordinates: [9.186859843491261, 45.46276475217099],
      },
    });
    const response = await directus
      .items("opera")
      .updateOne(item.id, { touch: response2.id });
  }
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchData("all");
  }
});
function filterTable() {
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
  filterTable();
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

#ExtralargeModal {
  background-color: rgba(255, 255, 255, 0.755);
  z-index: 10;
}

.modal-dialog {
  z-index: 9999;
  margin-top: 80px;
}
</style>
