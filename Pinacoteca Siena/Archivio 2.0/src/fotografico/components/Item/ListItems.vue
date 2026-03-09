<template>
  <main id="main" class="main">
    <header class="mb-2 d-flex">
      <!-- CREATE NEW ITEM -->

      <div class="ms-auto d-flex align-items-center gap-2">
        <template v-if="loading">
          <font-awesome-icon icon="fa-solid fa-spinner" spin fixed-width />
          <span>Loading...</span>
        </template>
      </div>
    </header>
    Schede totale: {{ maxLimit }}

    <!-- PRINT THE TABLE WIT HALL THE DATA -->
    <Table class="w-100 my-2" :items="items" :fields="fields" v-if="userRolePermissions">
      <!-- dynamically assign labels to each thead -->
      <template #cell(actions)="{ item, field, value }">
        <div class="actions">
          <button  v-if="userRolePermissions.fotografico.edit"
            title="edit"
            class="btn btn-sm btn-light"
            @click="onEditClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
          </button>
          <button  v-if="userRolePermissions.fotografico.delete"
            title="delete"
            class="btn btn-sm btn-light text-danger"
            @click="onDeleteClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelations(item)"
            v-if="collection == 'fotografo'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsA(item)"
            v-if="collection == 'oa_autore'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsO(item)"
            v-if="collection == 'oa_ogtd_f'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsC(item)"
            v-if="collection == 'oa_collocazione_f'"
          >
            <font-awesome-icon icon="folder-tree" />
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
        :options="[50, 100, 250, 500, maxLimit]"
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
const limit = ref(250);
const totalItems = computed(() => metadata.value?.filter_count);
const totalPages = computed(() =>
  Math.ceil(metadata.value?.filter_count / limit.value)
);
const props = defineProps({
  collection: { type: String, default: "" },
});
const route = useRoute();
const router = useRouter();
const maxLimit = ref();

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
const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);
// return to page 1 if not enough elements after limit changes
/* watchEffect(() => {
    if(totalPages.value>0 && page.value>totalPages.value) page.value = totalPages.value
}) */

// watch the route and update data based on the collection param
watch(
  route,
  async () => {
    limit.value=250
    collection.value = route.params?.collection;
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    if (page.value != 1) page.value = 1;
    else fetchData();
    getUserData();
  },
  { immediate: true, deep: true }
);

watch(
  page,
  async (_page) => {
    fetchData();
  },
  { immediate: true }
);
async function checkRelations(item) {
  let query = {
    limit: -1,
    filter: { fotografo: { fotografo_id: { _eq: item.id } } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchFot",
    params: { piano: queryString },
  });
}
async function checkRelationsA(item) {
  let query = {
    limit: -1,
    filter: { oa_autore: { oa_autore_id: { _eq: item.id } } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchFot",
    params: { piano: queryString },
  });
}

async function checkRelationsO(item) {
  let query = {
    limit: -1,
    filter: { oa_ogtd: { _eq: item.id } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchFot",
    params: { piano: queryString },
  });
}
async function checkRelationsC(item) {
  let query = {
    limit: -1,
    filter: { oa_collocazione: { _eq: item.id } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchFot",
    params: { piano: queryString },
  });
}

const createLink = computed(() => ({
  name: "createFot",
  params: { collection: collection.value },
}));
async function getUserData() {
  me.value = await directus.users.me.read();

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
  create.value = true;

  edit.value = true;

  cancel.value = true;
}

async function fetchData() {
  try {
    loading.value = true;

    const response = await store.collections.fetchAll(
      collection.value,
      page.value,
      limit.value
    );
    const { data = [], meta = { total_count: 0, filter_counf: 0 } } = response;
    if (collection.value == "Foto") {
      const filteredData = data.filter((item) => item.status === "attivo");
      items.value = filteredData;
      meta.filter_count = filteredData.length;
      meta.total_count = data.length;
    } else {
      items.value = data;
    }
    metadata.value = meta;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
  try {
    const response = await directus
      .items(collection.value)
      .readByQuery({ limit: -1, aggregate: { count: "*" } });
    maxLimit.value = response.data[0].count;
  } catch (error) {}
}

async function deleteItem(item) {
  if (collection.value == "Foto") {
    await directus.items("Foto").updateOne(item.id, { status: "bozza" });
  } else {
    const { id } = item;

    await store.collections.deleteOne(collection.value, id);
    if (items.value.length <= 1) {
      if (page.value > 1) page.value = page.value - 1; // go to previous page if no more elements
    }
  }
  fetchData();
}

async function onEditClicked(item) {
  router.push({
    name: "editItemFot",
    params: { id: item.id, collection: collection.value },
  });
}

async function onDeleteClicked(item) {
  if (collection.value == "app") {
    let query = {
      limit: 1,
      filter: {
        app: {
          _eq: item.id,
        },
      },
    };

    let response = await directus.items("opera").readByQuery(query);
    await directus.items("opera").updateOne(response.data[0].id, { app: null });
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

    let response = await directus.items("opera").readByQuery(query);
    await directus
      .items("opera")
      .updateOne(response.data[0].id, { touch: null });
    deleteItem(item);
  } else {
    const confirmed = await modal.confirm({
      title: "Confirm",
      body: "Sei sicuro di voler eliminare questo elemento?",
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
