<template>
  <main id="main" class="main">
    <!-- FORM WITH SARCH INPUTS -->
    <div class="col-12">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-invn`"
            >Inventario (INVN):</label
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
          <label class="form-label" :for="`form-autore`">Autore (AUTN):</label>
          <input
            type="text"
            class="form-control"
            v-model="form.autore"
            :id="`form-autore`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-sgti`">Soggetto (SGTI):</label>
          <input
            type="text"
            class="form-control"
            v-model="form.sgti"
            :id="`form-sgti`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-sgtt`">Titolo (SGTT):</label>
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
          <label class="form-label" :for="`form-ogtd`">Oggetto (OGTD):</label>
          <select
            class="form-select"
            aria-label="Collezione"
            v-model="form.ogtd"
            :id="'form-ogtd'"
          >
            <option
              v-for="(col, index) in oggettoList"
              :key="index"
              :value="col"
            >
              {{ col }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-mtc`">Tecnica (MTC):</label>
          <input
            type="text"
            class="form-control"
            v-model="form.mtc"
            :id="`form-mtc`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-mtc`">Collezione</label>

          <select
            class="form-select"
            aria-label="Collezione"
            v-model="form.collezione"
            :id="'form-collezione'"
          >
            <option
              v-for="(col, index) in collezione"
              :key="index"
              :value="col"
            >
              {{ col }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <!-- <div class="col-md-6">
          <label class="form-label" :for="`form-sti_tipo`"
            >Stima Tipologia(STI_TIPO)</label
          >
          <select
            class="form-select"
            aria-label="Stima Tipologia"
            v-model="form.sti_tipo"
            :id="'form-sti_tipo'"
          >
            <option
              v-for="(tipo, index) in sti_tipo"
              :key="index"
              :value="tipo"
            >
              {{ tipo }}
            </option>
          </select>
        </div> -->
        <div class="col-md-6">
          <label class="form-label" :for="`form-rstn`"
            >Nome restauratore (RSTN):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.rstn"
            :id="`form-rstn`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-collocazione`"
            >Collocazione:</label
          >
          <select
            class="form-select"
            aria-label="Collocazione"
            v-model="form.collocazione"
            :id="'form-collocazione'"
          >
            <option
              v-for="(col, index) in collocazione"
              :key="index"
              :value="col"
            >
              {{ col }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-acqn`"
            >Acquisizione (ACQN):</label
          >
          <input
            type="text"
            class="form-control"
            v-model="form.acqn"
            :id="`form-acqn`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-prcd`"
            >Provenienza (PRCD):
          </label>
          <input
            type="text"
            class="form-control"
            v-model="form.prcd"
            :id="`form-prcd`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" :for="`form-dtsi`">DA (DTSI):</label>
          <input
            type="number"
            class="form-control"
            v-model="form.dtsi"
            :id="`form-dtsi`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label" :for="`form-dtsf`">A (DTSF): </label>
          <input
            type="number"
            class="form-control"
            v-model="form.dtsf"
            :id="`form-dtsf`"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>

      <div class="row">
        <div class="form-check form-switch col-md-4" style="margin-top: 50px">
          <label for="form-resti" class="resti"> Opera restituita </label>
          <input
            class="form-check-input"
            type="checkbox"
            v-model="form.resti"
            id="form-resti"
          />
        </div>
        <div class="col-md-4">
          <div class="form-check form-switch" style="margin-top: 50px">
            <label for="form-deposito" class="resti"> Opera in deposito </label>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.deposito"
              :id="`form-deposito`"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check form-switch" style="margin-top: 50px">
            <label for="form-esposta" class="resti">Opera esposta</label>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.esposta"
              :id="`form-esposta`"
            />
          </div>
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
        {{ totalResult }}/{{ schedeQTY.data.length }} schede. <br />
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
              <template #cell(actions)="{ item, field, value }">
                <div class="actions">
                  <button
                    title="edit"
                    class="btn btn-sm btn-light"
                    @click="onEditClicked(item)"
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
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                  </button>

                  <button
                    title="Info"
                    class="btn btn-sm btn-light"
                    @click="onInfoClicked(item)"
                  >
                    <font-awesome-icon icon="fa-solid fa-print" />
                  </button>
                  <button
                    v-if="item.resti"
                    title="restituita"
                    class="btn btn-sm btn-light"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-triangle-exclamation"
                      style="color: #fc9f1d"
                    />
                  </button>
                  <button
                    v-if="!item.resti"
                    title="APP"
                    class="btn btn-sm btn-light"
                    @click="createApp(item)"
                  >
                    <i class="bi bi-phone" :id="'phoneButton-' + item.id"></i>
                  </button>
                  <button
                    v-if="!item.resti"
                    title="TouchScreen"
                    class="btn btn-sm btn-light"
                    @click="createTouch(item)"
                  >
                    <i class="bi bi-map" :id="'touchButton-' + item.id"></i>
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
                        "
                      >
                        <img
                          :src="imageurl"
                          alt=""
                          style="
                            max-width: 250px;
                            max-height: 250px;
                            margin-top: 15px;
                          "
                          :id="'photo-' + index"
                        />
                      </div>
                      <div class="text-center">
                        <h5 style="margin-top: 20px">
                          {{ item.ogtd }}<br />
                          <i>{{ item.sgti }}</i>
                        </h5>
                        <div class="actions">
                          <button
                            title="edit"
                            class="btn btn-sm btn-light"
                            @click="onEditClicked(item)"
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
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-trash"
                              fixed-width
                            />
                          </button>
                          <button
                            title="Info"
                            class="btn btn-sm btn-light"
                            @click="onInfoClicked(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-print" />
                          </button>
                          <button
                            v-if="item.resti"
                            title="restituita"
                            class="btn btn-sm btn-light"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-triangle-exclamation"
                              style="color: #fc9f1d"
                            />
                          </button>
                          <button
                            v-if="!item.resti"
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
                            v-if="!item.resti"
                            title="TouchScreen"
                            class="btn btn-sm btn-light"
                            @click="createTouch(item)"
                          >
                            <i
                              class="bi bi-map"
                              :id="'touchButton-' + item.id"
                            ></i>
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
            <h5 class="modal-title">Tipo de stampa</h5>
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
              <div class="col-md-3">
                <!-- First print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa sanitaria</h5>
                    <img
                      src="/sSanitaria.png"
                      style="width: 92%"
                      @click="printS(item)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <!-- Second print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa scheda</h5>
                    <img
                      src="/sInfo.png"
                      style="width: 92%"
                      @click="printScheda(item)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <!-- Second print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa sintetica</h5>
                    <img
                      src="/sSintetica.png"
                      style="width: 100%"
                      @click="printScheda2(item)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <!-- Second print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa prestito</h5>
                    <img
                      src="/sPrestito.png"
                      style="width: 95%"
                      @click="printP(item)"
                    />
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
import { debounce } from "../../../utils";
import { useSearch } from "../../../store/search";
import { useStorage } from "../../../utils/useStorage";
import { ref, computed, watch, inject, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API/";
import * as settings from "../../settings/";
import Table from "../common/Table/Table.vue";
import Loaded from "../common/Loader.vue";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const modal = inject("$modalManager");

const searchStore = ref(useSearch("opera"));
const debounceQuery = debounce((value) => {}, 300);
const storageManager = useStorage("advanced-search-form");
const sti_tipo = ref([]);
const collezione = ref([]);
const collocazione = ref([]);
const oggettoList = ref([]);
const showInfo = ref(false);
const page2 = ref(1);
const limit2 = ref(10);
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
const url = ref();
let imageurl = ref("/logoMilanosmall.jpg");
const me = ref();
const showAlert = ref(false);
const counter = ref(0);
const loaded = ref(true);
const image = ref();
let noResult = ref(false);
let resultLimit = ref(50);
const randomKeyForm = ref(Math.random());
const schedeQTY = ref();
const props = defineProps({
  piano: { type: String, default: "" },
});
const { piano } = toRefs(props);
const makeEmptyForm = () => ({
  id: "",
  autore: "",
  sgti: "",
  invn: "",
  sgtt: "",
  dtsi: "",
  dtsf: "",
  ogtd: "",
  mtc: "",
  rstn: "",
  acqn: "",
  prcd: "",
  collezione: "",
  collocazione: "",
  sti_tipo: "",
  resti: false,
  deposito: false,
  esposta: false,
  // inMuseo: false,
});
const form = ref(storageManager.get() ?? makeEmptyForm());
// watch the route and update data based on the collection param
watch(
  route,
  () => {
    collection.value = "opera";
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
  if (selectedInterface.value === "card" && itemsFiltered.data) {
  }
});
onMounted(() => {
  if (piano.value !== "all") {
    fetchData();
  }
});

const createLink = computed(() => ({
  name: "createItem",
  params: { collection: collection.value },
}));
async function fetchRelationalItems() {
  const response = await directus
    .items("sti_tipo")
    .readByQuery({ limit: -1, sort: "sti_tipo" });
  sti_tipo.value = response.data.map((item) => item.sti_tipo);
  sti_tipo.value.push("");

  const response2 = await directus
    .items("collezione")
    .readByQuery({ limit: -1, sort: "collezione" });
  collezione.value = response2.data.map((item) => item.collezione);
  collezione.value.push("");
  const response3 = await directus
    .items("ogtd")
    .readByQuery({ limit: -1, sort: "ogtd" });
  oggettoList.value = response3.data.map((item) => item.ogtd);
  oggettoList.value.push("");
  const response4 = await directus
    .items("collocazioneInMuseo")
    .readByQuery({ limit: -1, sort: "collocazioneString" });
  collocazione.value = response4.data.map((item) => item.collocazioneString);
  collocazione.value.push("");

  // TOTAL RESULTS
  schedeQTY.value = await directus.items("opera").readByQuery({
    fields: ["COUNT(*)"],
    limit: -1,
  });
}
function infoQty(qty) {
  try {
    if (qty !== undefined) {
      resultLimit.value = qty;
    }
    const { data = [] } = itemsFiltered;
    items.value = data.slice(0, resultLimit.value);

    totalResult.value = itemsFiltered.data.length;
    totalPages.value = Math.ceil(totalResult.value / resultLimit.value);
  } catch (error) {}
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
  const { data = [] } = itemsFiltered;
  data.slice(1, 3);
  items.value = data.slice(
    (currentPage.value - 1) * resultLimit.value,
    currentPage.value * resultLimit.value
  );
  fetchIcons();
  fetchRelations();
}

async function fetchData(settings) {
  storageManager.set(form.value);

  counter.value = 0;
  loaded.value = false;
  let query = {
    limit: -1,
    filter: {},
    fields: "id,invn,autore,ogtd,sgti,ldcs,app,touch,icona,resti",
  };
  if (piano.value !== "all" && settings !== "all") {
    query["filter"]["piano"] = { _eq: piano.value };
  }
  try {
    if (form.value.id !== "") {
      query["filter"]["id"] = { _eq: form.value.id };
    }
    if (form.value.autore !== "") {
      const privateData = await directus.items("autore").readByQuery({
        filter: {
          autn: {
            _contains: form.value.autore,
          },
        },
        limit: -1,
      });
      if (privateData.data.length > 0) {
        const ids = privateData.data.map((item) => item.id);
        const opereAutore = await directus.items("opera_autore").readByQuery({
          filter: {
            autore_id: { _in: ids },
          },
          limit: -1,
        });
        const operaIds = opereAutore.data.map(({ id }) => id);
        query["filter"]["autore"] = { _in: operaIds };
      } else {
        query["filter"]["autore"] = { _in: null };
      }
    }

    if (form.value.sgti !== "") {
      query["filter"]["sgti"] = { _contains: form.value.sgti };
    }
    if (form.value.dtsi !== "" && form.value.dtsf !== "") {
      query["filter"]["cronologia"] = {
        _and: [
          {
            cronologia_id: {
              dtsi: { _gte: parseInt(form.value.dtsi) },
            },
          },
          {
            cronologia_id: {
              dtsf: { _lte: parseInt(form.value.dtsf) },
            },
          },
        ],
      };
    } else {
      if (form.value.dtsi !== "") {
        query["filter"]["cronologia"] = {
          cronologia_id: {
            dtsi: { _gte: parseInt(form.value.dtsi) },
          },
        };
      }
      if (form.value.dtsf !== "") {
        query["filter"]["cronologia"] = {
          cronologia_id: {
            dtsf: { _lte: parseInt(form.value.dtsf) },
          },
        };
      }
    }

    if (form.value.sgtt !== "") {
      query["filter"]["sgtt"] = { _contains: form.value.sgtt };
    }

    if (form.value.ogtd !== "") {
      const privateData = await directus.items("ogtd").readByQuery({
        filter: {
          ogtd: {
            _contains: form.value.ogtd,
          },
        },
        limit: -1,
      });
      if (privateData.data.length > 0) {
        const ogtdId = privateData.data.map(({ id }) => id);
        query["filter"]["ogtd"] = { _in: ogtdId };
      } else {
        query["filter"]["ogtd"] = { _in: null };
      }
    }
    // INVENTARIO
    if (form.value.invn !== "") {
      query["filter"]["invn"] = {
        _starts_with		: form.value.invn,
      };
    }
    if (form.value.mtc !== "") {
      const privateData = await directus.items("mtc").readByQuery({
        filter: {
          mtc: { _contains: form.value.mtc },
        },
        limit: -1,
      });
      const idmtc = privateData.data.map(({ id }) => id);

      const opereMtc = await directus.items("opera_mtc").readByQuery({
        filter: {
          mtc_id: { _in: idmtc },
        },
        limit: -1,
      });
      const idOpereMTC = opereMtc.data.map(({ id }) => id);
      query["filter"]["mtc"] = {
        _in: idOpereMTC,
      };
    }

    if (form.value.acqn !== "") {
      query["filter"]["acqn"] = { _contains: form.value.acqn };
    }
    if (form.value.resti !== false) {
      query["filter"]["resti"] = { _eq: true };
    }
    if (form.value.deposito !== false) {
      query["filter"]["deposito"] = { _eq: true };
    }
    if (form.value.esposta !== false) {
      query["filter"]["in_museo"] = { _eq: true };
    }
    if (form.value.esposta !== false && form.value.deposito !== false) {
      query["filter"]["deposito"] = { _eq: null };
    }
    // if (form.value.inMuseo !== false) {
    //   query["filter"]["in_museo"] = { _eq: true };
    // }
    if (form.value.sti_tipo !== "") {
      const privateData = await directus.items("sti_tipo").readByQuery({
        filter: {
          sti_tipo: { _eq: form.value.sti_tipo },
        },
        limit: -1,
      });
      const privateDataStima = await directus.items("stima").readByQuery({
        filter: {
          sti_tipo: { _eq: privateData.data[0].id },
        },
        limit: -1,
      });

      const idStima = privateDataStima.data.map(({ id }) => id);
      const stimaO = await directus.items("opera_stima").readByQuery({
        filter: {
          stima_id: { _in: idStima },
        },
        limit: -1,
      });
      const idFinalStima = stimaO.data.map(({ id }) => id);

      query["filter"]["stima"] = {
        _in: idFinalStima,
      };
    }
    if (form.value.rstn !== "") {
      const privateData = await directus.items("rstn").readByQuery({
        filter: {
          rstn: { _contains: form.value.rstn },
        },
        limit: -1,
      });
      const idrstn = privateData.data.map(({ id }) => id);
      const privateDataRestauro = await directus.items("restauro").readByQuery({
        filter: {
          rstn: { _in: idrstn },
        },
        limit: -1,
      });

      const idrestauro = privateDataRestauro.data.map(({ id }) => id);

      const opereRestauro = await directus
        .items("opera_restauro_1")
        .readByQuery({
          filter: {
            restauro_id: { _in: idrestauro },
          },
          limit: -1,
        });

      const idOpereRestauro = opereRestauro.data.map(({ id }) => id);
      query["filter"]["restauro"] = {
        _in: idOpereRestauro,
      };
    }
    if (form.value.prcd !== "") {
      const privateDataLoc = await directus
        .items("localizzazione")
        .readByQuery({
          filter: {
            prcd: { _in: form.value.prcd },
          },
          limit: -1,
        });

      const idlocalizzazione = privateDataLoc.data.map(({ id }) => id);

      const opereLoc = await directus
        .items("opera_localizzazione")
        .readByQuery({
          filter: {
            localizzazione_id: { _in: idlocalizzazione },
          },
          limit: -1,
        });

      const idOpereLoc = opereLoc.data.map(({ id }) => id);

      query["filter"]["localizzazione"] = { _in: idOpereLoc };
    }
    if (form.value.collezione !== "") {
      const response = await directus.items("collezione").readByQuery({
        filter: {
          collezione: { _eq: form.value.collezione },
        },
        limit: -1,
      });
      const idCollezione = response.data.map(({ id }) => id);
      query["filter"]["collezione"] = {
        _in: idCollezione,
      };
    }
    if (form.value.collocazione !== "") {
      const response = await directus.items("collocazioneInMuseo").readByQuery({
        filter: {
          collocazioneString: { _eq: form.value.collocazione },
        },
        limit: -1,
      });
      const Idcollocazione = response.data.map(({ id }) => id);
      query["filter"]["collocazioneInMuseo"] = {
        _in: Idcollocazione,
      };
    }
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
  const autsData = await directus.items("auts").readByQuery(query);

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
                let autsText = "";

                if (relationalAutore.auts !== null) {
                  const autsObject = autsData.data.find(
                    (object) => object.id === relationalAutore.auts
                  );

                  if (autsObject) {
                    autsText = ` (${autsObject.auts})`;
                  }
                }

                autoreNames += `${relationalAutore.autn}${autsText} `;
              }
            });
          }
        });
      });
      try {
        items.value[counter.value].autore = autoreNames;
      } catch (error) {}

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
    } catch (error) {}

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
  } catch (error) {}
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
  const responseSaved = await directus.items("pref").readByQuery(query2);

  for (let x = 0; x < responseSaved.data.length; x++) {
    try {
      let iconSaved = document.getElementById(
        "saveButton-" + responseSaved.data[x].id_opera
      );

      iconSaved.className = "bi bi-heart-fill";
    } catch (error) {}
  }
  // PHONE BUTTON
  for (let index = 0; index < items.value.length; index++) {
    if (items.value[index].app !== null) {
      try {
        let iconPhone = document.getElementById(
          "phoneButton-" + items.value[index].id
        );

        iconPhone.className = "bi bi-phone-fill";
      } catch (error) {}
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
      } catch (error) {}
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
}

async function deleteItem(item) {
  const { id } = item;
  await directus.items(collection.value).deleteOne(id);
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
    await directus.items("pref").createOne({
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
    let response = await directus.items("pref").readByQuery(query);
    await directus.items("pref").deleteOne(response.data[0].id);
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
function printScheda2() {
  router.push({
    name: "printItemS",
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
    // COLLOCAZIONE
    let appCollocazioneSala;
    let appCollocazionePiano;
    try {
      const collocazioneInMuseo = await directus
        .items("collocazioneInMuseo")
        .readByQuery({
          filter: {
            id: { _eq: item.collocazioneInMuseo },
          },
          limit: -1,
        });
      if (collocazioneInMuseo.data[0].sala !== null) {
        let appSalaID = collocazioneInMuseo.data[0].sala;
        const sala = await directus.items("sala").readByQuery({
          filter: {
            id: { _eq: appSalaID },
          },
          limit: -1,
        });
        appCollocazioneSala = sala.data[0].sala;
      }
      if (collocazioneInMuseo.data[0].piano !== null) {
        let appPianoID = collocazioneInMuseo.data[0].piano;
        const piano = await directus.items("piano").readByQuery({
          filter: {
            id: { _eq: appPianoID },
          },
          limit: -1,
        });
        appCollocazionePiano = piano.data[0].piano;
      }
    } catch (error) {
      appCollocazioneSala = "";
      appCollocazionePiano = "";
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
      autn: itemSelected.autore,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtd: itemSelected.ogtd,
      piano: appCollocazionePiano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: appCollocazioneSala,
      parete: item.parete,
      sgti: itemSelected.sgti,
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

    // COLLOCAZIONE
    let appCollocazioneSala;
    let appCollocazionePiano;
    try {
      const collocazioneInMuseo = await directus
        .items("collocazioneInMuseo")
        .readByQuery({
          filter: {
            id: { _eq: item.collocazioneInMuseo },
          },
          limit: -1,
        });
      if (collocazioneInMuseo.data[0].sala !== null) {
        let appSalaID = collocazioneInMuseo.data[0].sala;
        const sala = await directus.items("sala").readByQuery({
          filter: {
            id: { _eq: appSalaID },
          },
          limit: -1,
        });
        appCollocazioneSala = sala.data[0].sala;
      }
      if (collocazioneInMuseo.data[0].piano !== null) {
        let appPianoID = collocazioneInMuseo.data[0].piano;
        const piano = await directus.items("piano").readByQuery({
          filter: {
            id: { _eq: appPianoID },
          },
          limit: -1,
        });
        appCollocazionePiano = piano.data[0].piano;
      }
    } catch (error) {
      appCollocazioneSala = "";
      appCollocazionePiano = "";
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
      autn: itemSelected.autore,
      auta: autaValues,
      auts: autsValues,
      collezione: appCollection,
      ogtd: itemSelected.ogtd,
      piano: appCollocazionePiano,
      materia: mtcAPP,
      prcd: prcdFinal,
      prvc: prvcFinal,
      tcl: tclFinal,
      sala: appCollocazioneSala,
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
      .items("opera")
      .updateOne(item.id, { touch: response2.id });
  }
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
