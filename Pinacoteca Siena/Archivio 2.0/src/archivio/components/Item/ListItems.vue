<template>
  <main id="main" class="main">
    <header class="mb-2 d-flex">

      <div class="ms-auto d-flex align-items-center gap-2">
        <template v-if="loading">
          <font-awesome-icon icon="fa-solid fa-spinner" spin fixed-width />
          <span>Loading...</span>
        </template>
      </div>
    </header>

    <Table
      class="w-100 my-2"
      :items="items"
      :fields="fields"
      v-if="userRolePermissions"
    >
      <!-- dynamically assigna labels to each thead -->
      <!-- <template v-for="(field, index) in fields" :key="index" #[`head(${field.key})`] >
            {{ field.label ? field.label : field.key }}
        </template> -->

      <template #cell(actions)="{ item, field, value }">
        <div class="actions">
          <button
            v-if="userRolePermissions.oa.edit"
            title="edit"
            class="btn btn-sm btn-light"
            @click="onEditClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
          </button>
          <button
            v-if="userRolePermissions.oa.delete"
            title="delete"
            class="btn btn-sm btn-light text-danger"
            @click="onDeleteClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" fixed-width />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsC(item)"
            v-if="collection == 'collocazione'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>

          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsCr(item)"
            v-if="collection == 'cronologia'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsA(item)"
            v-if="collection == 'autore'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>

          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsAm(item)"
            v-if="collection == 'ambito'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsCo(item)"
            v-if="collection == 'committenza'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsRe(item)"
            v-if="collection == 'restauro'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>

          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsI(item)"
            v-if="collection == 'iscrizione'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsS(item)"
            v-if="collection == 'stemmi'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsF(item)"
            v-if="collection == 'fta'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsM(item)"
            v-if="collection == 'mostra'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>

          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsFon(item)"
            v-if="collection == 'fonte'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsBib(item)"
            v-if="collection == 'bib'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
        </div>
      </template>
    </Table>

    <div class="d-flex gap-2">
      <b-pagination
        v-model="page"
        :perPage="limit"
        :totalItems="totalItems"
        size="sm"
      />
      <b-pagination-dropdown v-model="limit" :options="[5, 10, 25, 50, 100]" />
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
const limit = ref(25);
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
    collection.value = route.params?.collection;
    if (!collection.value) return;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.tableFields();
    fields.value = collectionFields;
    if (page.value != 1) page.value = 1;
    else fetchData();

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

const createLink = computed(() => ({
  name: "createOA",
  params: { collection: collection.value },
}));

async function fetchData() {
  try {
    loading.value = true;
    const response = await store.collections.fetchAll(
      collection.value,
      page.value,
      limit.value
    );
    const { data = [], meta = { total_count: 0, filter_counf: 0 } } = response;
    console.log(response);
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

async function checkRelationsC(item) {
  let query = {
    limit: -1,
    filter: { lc: { _eq: item.id } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}
async function checkRelationsCr(item) {
  let query = {
    limit: -1,
    filter: { cronologia: { cronologia_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsA(item) {
  let query = {
    limit: -1,
    filter: { autore: { autore_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsAm(item) {
  let query = {
    limit: -1,
    filter: { ambito: { ambito_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsCo(item) {
  let query = {
    limit: -1,
    filter: { committenza: { committenza_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsRe(item) {
  let query = {
    limit: -1,
    filter: { restauro: { restauro_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsI(item) {
  let query = {
    limit: -1,
    filter: { iscrizione: { iscrizione_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsS(item) {
  let query = {
    limit: -1,
    filter: { stemmi: { stemmi_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsF(item) {
  let query = {
    limit: -1,
    filter: { fotografia: { fta_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsM(item) {
  let query = {
    limit: -1,
    filter: { mostra: { mostra_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsFon(item) {
  let query = {
    limit: -1,
    filter: { fonte: { fonte_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function checkRelationsBib(item) {
  let query = {
    limit: -1,
    filter: { bib: { bib_id: { _eq: item.id } } },
    fields: "*.*",
  };
  const response = await directus.items("opera").readByQuery(query);
  if (response.data.length > 0) {
    let queryString = JSON.stringify(query);

    router.push({
      name: "searchOA",
      params: { queryP: queryString },
    });
  } else {
    alert("Nessun risultato");
  }
}

async function deleteItem(item) {
  if (collection.value == "opera") {
    await directus.items("opera").updateOne(item.id, { status: "bozza" });
  } else {
    const { id } = item;

    await store.collections.deleteOne(collection.value, id);
    if (items.value.length <= 1) {
      if (page.value > 1) page.value = page.value - 1;
    }
  }
  fetchData();
}

async function onEditClicked(item) {
  router.push({
    name: "editItemOA",
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
