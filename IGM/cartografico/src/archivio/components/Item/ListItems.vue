<template>
  <main id="main" class="main">
    <header class="mb-2 d-flex">
      <!-- CREATE NEW ITEM -->
      <!-- <router-link
        :to="createLink"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <button
          class="btn btn-sm btn-primary"
          @click="navigate"
          v-if="collection !== 'app' && (create == true || isAdmin)"
        >
          <font-awesome-icon icon="fa-solid fa-plus" fixed-width />
          <span class="ms-1">New</span>
        </button>
      </router-link> -->
      <div class="ms-auto d-flex align-items-center gap-2">
        <template v-if="loading">
          <font-awesome-icon icon="fa-solid fa-spinner" spin fixed-width />
          <span>Loading...</span>
        </template>
      </div>
    </header>
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
    <!-- PRINT THE TABLE WIT HALL THE DATA -->
    <Table class="w-100 my-2" :items="items" :fields="fields">
      <!-- dynamically assign labels to each thead -->
      <template #cell(actions)="{ item, field, value }">
        <div class="actions">
          <button
            title="edit"
            class="btn btn-sm btn-light"
            @click="onEditClicked(item)"
            v-if="edit == true || isAdmin"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
          </button>
          <!-- <button
            title="delete"
            class="btn btn-sm btn-light text-danger"
            @click="onDeleteClicked(item)"
            v-if="(cancel == true || isAdmin)  "
          >
            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
          </button> -->
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
            @click="checkRelationsSerie(item)"
            v-if="collection == 'serie'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsSottoSerie(item)"
            v-if="collection == 'sotto_serie'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsMTX(item)"
            v-if="collection == 'mtx'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>         <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsOGTD(item)"
            v-if="collection == 'ogtd'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
             <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsOGTT(item)"
            v-if="collection == 'ogtt_F'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationslrcr(item)"
            v-if="collection == 'lrcr_f'"
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
const limit = ref(50);
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

// return to page 1 if not enough elements after limit changes
/* watchEffect(() => {
    if(totalPages.value>0 && page.value>totalPages.value) page.value = totalPages.value
}) */

// watch the route and update data based on the collection param
watch(
  route,
  async () => {
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
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({ filter: { fotografo: { fotografo_id: { _eq: item.id } } },fields:'id' });

  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationsSerie(item) {
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { serie: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationsSottoSerie(item) {
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { sotto_serie: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationsMTX(item){
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { mtx: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationsOGTD(item){
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { ogtd: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationsOGTT(item){
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { ogtt: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
async function checkRelationslrcr(item){
  let FotoResponse = await directus
    .items("Foto")
    .readByQuery({
      filter: { lrcr: { _eq: item.id } },
      limit: 1000,
      fields: "id",
    });
  console.log(FotoResponse);
  let FotoIDs = FotoResponse.data.map((item) => item.id);

  router.push({
    name: "searchArc",
    params: { piano: FotoIDs.toString() },
  });
}
const createLink = computed(() => ({
  name: "createArc",
  params: { collection: collection.value },
}));
async function getUserData() {
  me.value = await directus.users.me.read();
  role.value = me.value.role;
  role.value = me.value.role;
  let rolResponse = await directus
    .items("directus_roles")
    .readByQuery({ filter: { id: { _eq: role.value } } });
  if (rolResponse.data[0].name === "Administrator"|| rolResponse.data[0].name === "Admin Cartografico" || rolResponse.data[0].name === "Cartografico" ) {
    isAdmin.value = true;
  }
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
  console.log(response);
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

async function fetchData() {
  try {
    loading.value = true;

    const response = await store.collections.fetchAll(
      collection.value,
      page.value,
      limit.value
    );
    const { data = [], meta = { total_count: 0, filter_counf: 0 } } = response;
    if (collection.value == "opera") {
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
}

async function deleteItem(item) {
  if (collection.value == "opera") {
    await directus.items("opera").updateOne(item.id, { status: "bozza" });
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
    name: "editItemArc",
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
