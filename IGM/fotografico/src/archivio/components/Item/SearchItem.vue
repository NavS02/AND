<template>
  <main id="main" class="main" v-if="userRolePermissions">
    <!-- FORM WITH SARCH INPUTS -->
    <div class="col-12">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-invn`"
            >Numero scheda (INVN):</label
          >

          <input
            type="text"
            class="form-control"
            v-model="form.invn"
            :id="`form-invn`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-id`">ID:</label>
          <input
            type="number"
            class="form-control"
            v-model="form.id"
            :id="`form-id`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-fotografo`"
            >Fotografo (AUTN):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.fotografo"
            :id="`form-fotografo`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-immagine`">Immagine:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.immagine"
            :id="`form-immagine`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-sgtt`"
            >Soggetto/Titolo (SGTI/SGLT/SGLA/SGLL):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.sgtt"
            :id="`form-sgtt`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-dtsf`"
            >Cronologia (DTSF):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.dtsf"
            :id="`form-dtsf`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-ogtd`">Oggetto (OGTD):</label>
          <select
            class="form-select"
            aria-label="Oggetto"
            v-model="form.ogtd"
            :id="'form-ogtd'"
          >
            <option v-for="(tipo, index) in ogtd" :key="index" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-lrcr`"
            >Localizzazione (LRCS/LRCR/LRCC):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.lrcr"
            :id="`form-lrcr`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-ogcs`">Note foto (OGCS):</label>
          <input
            type="text"
            class="form-control"
            v-model="form.ogcs"
            :id="`form-ogcs`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-mtcm_F`"
            >Materia e tecnica (MTCM):</label
          >
          <select
            class="form-select"
            aria-label="Materia"
            v-model="form.mtcm_F"
            :id="'form-mtcm_F'"
          >
            <option v-for="(tipo, index) in mtcm_F" :key="index" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-serie`"
            >Titolo della serie (SFIT):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.serie"
            :id="`form-serie`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-sotto_serie`"
            >Titolo della sottoserie (SSIT):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.sotto_serie"
            :id="`form-sotto_serie`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <label class="form-label" :for="`form-generale`"
            >Ricerca generale</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.generale"
            :id="`form-generale`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>

      <br />
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="fetchData('all')"
      >
        Cerca
      </button>
      &nbsp;
      <button type="button" class="btn btn-outline-danger" @click="clearData()">
        Annulla
      </button>
      <hr />
      <!-- DROPDOWN WITH PAGINATION CONFIG -->
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Mostra: {{ resultLimit }}
        </button>
        <ul class="dropdown-menu">
          <li @click="infoQty(5)">5</li>
          <li @click="infoQty(10)">10</li>
          <li @click="infoQty(25)">25</li>
          <li @click="infoQty(50)">50</li>
          <li @click="infoQty(100)">100</li>
        </ul>
      </div>
      &nbsp;
      {{ totalResult }} schede trovate
      <i
        :class="{
          'bi bi-info-circle-fill': showInfo,
          'bi bi-info-circle': !showInfo,
        }"
        @click="showInfo = !showInfo"
      ></i>
      &nbsp;
      <div v-if="showInfo">
        <hr />
        {{ totalResult }}/{{ numberWithCommas(schedeQTY.data.length) }} schede.
        <br />
        Pagina {{ currentPage }}/{{ totalPages }} ({{ resultLimit }} schede per
        pagina).
      </div>

      <div class="form-check" style="float: right">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDisabled"
          id="flexRadioDefault1"
          v-model="selectedInterface"
          value="list"
        />
        <label class="form-check-label" for="flexRadioDefault1"> Lista </label>
      </div>

      <div class="form-check" style="float: right">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDisabled"
          id="flexRadioDefault2"
          v-model="selectedInterface"
          value="card"
        />

        <label class="form-check-label" for="flexRadioDefault2">
          Carta &nbsp;
        </label>
      </div>
      <br />
      <div style="float: right">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Filtra"
            id="advancedSearch"
            v-model="advancedSearchInput"
          />
          <div class="input-group-append">
            <button
              type="button"
              class="btn btn-outline-danger"
              v-if="advancedSearchInput !== ''"
              @click="clearAdvancedSearch()"
            >
              <i class="bi bi-x"></i>
            </button>
            <button
              type="button"
              @click="filterTable()"
              class="btn btn-light"
              :disabled="advancedSearchInput == ''"
            >
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
            <Table
              class="table v-middle m-0"
              :items="items"
              :fields="fields"
              id="table"
            >
              <template #cell(actions)="{ item }">
                <div class="actions">
                  <button
                    title="edit"
                    class="btn btn-sm btn-light"
                    @click="onEditClicked(item)"
                    v-if="userRolePermissions.fotografico.edit"
                  >
                    <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                  </button>

                  <button
                    title="save"
                    class="btn btn-sm btn-light text-danger"
                    @click="onSaveClicked(item)"
                  >
                    <i class="bi bi-heart" :id="'saveButton-' + item.id"></i>
                  </button>
                  <button
                    title="delete"
                    class="btn btn-sm btn-light text-danger"
                    @click="onDeleteClicked(item)"
                    v-if="userRolePermissions.fotografico.delete"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                  </button>

                  <button
                    title="Info"
                    class="btn btn-sm btn-light"
                    @click="onInfoClicked(item)"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                  </button>
                  <!-- <button
                    title="APP"
                    class="btn btn-sm btn-light"
                    @click="createApp(item)"
                  >
                    <i class="bi bi-phone" :id="'phoneButton-' + item.id"></i>
                  </button>
                  <button
                    title="TouchScreen"
                    class="btn btn-sm btn-light"
                    @click="createTouch(item)"
                  >
                    <i class="bi bi-map" :id="'touchButton-' + item.id"></i>
                  </button> -->
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
                <div
                  v-for="(item, index) in items"
                  :key="index"
                  class="mb-3 col-md-3"
                  style="margin-bottom: 20px"
                >
                  <div class="card" style="height: 100%; margin: -5px">
                    <div class="card-body">
                      <h4 class="text-center">id {{ item.id }}</h4>

                      <button
                        title="save"
                        class="btn btn-sm btn-light text-danger text-center"
                        style="position: absolute; top: 10px; right: 10px"
                        @click="onSaveClicked(item)"
                      >
                        <i
                          class="bi bi-heart"
                          :id="'saveButton-' + item.id"
                        ></i>
                      </button>
                      <div
                        class="text-center"
                        style="
                          border: 1px solid #999999;
                          width: 300px;
                          height: 300px;
                          margin: 0 auto;
                          margin-top: 15px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                      >
                        <img
                          :src="
                            imageurlBase +
                            '/fotografico/images/preview/0001/' +
                            item.image
                          "
                          alt=""
                          style="max-width: 250px; max-height: 250px"
                          :id="'photo-' + index"
                        />
                      </div>
                      <div class="text-center">
                        <h5 style="margin-top: 20px">
                          {{ item.image }}<br />
                          {{ item.invn }}<br />
                          <i>{{ item.sglt }}</i>
                        </h5>
                        <div class="actions">
                          <button
                            title="edit"
                            class="btn btn-sm btn-light"
                            @click="onEditClicked(item)"
                            v-if="userRolePermissions.fotografico.edit"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-pencil"
                              fixed-width
                            />
                          </button>

                          <button
                            title="delete"
                            class="btn btn-sm btn-light text-danger"
                            @click="onDeleteClicked(item)"
                            v-if="userRolePermissions.fotografico.delete"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-trash"
                              fixed-width
                            />
                          </button>
                          <button
                            title="Info"
                            class="btn btn-sm btn-light"
                            @click="onInfoClicked(item) || isAdmin"
                          >
                            <font-awesome-icon icon="fa-solid fa-eye" />
                          </button>
                          <!-- <button
                            title="APP"
                            class="btn btn-sm btn-light"
                            @click="createApp(item)"
                          >
                            <i
                              class="bi bi-phone"
                              :id="'phoneButton-' + item.id"
                            ></i>
                          </button>
                          <button
                            title="TouchScreen"
                            class="btn btn-sm btn-light"
                            @click="createTouch(item)"
                          >
                            <i
                              class="bi bi-map"
                              :id="'touchButton-' + item.id"
                            ></i>
                          </button> -->
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
          <ul
            class="pagination"
            style="display: flex; flex-wrap: wrap; justify-content: center"
          >
            <li
              class="page-item"
              @click="skipPage('first')"
              :id="'before'"
              v-if="totalPages > 0"
            >
              <a class="page-link">First</a>
            </li>
            <li
              class="page-item"
              @click="skipPage('substract')"
              :id="''"
              v-if="totalPages > 0 && currentPage - 1 !== 0"
            >
              <a class="page-link">
                <span>{{ currentPage - 1 }}</span>
              </a>
            </li>
            <li
              class="page-item"
              @click="skipPage('current')"
              :id="'tablePage-'"
              v-if="totalPages > 0"
            >
              <a
                class="page-link"
                style="background-color: #0a58ca; color: white"
                >{{ currentPage }}</a
              >
            </li>
            <li
              class="page-item"
              @click="skipPage('pass')"
              :id="'tablePage-'"
              v-if="totalPages > 0 && currentPage + 1 !== totalPages + 1"
            >
              <a class="page-link"> {{ currentPage + 1 }}</a>
            </li>

            <li
              class="page-item"
              @click="skipPage('last')"
              :id="'tablePage-'"
              v-if="totalPages > 0"
            >
              <a class="page-link">Last</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- PRINT OPTIONS -->
    <div
      class="modal fade show"
      id="ExtralargeModal"
      tabindex="-1"
      style="display: block"
      aria-modal="true"
      role="dialog"
      v-if="showAlert"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modello di stampa</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeAlert"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!--

              <div class="col-md-4">
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa sanitaria</h5>
                    <img
                      src=""
                      style="width: 100%"
                      @click="printS(item)"
                    />
                  </div>
                </div>
              </div>
               -->
              <div class="col-md-4">
                <div class="card cardSelector" @click="printSchedaU(item)">
                  <div class="card-body">
                    <h4 class="card-title">Stampa utente</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card cardSelector" @click="printScheda2(item)">
                  <div class="card-body">
                    <h4 class="card-title">Stampa scheda</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-4" style="">
                <div class="card cardSelector" @click="printScheda(item)">
                  <div class="card-body">
                    <h4 class="card-title">Stampa screenshot</h4>
                  </div>
                </div>
              </div>
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

const storageManager = useStorage("advanced-search-form");
const mtcm_F = ref([]);
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
let imageurlBase = ref(generateURL());
const me = ref();
const showAlert = ref(false);
const counter = ref(0);
const loaded = ref(true);
let noResult = ref(false);
const ogtd = ref([]);
let resultLimit = ref(50);
const schedeQTY = ref();
const itemsBeforeAdvancedSearch = ref();
const props = defineProps({
  piano: { type: String, default: "" },
});

const { piano } = toRefs(props);
const makeEmptyForm = () => ({
  id: "",
  fotografo: "",
  immagine: "",
  invn: "",
  sgtt: "",
  ogtd: "",
  dtsf: "",
  mtcm_F: "",
  ogtd: "",
  lrcr: "",
  ogcs: "",
  generale: "",
  sotto_serie: "",
  serie: "",
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

const currentQueryCache = ref();
const currentPageCache = ref();
// watch the route and update data based on the collection param
watch(
  route,
  () => {
    getUserData();
    collection.value = "Foto";
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    console.log(fields.value);
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

  currentQueryCache.value = JSON.parse(sessionStorage.getItem("mySearchF"));
  currentPageCache.value = sessionStorage.getItem("currentPageF");
  if (currentQueryCache.value !== null) {
    fetchOldQuery();
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

function infoQtyCache(qty) {
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
  } catch (error) {}

  skipPageCache("first");
}

// CHANGE PAGE
function skipPageCache(page) {
  page = "pass";
  currentPage.value = currentPageCache.value - 1;
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
async function fetchOldQuery() {
  loaded.value = false;
  try {
    const response = await directus
      .items(collection.value)
      .readByQuery(currentQueryCache.value);

    if (response.data && Array.isArray(response.data)) {
      response.data.forEach((item) => {
        const scalaCartografica = item.scala_cartografica_numero;

        if (
          typeof scalaCartografica === "string" &&
          scalaCartografica.trim() !== ""
        ) {
          const numbers = scalaCartografica.replace(/\D/g, "");
          item.scala_sort = parseInt(numbers, 10) || null;
        } else {
          item.scala_sort = null;
        }
      });
    }

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
  infoQtyCache();
}

function generateURL() {
  let url = import.meta.env.VITE_API_BASE_URL;
  let urlWithoutPort = url.replace(/:\d+/, "");
  return urlWithoutPort;
}
async function getUserData() {
  me.value = await directus.users.me.read();
  role.value = me.value.role;
  let response = await directus.items("directus_permissions").readByQuery({
    filter: {
      role: {
        _eq: role.value,
      },
      action: {
        _neq: "read",
      },
      collection: {
        _eq: collection.value,
      },
    },
    limit: -1,
  });
  response.data.forEach((element) => {
    switch (element.action) {
      case "create":
        create.value = true;
        break;
      case "update":
        edit.value = true;
        break;
      case "delete":
        cancel.value = true;
        break;
    }
  });
}
const createLink = computed(() => ({
  name: "createItem",
  params: { collection: collection.value },
}));
async function fetchRelationalItems() {
  me.value = await directus.users.me.read();

  console.log(me.value);
  role.value = me.value.role;
  let rolResponse = await directus
    .items("directus_roles")
    .readByQuery({ filter: { id: { _eq: role.value } } });
  console.log(rolResponse.data[0].name);
  if (
    rolResponse.data[0].name === "Administrator" ||
    rolResponse.data[0].name === "Admin Fotografico"
  ) {
    isAdmin.value = true;
  }
  const response = await directus
    .items("mtcm_F")
    .readByQuery({ limit: -1, sort: "mtcm_F" });
  mtcm_F.value = response.data.map((item) => item.mtcm_F);
  mtcm_F.value.push("");

  const response2 = await directus
    .items("ogtd")
    .readByQuery({ limit: -1, sort: "ogtd" });
  ogtd.value = response2.data.map((item) => item.ogtd);
  ogtd.value.push("");

  // TOTAL RESULTS
  schedeQTY.value = await directus.items("Foto").readByQuery({
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
      totalResult.value = numberWithCommas(data.length);
    } else {
      totalResult.value = numberWithCommas(itemsFiltered.data.length);
    }
    totalPages.value = Math.ceil(totalResult.value / resultLimit.value);
  } catch (error) {}
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
  sessionStorage.setItem("currentPageF", currentPage.value);

  fetchIcons();
  fetchRelations();
}

async function fetchData(settings) {
  try {
  } catch (error) {}
  storageManager.set(form.value);

  counter.value = 0;
  loaded.value = false;
  let query = {
    limit: -1,
    filter: {},
    fields: "id,invn,sglt,sgla,sgll,dtsi,dtsf,image",
  };
  if (piano.value !== "all") {
    const myTimeout = setTimeout(console.log("prefilter"), 4000);
    query["filter"]["id"] = { _in: piano.value.split(",") };
    piano.value = "all";
  }
  try {
    if (form.value.generale !== "") {
      query["search"] = form.value.generale;
      // query["filter"]["_or"] = [{
      //   serie: {
      //     sfit: {
      //       _contains: form.value.generale,
      //     },
      //   },
      // },
      // {
      //   sotto_serie: {
      //     ssit: {
      //       _contains: form.value.generale,
      //     },
      //   },
      // }
      // ];
    }
    if (form.value.id !== "") {
      query["filter"]["id"] = { _eq: form.value.id };
    }
    if (form.value.serie !== "") {
      query["filter"]["serie"] = {
        sfit: {
          _contains: form.value.serie,
        },
      };
    }
    if (form.value.sotto_serie !== "") {
      query["filter"]["sotto_serie"] = {
        ssit: {
          _contains: form.value.sotto_serie,
        },
      };
    }
    if (form.value.fotografo !== "") {
      query["filter"]["fotografo"] = {
        fotografo_id: {
          autn: {
            _contains: form.value.fotografo,
          },
        },
      };
    }

    if (form.value.immagine !== "") {
      query["filter"]["image"] = {
        _contains: form.value.immagine,
      };
    }

    if (form.value.sgtt !== "") {
      query["filter"]["_or"] = [
        {
          sgti: { _contains: form.value.sgtt },
        },
        {
          sglt: { _contains: form.value.sgtt },
        },
        {
          sgla: { _contains: form.value.sgtt },
        },
        {
          sgll: { _contains: form.value.sgtt },
        },
      ];
    }

    if (form.value.dtsf !== "") {
      query["filter"]["dtsf"] = { _contains: form.value.dtsf };
    }
    // INVENTARIO
    if (form.value.invn !== "") {
      query["filter"]["invn"] = {
        _contains: form.value.invn,
      };
    }
    if (form.value.ogcs !== "") {
      query["filter"]["ogcs"] = {
        _contains: form.value.ogcs,
      };
    }
    // if (form.value.inMuseo !== false) {
    //   query["filter"]["in_museo"] = { _eq: true };
    // }
    if (form.value.ogtd !== "") {
      query["filter"]["ogtd"] = {
        ogtd: {
          _eq: form.value.ogtd,
        },
      };
    }
    if (form.value.lrcr !== "") {
      query["filter"]["_or"] = [
        {
          lrcr: {
            lrcr: {
              _contains: form.value.lrcr,
            },
          },
        },
        {
          lrcc: {
            lrcc: {
              _contains: form.value.lrcr,
            },
          },
        },
        {
          lrcs: {
            lrcs: {
              _contains: form.value.lrcr,
            },
          },
        },
      ];
    }
    if (form.value.mtcm_F !== "") {
      query["filter"]["mtcm"] = {
        mtcm_F: {
          _eq: form.value.mtcm_F,
        },
      };
    }

    query["filter"]["status"] = { _eq: "attivo" };
    sessionStorage.setItem("mySearchF", JSON.stringify(query));

    const response = await directus.items(collection.value).readByQuery(query);
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
  // counter.value = 0;
  // let fotografoNames = "";
  // let ogtdNames = "";
  // let inventarioNames = "";
  // let query = {
  //   limit: -1,
  //   filter: {},
  // };
  // const fotografoData = await directus.items("fotografo").readByQuery(query);
  // // const ogtdData = await directus.items("ogtd").readByQuery(query);
  // // // const opereInventario = await directus
  // // //   .items("opera_inventario")
  // // //   .readByQuery(query);
  // // const inventarioData = await directus.items("inventario").readByQuery(query);
  // // fotografo
  // items.value.forEach((item) => {
  //   fotografoNames = "";
  //   if (
  //     Array.isArray(item.fotografo) &&
  //     (item.fotografo.length > 0 || item.fotografo !== null)
  //   ) {
  //     item.fotografo.forEach((itemfotografo) => {
  //       operefotografo.data.forEach((relationalItem) => {
  //         if (relationalItem.id == itemfotografo) {
  //           fotografoData.data.forEach((relationalfotografo) => {
  //             if (relationalItem.fotografo_id == relationalfotografo.id) {
  //               fotografoNames += relationalfotografo.autn + " ";
  //             }
  //           });
  //         }
  //       });
  //     });
  //     try {
  //       items.value[counter.value].fotografo = fotografoNames;
  //     } catch (error) {}
  //     counter.value++;
  //   }
  // });
  // // OGTD
  // counter.value = 0;
  // items.value.forEach((item) => {
  //   ogtdNames = "";
  //   if (item.ogtd !== null && item.ogtd !== "") {
  //     ogtdData.data.forEach((ogtdItem) => {
  //       if (ogtdItem.id == item.ogtd) {
  //         items.value[counter.value].ogtd = ogtdItem.ogtd;
  //       }
  //     });
  //   }
  //   counter.value++;
  // });
  // // INV
  // counter.value = 0;
  // items.value.forEach((item) => {
  //   inventarioNames = "";
  //   if (Array.isArray(item.inv) && item.inv.length > 0 && item.inv !== null) {
  //     item.inv.forEach((itemInv) => {
  //       opereInventario.data.forEach((relationalItem) => {
  //         if (relationalItem.id == itemInv) {
  //           inventarioData.data.forEach((relationalInv) => {
  //             if (relationalItem.inventario_id == relationalInv.id) {
  //               inventarioNames += relationalInv.invn + " ";
  //             }
  //           });
  //         }
  //       });
  //     });
  //   }
  //   try {
  //     // items.value[counter.value].inv = inventarioNames;
  //   } catch (error) {}
  //   counter.value++;
  // });
  // try {
  //   for (let index = 0; index < items.value.length; index++) {
  //     document.getElementById("photo-" + index).src = imageurl.value;
  //   }
  //   url.value = import.meta.env.VITE_API_BASE_URL;
  //   const imagesDirectory = await directus
  //     .items("directus_files")
  //     .readByQuery({ limit: -1 });
  //   counter.value = 0;
  //   items.value.forEach((item) => {
  //     if (item.icona !== null) {
  //       imagesDirectory.data.forEach((imageItem) => {
  //         if (item.icona == imageItem.id) {
  //           image.value = imageItem.id;
  //         }
  //       });
  //       let imageElement = document.getElementById("photo-" + counter.value);
  //       const imageUrl = url.value + "/assets/" + image.value; // generates url
  //       fetch(imageUrl)
  //         .then((response) => response.blob())
  //         .then((blob) => {
  //           // CODE64 IMAGE
  //           const reader = new FileReader();
  //           reader.readAsDataURL(blob);
  //           reader.onloadend = () => {
  //             const base64data = reader.result; //code64 the url
  //             imageElement.src = base64data;
  //           };
  //         });
  //     }
  //     counter.value++;
  //   });
  // } catch (error) {}
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
  const responseSaved = await directus.items("pref_f").readByQuery(query2);

  for (let x = 0; x < responseSaved.data.length; x++) {
    try {
      let iconSaved = document.getElementById(
        "saveButton-" + responseSaved.data[x].id_opera
      );

      iconSaved.className = "bi bi-heart-fill";
    } catch (error) {}
  }

  try {
    const imageCells = document.querySelectorAll(".tcell-image");

    imageCells.forEach((cell) => {
      let imageName = cell.textContent.trim();

      cell.innerHTML =
        '<div class="text-center"><img src="' +
        imageurlBase.value +
        "/fotografico/images/preview/0001/" +
        imageName +
        '" alt="Immagine non trovata" title="' +
        imageName +
        '" style="max-width:120px;max-height:75px"/></div>';
    });
  } catch (error) {
    console.log(error);
  }
}

function clearData() {
  storageManager.remove();
  sessionStorage.removeItem("mySearch");
  sessionStorage.removeItem("currentPage");
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
  await directus.items("Foto").updateOne(item.id, { status: "bozza" });

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
    await directus.items("pref_f").createOne({
      id_opera: item.id,
      invn: item.invn,
      image: item.image,
      sglt: item.sglt,
      dtsi: item.dtsi,
      dtsf: item.dtsf,
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
    let response = await directus.items("pref_f").readByQuery(query);
    await directus.items("pref_f").deleteOne(response.data[0].id);
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
    name: "",
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
function printSchedaU() {
  router.push({
    name: "printItemU",
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
    const MyItem = await directus.items("opera").readByQuery({
      filter: {
        id: { _eq: item.id },
      },
      limit: -1,
    });
    // TAKE fotografo INFO
    let autaValues = "";
    let autsID = [];
    let autsValues = "";

    try {
      const fotografoOpera = await directus
        .items("opera_fotografo")
        .readByQuery({
          filter: {
            id: { _in: MyItem.data[0].fotografo },
          },
          limit: -1,
        });

      const fotografoIds = fotografoOpera.data.map((item) => item.fotografo_id);
      const fotografos = await directus.items("fotografo").readByQuery({
        filter: {
          id: { _in: fotografoIds },
        },
        limit: -1,
      });

      for (let index = 0; index < fotografos.data.length; index++) {
        autaValues += fotografos.data[index].auta + "";
        autsID.push(fotografos.data[index].auts);
      }
      const autsfotografo = await directus.items("auts").readByQuery({
        filter: {
          id: { _in: autsID },
        },
        limit: -1,
      });

      for (let index = 0; index < autsfotografo.data.length; index++) {
        autsValues += autsfotografo.data[index].auts + " ";
      }
    } catch (error) {
      autaValues = "";
      autsValues = "";
      item.fotografo = "";
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
    } catch (error) {}
    const response2 = await directus.items("app").createOne({
      icona: item.icona,
      invn: item.invn,
      autn: itemSelected.fotografo,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtd: itemSelected.ogtd,
      piano: item.piano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: item.sala,
      parete: item.parete,
      immagine: itemSelected.immagine,
      descrizione: item.descrizione_breve,
      specifiche: item.specifiche,
      id_opera: item.id,
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
    // TAKE fotografo INFO
    let autaValues = "";
    let autsID = [];
    let autsValues = "";

    try {
      const fotografoOpera = await directus
        .items("opera_fotografo")
        .readByQuery({
          filter: {
            id: { _in: MyItem.data[0].fotografo },
          },
          limit: -1,
        });

      const fotografoIds = fotografoOpera.data.map((item) => item.fotografo_id);
      const fotografos = await directus.items("fotografo").readByQuery({
        filter: {
          id: { _in: fotografoIds },
        },
        limit: -1,
      });

      for (let index = 0; index < fotografos.data.length; index++) {
        autaValues += fotografos.data[index].auta + "";
        autsID.push(fotografos.data[index].auts);
      }
      const autsfotografo = await directus.items("auts").readByQuery({
        filter: {
          id: { _in: autsID },
        },
        limit: -1,
      });

      for (let index = 0; index < autsfotografo.data.length; index++) {
        autsValues += autsfotografo.data[index].auts + " ";
      }
    } catch (error) {
      autaValues = "";
      autsValues = "";
      item.fotografo = "";
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
    } catch (error) {}
    const response2 = await directus.items("touch").createOne({
      icona: item.icona,
      invn: item.invn,
      autn: itemSelected.fotografo,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtd: itemSelected.ogtd,
      piano: item.piano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: item.sala,
      parete: item.parete,
      immagine: itemSelected.immagine,
      descrizione: item.descrizione_breve,
      specifiche: item.specifiche,
      id_opera: item.id,
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
</style>
