<template>
  <main id="main" class="main">
    <header class="mb-2 d-flex">
      <!-- CREATE NEW ITEM -->
      <router-link
        :to="createLink"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <button
          class="btn btn-sm btn-primary"
          @click="navigate"
          v-if="collection2 == 'app'"
        >
          <font-awesome-icon icon="fa-solid fa-plus" fixed-width />
          <span class="ms-1">New </span>
        </button>
      </router-link>
      <div class="ms-auto d-flex align-items-center gap-2">
        <template v-if="loading">
          <font-awesome-icon icon="fa-solid fa-spinner" spin fixed-width />
          <span>Loading...</span>
        </template>
      </div>
    </header>

    <!-- PRINT THE TABLE WIT HALL THE DATA -->
    <Table class="w-100 my-2" :items="items" :fields="fields">
      <!-- dynamically assign labels to each thead -->
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
            title="delete"
            class="btn btn-sm btn-light text-danger"
            @click="onDeleteClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
          </button>
        </div>
      </template>
    </Table>
    <!-- PAGINATION -->
    <div class="d-flex gap-2">
      <b-pagination
        v-model="page"
        :perPage="limit"
        :totalItems="totalItems"
        size="sm"
      />
      <b-pagination-dropdown
        v-model="limit"
        :options="[5, 10, 25, 50, 100]"
        @click="fetchData()"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, inject, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as settings from "../../settings/";
import Table from "../common/Table/Table.vue";
import store from "../../../store";
import { directus } from "../../API";

const loading = ref(false);

// pagination
const page = ref(1);
const limit = ref(100);
const totalItems = computed(() => metadata.value?.filter_count);
const totalPages = computed(() =>
  Math.ceil(metadata.value?.filter_count / limit.value)
);
const props = defineProps({
  collection: { type: String, default: "" },
});
const route = useRoute();
const router = useRouter();
// infer the collection from the route
const collection = ref("");
const items = ref([]);
const metadata = ref({ total_count: 0, filter_count: 0 });
const fields = ref([]);

const toaster = inject("$toaster");
const modal = inject("$modalManager");
const me = ref();
const role = ref();
const create = ref(false);
const edit = ref(false);
const cancel = ref(false);
const isAdmin = ref(false);
const sale = ref(null);
const ubicazione = ref(null);
const collection2 = ref();

// return to page 1 if not enough elements after limit changes
/* watchEffect(() => {
    if(totalPages.value>0 && page.value>totalPages.value) page.value = totalPages.value
}) */

// watch the route and update data based on the collection param
watch(
  route,
  async () => {
    collection.value = route.params?.collection;
    collection2.value = collection.value;
    if (!collection.value) return;

    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    if (page.value != 1) page.value = 1;
    else fetchData();
  },
  { immediate: true, deep: true }
);

watch(
  page,
  async (_page) => {
    if (collection.value == "inv_collocazione") {
      try {
        [sale.value, ubicazione.value] = await Promise.all([
          getSala(),
          getUbicazione(),
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  },
  { immediate: true }
);

async function getSala() {
  let response = await directus.items("inv_sala").readByQuery({
    limit: -1,
    fields: "id,inv_sala",
  });
  return response.data;
}
async function getUbicazione() {
  let response = await directus.items("inv_ubicazione").readByQuery({
    limit: -1,
  });
  return response.data;
}
const createLink = computed(() => ({
  name: "createArc",
  params: { collection: collection.value },
}));

async function fetchData() {
  try {
    loading.value = true;

    const response = await store.collections.fetchAll(
      collection2.value,
      page.value,
      limit.value
    );
    const { data = [], meta = { total_count: 0, filter_counf: 0 } } = response;
    if (collection.value == "inventario") {
      const filteredData = data.filter((item) => item.status === "attivo");
      items.value = filteredData;
      meta.filter_count = filteredData.length;
      meta.total_count = data.length;
    } else if (collection.value == "inv_collocazione") {
      data.forEach((element) => {
        sale.value.forEach((sala) => {
          if (element.inv_sala == sala.id) {
            element.inv_sala = sala.inv_sala;
          }
        });
        ubicazione.value.forEach((ubi) => {
          if (element.inv_ubicazione == ubi.id) {
            element.inv_ubicazione = ubi.inv_ubicazione;
          }
        });
      });
      items.value = data;
    } else if ((collection.value = "app")) {
      console.log(data);
      data.forEach((item) => {
        item.tipo_visita = Array.isArray(item.tipo_visita)
          ? item.tipo_visita.join(", ")
          : "";
      });

      items.value = data;
    } else {
      items.value = data;
    }

    metadata.value = meta;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function deleteItem(item) {
  if (collection.value == "inventario") {
    await directus.items("inventario").updateOne(item.id, { status: "bozza" });
  } else {
    const { id } = item;

    await store.collections.deleteOne(collection2.value, id);
    if (items.value.length <= 1) {
      if (page.value > 1) page.value = page.value - 1; // go to previous page if no more elements
    }
  }
  fetchData();
}

async function onEditClicked(item) {
  router.push({
    name: "editItemArc",
    params: { id: item.id, collection: collection2.value },
  });
}

async function onDeleteClicked(item) {
  if (collection2.value == "app") {
    let query = {
      limit: 1,
      filter: {
        app: {
          _eq: item.id,
        },
      },
    };

    let response = await directus.items("inventario").readByQuery(query);
    await directus
      .items("inventario")
      .updateOne(response.data[0].id, { app: null });
    deleteItem(item);
  } else if (collection.value == "touch") {
    let query = {
      limit: 1,
      filter: {
        touch: {
          _eq: item.id,
        },
      },
    };

    let response = await directus.items("inventario").readByQuery(query);
    await directus
      .items("inventario")
      .updateOne(response.data[0].id, { touch: null });
    deleteItem(item);
  } else if (collection2.value == "web") {
    let query = {
      limit: 1,
      filter: {
        web: {
          _eq: item.id,
        },
      },
    };

    let response = await directus.items("inventario").readByQuery(query);
    await directus
      .items("inventario")
      .updateOne(response.data[0].id, { web: null });
    deleteItem(item);
  } else {
    const confirmed = await modal.confirm({
      title: "Confirm",
      body: "Are you sure you want to delete this item?",
    });
    if (confirmed) deleteItem(item);
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}
</style>
