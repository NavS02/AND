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
          <button  v-if="userRolePermissions.biblioteca.edit"
            title="edit"
            class="btn btn-sm btn-light"
            @click="onEditClicked(item)"
          >
            <font-awesome-icon icon="fa-solid fa-pencil" fixed-width />
          </button>
          <button  v-if="userRolePermissions.biblioteca.delete"
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
            v-if="collection == 'bib_autore'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsC(item)"
            v-if="collection == 'bib_curatore'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsA(item)"
            v-if="collection == 'bib_armadio'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsE(item)"
            v-if="collection == 'bib_editore'"
          >
            <font-awesome-icon icon="folder-tree" />
          </button>
          <button
            title="relationship"
            class="btn btn-sm btn-light text-warning"
            @click="checkRelationsL(item)"
            v-if="collection == 'bib_luogo'"
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
// infer the collection from the route
const collection = ref("");
const items = ref([]);
const metadata = ref({ total_count: 0, filter_count: 0 });
const fields = ref([]);
const maxLimit = ref();
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
    limit.value = 250;
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
    filter: { bib_autore: { bib_autore_id: { _eq: item.id } } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchBib",
    params: { piano: queryString },
  });
}

async function checkRelationsC(item) {
  let query = {
    limit: -1,
    filter: { bib_curatore: { bib_curatore_id: { _eq: item.id } } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchBib",
    params: { piano: queryString },
  });
}
async function checkRelationsA(item) {
  let query = {
    limit: -1,
    filter: { bib_armadio: { _eq: item.id } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchBib",
    params: { piano: queryString },
  });
}

async function checkRelationsE(item) {
  let query = {
    limit: -1,
    filter: { bib_editore2: { _eq: item.id } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchBib",
    params: { piano: queryString },
  });
}

async function checkRelationsL(item) {
  let query = {
    limit: -1,
    filter: { bib_luogo2: { _eq: item.id } },
    fields: "*",
  };
  let queryString = JSON.stringify(query);

  router.push({
    name: "searchBib",
    params: { piano: queryString },
  });
}

const createLink = computed(() => ({
  name: "createFot",
  params: { collection: collection.value },
}));
async function getUserData() {
  // me.value = await directus.users.me.read();
  // role.value = me.value.role;
  // role.value = me.value.role;
  // let rolResponse = await directus
  //   .items("directus_roles")
  //   .readByQuery({ filter: { id: { _eq: role.value } } });
  // if (rolResponse.data[0].name === "Administrator") {
  //   isAdmin.value = true;
  // }
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
  // console.log(response);
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
    if (collection.value == "prestiti") {
      items.value = data;

      items.value.forEach((item) => {
        if (item.fine_prestito) {
          const dateObject = new Date(item.fine_prestito);
          item.fine_prestito = `${dateObject
            .getDate()
            .toString()
            .padStart(2, "0")}/${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${dateObject.getFullYear()}`;
        }
      });
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
  if (collection.value == "biblioteca") {
    await directus.items("biblioteca").updateOne(item.id, { status: "bozza" });
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
    name: "editItemBib",
    params: { id: item.id, collection: collection.value },
  });
}

async function onDeleteClicked(item) {
  if (collection.value == "prestiti") {
    let query = {
      limit: 1,
      filter: {
        id: {
          _eq: item.libro_id,
        },
      },
    };

    await directus
      .items("biblioteca")
      .updateOne(item.libro_id, { fine_prestito: null });
  }
  const confirmed = await modal.confirm({
    title: "Confirm",
    body: "Sei sicuro di voler eliminare questa scheda?",
  });
  if (confirmed) deleteItem(item);
}
</script>

<style scoped>
.actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}
</style>
