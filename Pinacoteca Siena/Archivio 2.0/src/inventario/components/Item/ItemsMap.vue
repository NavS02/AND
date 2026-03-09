<template>
  <main id="main" class="main">
    <div class="accordion" id="accordionExample">
      <div
        class="accordion-item"
        v-for="(ubicazione, index) in ubicazioni"
        :key="index"
      >
        <h2 class="accordion-header" :id="'heading' + index">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-' + index"
            aria-expanded="false"
            :aria-controls="'collapse-' + index"
            @click="fecthSale(ubicazione)"
          >
            {{ ubicazione }}
          </button>
        </h2>
        <div
          :id="'collapse-' + index"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading' + index"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="accordion" :id="'subAccordion-' + index">
              <div v-for="(sala, subIndex) in sale" :key="'sub-' + subIndex">
                <div class="accordion-item" v-if="sala !==null">
                  <h2 class="accordion-header" :id="'subHeading' + subIndex">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#subCollapse-' + subIndex"
                      aria-expanded="false"
                      :aria-controls="'subCollapse-' + subIndex"
                      @click="fetchOpere(sala, ubicazione)"
                    >
                      {{ sala }}
                    </button>
                  </h2>
                  <div
                    :id="'subCollapse-' + subIndex"
                    class="accordion-collapse collapse"
                    :aria-labelledby="'subHeading' + subIndex"
                    :data-bs-parent="'#subAccordion-' + index"
                  >
                    <div class="accordion-body">
                      <div class="table-responsive">
                        <Table
                          class="table v-middle m-0"
                          :items="opere"
                          :fields="fields"
                          id="table"
                        >
                          <template #cell(actions)="{ item }">
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
                                <i class="bi bi-printer"></i>
                              </button>
                            </div>
                          </template>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { directus } from "../../API";
import Table from "../common/Table/Table.vue";
import { useRoute, useRouter } from "vue-router";
import * as settings from "../../settings/";

const route = useRoute();
const router = useRouter();
const ubicazioniIds = ref();
const ubicazioni = ref();
const sale = ref();
const opere = ref();
const fields = ref();
const collection = ref();
const noSala = ref(false);

onMounted(() => {
  collection.value = "inventario";
  if (!collection.value) return;
  // retrieve the settings
  const itemSettings = settings[collection.value];
  // define the subset of fields you need to view in the table
  const collectionFields = itemSettings.tableFields();
  fields.value = collectionFields;
  fetchData();
});
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
  router.push({
    name: "printItem",
    params: { id: item.id, collection: "inventario" },
  });
}
async function fetchOpere(sala, ubicazione) {
  const ubicazioneN = await directus.items("inv_ubicazione").readByQuery({
    filter: {
      inv_ubicazione: { _eq: ubicazione },
    },
    limit: 1,
  });
  let ubiID = ubicazioneN.data[0].id;
  try {
    const salaN = await directus.items("inv_sala").readByQuery({
      filter: {
        inv_sala: { _eq: sala },
      },
      limit: 1,
    });
    let salaID = salaN.data[0].id;
    const response = await directus.items("inv_collocazione").readByQuery({
      filter: { inv_ubicazione: { _eq: ubiID }, inv_sala: { _eq: salaID } },
      limit: 1,
    });
    let collocazioneID = response.data[0].id;
    const response2 = await directus.items("inventario").readByQuery({
      filter: { inv_collocazione: { _eq: collocazioneID } },
      limit: -1,
    });
    opere.value = response2.data;
  } catch (error) {
    const response = await directus.items("inv_collocazione").readByQuery({
      filter: { inv_ubicazione: { _eq: ubiID } },
      limit: 1,
    });
    let collocazioneID = response.data[0].id;
    const response2 = await directus.items("inventario").readByQuery({
      filter: { inv_collocazione: { _eq: collocazioneID } },
      limit: -1,
    });
    opere.value = response2.data;
  }
}
async function fecthSale(ubicazione) {
  const ubicazioneN = await directus.items("inv_ubicazione").readByQuery({
    filter: {
      inv_ubicazione: { _eq: ubicazione },
    },
    limit: 1,
  });
  let ubiID = ubicazioneN.data[0].id;
  const collocazioneList = await directus
    .items("inv_collocazione")
    .readByQuery({
      filter: {
        inv_ubicazione: { _in: ubiID },
      },
      limit: -1,
    });
  const salaSet = new Set(collocazioneList.data.map((item) => item.inv_sala));
  const salaArray = [...salaSet];

  const salaList = await directus.items("inv_sala").readByQuery({
    filter: {
      id: { _in: salaArray },
    },
    limit: -1,
  });
  sale.value = salaList.data.map((item) => item.inv_sala);
}
async function fetchData() {
  const response = await directus
    .items("inv_collocazione")
    .readByQuery({ limit: -1 });

  const ubicazioniSet = new Set(
    response.data.map((item) => item.inv_ubicazione)
  );

  const ubicazioniArray = [...ubicazioniSet];

  ubicazioniIds.value = ubicazioniArray;
  const ubicazioneN = await directus.items("inv_ubicazione").readByQuery({
    filter: {
      id: { _in: ubicazioniIds.value },
    },
    limit: -1,
  });
  ubicazioni.value = ubicazioneN.data.map((item) => item.inv_ubicazione);
}
</script>
<style scoped></style>
