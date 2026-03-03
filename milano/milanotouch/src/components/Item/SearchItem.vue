<template>
  <main id="main" class="main">
    <div class="col-12">



      <!-- Search Form -->
      <keep-alive>
        <searchForm />
      </keep-alive>


      <br />
      <button type="button" class="btn btn-outline-primary" @click="fetchData()">
        Cerca
      </button>
      &nbsp
      <button type="button" class="btn btn-outline-danger" @click="clearData()">
        Annulla
      </button>
      <hr />
      Mostra:
      <input type="number" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="50" id="limit"
        @input="infoQty()" />
      &nbsp
      {{ totalResult }} schede trovate

      <div class="form-check" style="float: right">
        <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDefault1"
          v-model="selectedOption" value="list" />
        <label class="form-check-label" for="flexRadioDefault1"> Lista </label>
      </div>
      <div class="form-check" style="float: right">
        <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDefault2"
          v-model="selectedOption" value="card" />
        <label class="form-check-label" for="flexRadioDefault2"> Carta </label>
      </div>

      <div class="card gradient-dark-grey" style="margin-top: 30px">
        <div class="card-header">
          <div class="">
            <header class="mb-2"></header>
          </div>
        </div>
        <div class="card-body" v-if="selectedOption === 'list'">
          <div class="table-responsive">
            <Table class="table v-middle m-0" :items="items" :fields="fields" id="table">
              <template #cell(actions)="{ item, field, value }">
                <div class="actions">
                  <button title="edit" class="btn btn-sm btn-light" @click="onEditClicked(item)">
                    <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                  </button>

                  <button title="save" class="btn btn-sm btn-light text-danger" @click="onSaveClicked(item)">
                    <i class="bi bi-heart" :id="'saveButton-' + item.id"></i>
                  </button>
                  <button title="delete" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)">
                    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                  </button>

                  <button title="Info" class="btn btn-sm btn-light" @click="onInfoClicked(item)">
                    <font-awesome-icon icon="fa-solid fa-eye" />
                  </button>
                </div>
              </template>
            </Table>
          </div>
        </div>

        <div class="card-body" v-if="selectedOption === 'card'">
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
                        <img :src="imageurl" alt="" style="
                            max-width: 250px;
                            max-height: 250px;
                            margin-top: 15px;
                          " :id="'photo-' + index" />
                      </div>
                      <div class="text-center">
                        <h5 style="margin-top: 20px">
                          {{ item.ogtd }}<br />
                          <i>{{ item.sgti }}</i>
                        </h5>
                        <div class="actions">
                          <button title="edit" class="btn btn-sm btn-light" @click="onEditClicked(item)">
                            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
                          </button>

                          <button title="delete" class="btn btn-sm btn-light text-danger" @click="onDeleteClicked(item)">
                            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
                          </button>
                          <button title="Info" class="btn btn-sm btn-light" @click="onInfoClicked(item)">
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

        <nav aria-label="...">
          <ul class="pagination" style="display: flex; flex-wrap: wrap; justify-content: center">
            <li class="page-item" @click="skipPage('first')" :id="'before'" v-if="totalPages > 0">
              <a class="page-link">First</a>
            </li>
            <li class="page-item" @click="skipPage('substract')" :id="''" v-if="totalPages > 0">
              <a class="page-link" v-if="currentPage - 1 !== 0">
                <span>{{ currentPage - 1 }}</span>
              </a>
            </li>
            <li class="page-item" @click="skipPage('current')" :id="'tablePage-'" v-if="totalPages > 0">
              <a class="page-link">{{ currentPage }}</a>
            </li>
            <li class="page-item" @click="skipPage('pass')" :id="'tablePage-'" v-if="totalPages > 0">
              <a class="page-link" v-if="currentPage + 1 !== totalPages + 1">
                {{ currentPage + 1 }}</a>
            </li>

            <li class="page-item" @click="skipPage('last')" :id="'tablePage-'" v-if="totalPages > 0">
              <a class="page-link">Last</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="modal fade show" id="ExtralargeModal" tabindex="-1" style="display: block" aria-modal="true" role="dialog"
      v-if="showAlert">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tipo de stampa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="closeAlert"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <!-- First print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa sanitaria</h5>
                    <img src="/sSanitaria.png" style="width: 100%" @click="printS(item)" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <!-- Second print type -->
                <div class="card cardSelector">
                  <div class="card-body">
                    <h5 class="card-title">Stampa prestito</h5>
                    <img src="/sPrestito.png" style="width: 100%" @click="printP(item)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loaded v-if="!loaded" />
    <h1 class="text-center" v-if="noResult">Nessun risultato</h1>
  </main>
</template>

<script>
import { ref, computed, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API/";
import * as settings from "../../settings/";
import Table from "../common/Table/Table.vue";
import Loaded from "../common/Loader.vue";
import searchForm from "./searchForm.vue"
export default {
  components: { Table, Loaded, searchForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const modal = inject("$modalManager");

    const collection = [];
    const items = ref(null);
    const fields = ref([]);
    var itemsFiltered = [];
    var totalResult = ref(0);
    var totalPages = ref();
    let currentPage = ref(2);
    let currentItem = ref();
    let selectedOption = ref("list");
    const url = ref();
    let imageurl = ref("/logoMilanoSmall.png");
    const me = ref();
    const showAlert = ref(false);
    const counter = ref(0);
    const loaded = ref(true);
    const image = ref();
    let noResult = ref(false)
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
      },
      { immediate: true, deep: true }
    );
    watch(selectedOption, () => {
      skipPage("first");
      //IMAGES
      if (selectedOption.value === "card" && itemsFiltered.data) {
      }
    });

    const createLink = computed(() => ({
      name: "createItem",
      params: { collection: collection.value },
    }));
    function infoQty() {
      try {
        let resultLimit = document.getElementById("limit").value;
        const { data = [] } = itemsFiltered;
        items.value = data.slice(0, resultLimit);

        totalResult.value = itemsFiltered.data.length;
        totalPages.value = Math.ceil(totalResult.value / resultLimit);
      } catch (error) { }
      skipPage("first");
    }

    // CHANGE PAGE
    function skipPage(page) {
      let resultLimit = document.getElementById("limit").value;
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
        (currentPage.value - 1) * resultLimit,
        currentPage.value * resultLimit
      );
      fetchIcons();
      fetchRelations();
    }

    async function fetchData() {
      let resultLimit = document.getElementById("limit").value;
      let resultID = document.getElementById("resultID").value;
      let resultAutore = document.getElementById("resultAutore").value;
      let resultSGTI = document.getElementById("resultSGTI").value;
      let resultSGTT = document.getElementById("resultSGTT").value;
      let resultOGTD = document.getElementById("resultOGTD").value;
      let resultInv = document.getElementById("resultInv").value;
      let resultMTC = document.getElementById("resultMTC").value;
      let sti_tipo = document.getElementById("sti_tipo").value;
      let resultACQN = document.getElementById("resultACQN").value;
      let resti = document.getElementById("resti").checked;

      counter.value = 0;
      loaded.value = false;
      let query = {
        limit: -1,
        filter: {},
      };
      try {
        if (resultID !== "") {
          query["filter"]["id"] = { _eq: resultID };
        }
        if (resultAutore !== "") {
          const privateData = await directus.items("autore").readByQuery({
            filter: {
              autn: {
                _contains: resultAutore,
              },
            },
            limit: -1,
          });
          if (privateData.data.length > 0) {
            const ids = privateData.data.map((item) => item.id);
            const opereAutore = await directus
              .items("opera_autore")
              .readByQuery({
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

        if (resultSGTI !== "") {
          query["filter"]["sgti"] = { _contains: resultSGTI };
        }
        if (resultSGTT !== "") {
          query["filter"]["sgtt"] = { _contains: resultSGTT };
        }
        if (resultOGTD !== "") {
          const privateData = await directus.items("ogtd").readByQuery({
            filter: {
              ogtd: {
                _contains: resultOGTD,
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
        if (resultInv !== "") {
          const privateData = await directus.items("inv").readByQuery({
            filter: {
              invn: { _eq: resultInv },
            },
            limit: -1,
          });
          const idInv = privateData.data.map(({ id }) => id);
          const opereInventario = await directus
            .items("opera_inv")
            .readByQuery({
              filter: {
                inv_id: { _in: idInv },
              },
              limit: -1,
            });
          const idInvOp = opereInventario.data.map(({ id }) => id);
          query["filter"]["inv"] = {
            _in: idInvOp,
          };
        }
        if (resultMTC !== "") {
          const privateData = await directus.items("mtc").readByQuery({
            filter: {
              mtc: { _contains: resultMTC },
            },
            limit: -1,
          });
          const idmtc = privateData.data.map(({ id }) => id);

          const opereMtcD = await directus.items("opera_mtc").readByQuery({
            limit: -1,
          });
          const opereMtc = await directus.items("opera_mtc").readByQuery({
            filter: {
              mtc_id: { _in: idmtc },
            },
            limit: -1,
          });

          const idOpereMTC = opereMtc.data.map(({ mtc_id }) => mtc_id);
          query["filter"]["mtc"] = {
            _in: idOpereMTC,
          };
        }

        if (resultACQN !== "") {
          query["filter"]["acqn"] = { _contains: resultACQN };

        }
        if (resti !== false) {
       
          query["filter"]["resti"] = { _eq: true };

        }
        if (sti_tipo !== "") {



          const privateData = await directus.items("sti_tipo").readByQuery({
            filter: {
              sti_tipo: { _eq: sti_tipo },
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


        const response = await directus
          .items(collection.value)
          .readByQuery(query);

        itemsFiltered = response;
        const { data = [] } = response;
        if (data.length < 1) {
          items.value = null;
        } else {
          loaded.value = true;

          items.value = data;
          noResult.value = false

        }
      } catch (error) {
        items.value = null;
      }
      // SAVED ITEMS
      if (items.value == null) {
        loaded.value = true;
        noResult.value = true

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
      const opereAutore = await directus
        .items("opera_autore")
        .readByQuery(query);
      const autoreData = await directus.items("autore").readByQuery(query);

      const ogtdData = await directus.items("ogtd").readByQuery(query);

      const opereInventario = await directus
        .items("opera_inventario")
        .readByQuery(query);
      const inventarioData = await directus
        .items("inventario")
        .readByQuery(query);

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
                    autoreNames += relationalAutore.autn + ". ";
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

      // INV
      counter.value = 0;
      items.value.forEach((item) => {
        inventarioNames = "";
        if (
          Array.isArray(item.inv) &&
          item.inv.length > 0 &&
          item.inv !== null
        ) {
          item.inv.forEach((itemInv) => {
            opereInventario.data.forEach((relationalItem) => {
              if (relationalItem.id == itemInv) {
                inventarioData.data.forEach((relationalInv) => {
                  if (relationalItem.inventario_id == relationalInv.id) {
                    inventarioNames += relationalInv.invn + ". ";
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

            let imageElement = document.getElementById(
              "photo-" + counter.value
            );
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
        } catch (error) { }
      }
    }
    function clearData() {
      document.getElementById("resultID").value = null;
      document.getElementById("resultAutore").value = null;
      document.getElementById("resultSGTI").value = null;
      document.getElementById("resultSGTT").value = null;
      document.getElementById("resultOGTD").value = null;
      document.getElementById("resultInv").value = null;
      document.getElementById("resultMTC").value = null;
      document.getElementById("sti_tipo").value = null;
      document.getElementById("resultACQN").value = null;
      document.getElementById("resti").checked = false

      totalResult.value = 0;
      totalPages.value = 0;
      url.value = window.location.origin;
      itemsFiltered = null;
      loaded.value = true;
      // CLEAR TABLE
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
    function printInfo() {
      router.push({
        name: "InfoItemArch",
        params: { id: currentItem.value.id, collection: "opera" },
      });
    }
    return {
      items,
      fields,
      createLink,
      totalResult,
      totalPages,
      currentPage,
      selectedOption,
      imageurl,
      showAlert,
      loaded,
      noResult,
      onEditClicked,
      onDeleteClicked,
      onInfoClicked,
      onSaveClicked,
      fetchData,
      infoQty,
      clearData,
      skipPage,
      closeAlert,
      printS,
      printP,
      printInfo,
    };
  },
};
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
</style>
