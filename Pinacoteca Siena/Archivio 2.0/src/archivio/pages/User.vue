<template>
  <main id="main" class="main" v-if="userRolePermissions">
    <div class="pagetitle">
      <h1>Profile</h1>
    </div>
    <!-- End Page Title -->

    <section class="section profile">
      <div class="row">
        <div class="col-xl-4">
          <div class="card">
            <div
              class="card-body profile-card pt-4 d-flex flex-column align-items-center"
            >
              <img :src="imageurl" alt="Profile" class="rounded-circle" />
              <h2>{{ me?.first_name }} {{ me?.last_name }}</h2>
              <h3>{{ me?.email }}</h3>
              <button
                type="button"
                class="btn btn-danger"
                @click.prevent="confirmLogout"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-overview"
                    aria-selected="true"
                    role="tab"
                  >
                    Anteprima
                  </button>
                </li>

                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                    aria-selected="false"
                    role="tab"
                    tabindex="-1"
                  >
                    Modifica il Profilo
                  </button>
                </li>

                <!-- <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-settings"
                    aria-selected="false"
                    role="tab"
                    tabindex="-1"
                    disabled
                  >
                    Settings
                  </button>
                </li>

                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-change-password"
                    aria-selected="false"
                    role="tab"
                    tabindex="-1"
                    disabled
                  >
                    Change Password
                  </button>
                </li> -->

                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-favorite-items"
                    aria-selected="false"
                    role="tab"
                    tabindex="-1"
                    @click="fetchData()"
                  >
                    Schede preferite
                  </button>
                </li>
                <li
                  class="nav-item"
                  role="presentation"
                  v-if="userRolePermissions.oa.delete"
                >
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-deleted-items"
                    aria-selected="false"
                    role="tab"
                    tabindex="-1"
                    @click="fetchDeletedItems()"
                  >
                    Bozza
                  </button>
                </li>
              </ul>
              <div class="tab-content pt-2">
                <div
                  class="tab-pane fade profile-overview active show"
                  id="profile-overview"
                  role="tabpanel"
                >
                  <h5 class="card-title">Profilo</h5>

                  <div class="container">
                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Nome</div>
                      <div class="col-lg-9 col-md-9">
                        {{ me?.first_name }} {{ me?.last_name }}
                      </div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Compagnia</div>
                      <div class="col-lg-9 col-md-9">
                        Musei Nazionali di Siena
                      </div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Ruolo</div>
                      <div class="col-lg-9 col-md-9">{{ me?.role }}</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Nazione</div>
                      <div class="col-lg-9 col-md-9">{{ me?.location }}</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Lingua</div>
                      <div class="col-lg-9 col-md-9">IT</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Email</div>
                      <div class="col-lg-9 col-md-9">{{ me?.email }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade profile-edit pt-3"
                  id="profile-edit"
                  role="tabpanel"
                >
                  <!-- Profile Edit Form -->
                  <form action="">
                    <!-- <div class="row mb-3">
                      <label
                        for="profileImage"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Profile Image</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <div class="d-flex align-items-center">
                          <div class="flex-grow-1">
                            <Upload />
                          </div>
                        </div>
                      </div>
                    </div> -->

                    <div class="row mb-3">
                      <label for="Name" class="col-md-4 col-lg-3 col-form-label"
                        >Nome</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="Name"
                          type="text"
                          class="form-control"
                          id="Name"
                          :value="me?.first_name"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="Surname"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Cognome</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="Surname"
                          type="text"
                          class="form-control"
                          id="Surname"
                          :value="me?.last_name"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="description"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Descrizione</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="description"
                          type="text"
                          class="form-control"
                          id="description"
                          :value="me?.description"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Job" class="col-md-4 col-lg-3 col-form-label"
                        >Ruolo</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="job"
                          type="text"
                          class="form-control"
                          id="Job"
                          :value="me?.role"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="Country"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Nazione</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="country"
                          type="text"
                          class="form-control"
                          id="Country"
                          :value="me?.location"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="Email"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Email</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="email"
                          type="email"
                          class="form-control"
                          id="Email"
                          :value="me?.email"
                        />
                      </div>
                    </div>

                    <div class="text-center">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        @click="onChangeUserData()"
                      >
                        Salva
                      </button>
                    </div>
                  </form>
                  <!-- End Profile Edit Form -->
                </div>

                <div
                  class="tab-pane fade pt-3"
                  id="profile-settings"
                  role="tabpanel"
                >
                  <!-- Settings Form -->
                  <form>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Email Notifications</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="changesMade"
                            checked=""
                          />
                          <label class="form-check-label" for="changesMade">
                            Changes made to your account
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="newProducts"
                            checked=""
                          />
                          <label class="form-check-label" for="newProducts">
                            Information on new products and services
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="proOffers"
                          />
                          <label class="form-check-label" for="proOffers">
                            Marketing and promo offers
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="securityNotify"
                            checked=""
                            disabled=""
                          />
                          <label class="form-check-label" for="securityNotify">
                            Security alerts
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                  <!-- End settings Form -->
                </div>

                <div
                  class="tab-pane fade pt-3"
                  id="profile-change-password"
                  role="tabpanel"
                >
                  <!-- Change Password Form -->
                  <form>
                    <div class="row mb-3">
                      <label
                        for="current-password"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Current Password</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="password"
                          type="password"
                          class="form-control"
                          id="current-password"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="new-password"
                        class="col-md-4 col-lg-3 col-form-label"
                        >New Password</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="new-password"
                          type="password"
                          class="form-control"
                          id="new-password"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="renewPassword"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Re-enter New Password</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="renewpassword"
                          type="password"
                          class="form-control"
                          id="renewPassword"
                        />
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">
                        Change Password
                      </button>
                    </div>
                  </form>
                  <!-- End Change Password Form -->
                </div>
                <!-- Favorite Items Form -->

                <div
                  class="tab-pane fade pt-3"
                  id="profile-favorite-items"
                  role="tabpanel"
                >
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
                            title="unsave"
                            class="btn btn-sm btn-light text-danger"
                            @click="onSaveClicked(item)"
                          >
                            <i class="bi bi-heart-fill"></i>
                          </button>
                          <button
                            title="edit"
                            class="btn btn-sm btn-light"
                            @click="onEditClicked(item)"
                            v-if="userRolePermissions.oa.edit"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-pencil"
                              fixed-width
                            />
                          </button>
                          <button
                            title="Info"
                            class="btn btn-sm btn-light"
                            @click="onInfoClicked(item)"
                          >
                            <font-awesome-icon icon="fa-solid fa-eye" />
                          </button>
                        </div>
                      </template>
                    </Table>
                  </div>
                </div>
                <div
                  class="tab-pane fade pt-3"
                  id="profile-deleted-items"
                  role="tabpanel"
                >
                  <div class="table-responsive">
                    <Table
                      class="table v-middle m-0"
                      :items="deletedItems"
                      :fields="fieldsOpera"
                      id="table"
                    >
                      <template #cell(actions)="{ item }">
                        <div class="actions">
                          <button
                            title="recover"
                            class="btn btn-sm btn-light text-success"
                            @click="recoverOpera(item)"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-trash-arrow-up"
                              fixed-width
                            />
                          </button>
                          <button
                            title="delete"
                            class="btn btn-sm btn-light text-danger"
                            @click="deleteOpera(item)"
                          >
                            <font-awesome-icon
                              icon="fa-solid fa-trash"
                              fixed-width
                            />
                          </button>
                        </div>
                      </template>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <div class="col-md-6">
                      <!-- First print type -->
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
                    <div class="col-md-6">
                      <!-- Second print type -->
                      <div class="card cardSelector">
                        <div class="card-body">
                          <h5 class="card-title">Stampa prestito</h5>
                          <img
                            src=""
                            style="width: 100%"
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
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="d-flex justify-content-end" style="bottom">
        <span class="align-self-end">User ID: {{ me?.id }}</span>
      </div>
    </footer>
  </main>
</template>
<script>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import store from "../../store";
import * as settings from "../settings/";
import { directus } from "../API/";
import Table from "../components/common/Table/Table.vue";
import Upload from "../components/common/Upload/Upload.vue";
export default {
  components: { Table, Upload },

  setup(props, context) {
    const accessToken = store?.tokenInfo?.access_token;
    const authenticated = computed(() => store.authenticated);
    const user = computed(() => store.user);
    const route = useRoute();
    const router = useRouter();
    const userRol = ref();
    let imageurl = ref("/not-found.svg");
    let collection = ref();
    let fields = ref();
    let items = ref();
    const me = ref();
    const showAlert = ref(false);
    let currentItem = ref();
    const deletedItems = ref();
    const fieldsOpera = ref();
    const permissions = ref(null);
    const userStore = store.user;
    const userRolePermissions = ref(null);

    // watch the route and update data based on the collection param
    watch(
      route,
      () => {
        collection.value = "pref";
        if (!collection.value) return;
        // // retrieve the settings
        const itemSettings = settings[collection.value];
        // // define the subset of fields you need to view in the table
        const collectionFields = itemSettings.tableFields();
        fields.value = collectionFields;
        const itemSettings2 = settings["opera"];
        // // define the subset of fields you need to view in the table
        const collectionFields2 = itemSettings2.tableFields();
        fieldsOpera.value = collectionFields2;
        fetchData();
      },
      { immediate: true, deep: true }
    );

    async function fetchData() {
      me.value = await directus.users.me.read();
      const myRol = await directus.items("directus_roles").readByQuery({
        filter: {
          id: {
            _eq: me.value.role,
          },
        },
      });
      me.value.role = myRol.data[0].name;
      const response = await directus.items(collection.value).readByQuery({
        filter: {
          user_created: {
            _eq: me.value.id,
          },
        },
      });
      const { data = [] } = response;

      items.value = data;

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
    function updateImage() {
      let img = document.getElementById("profilePictureSelector").value;
      imageurl.value = img;
    }
    function toggleClass() {
      this.isToggled = !this.isToggled;
      document.body.classList.toggle("toggle-sidebar", this.isToggled);
    }

    function confirmLogout() {
      const confirmed = confirm("È sicuro di voler effettuare il logout?");
      if (confirmed) router.push({ name: "logout" });
    }
    async function onSaveClicked(item) {
      await directus.items(collection.value).deleteOne(item.id);
      fetchData();
    }
    function onEditClicked(item) {
      router.push({
        name: "editItemOA",
        params: { id: item.id_opera, collection: "opera" },
      });
    }
    async function onChangeUserData() {
      let name = document.getElementById("Name").value;
      let surname = document.getElementById("Surname").value;
      let description = document.getElementById("description").value;
      let country = document.getElementById("Country").value;
      let email = document.getElementById("Email").value;

      await directus.users.me.update({
        first_name: name,
        last_name: surname,
        description: description,
        location: country,
        email: email,
      });
    }
    function onInfoClicked(item) {
      currentItem.value = item.id_opera;
      showAlert.value = true;
    }
    function closeAlert() {
      showAlert.value = false;
    }
    function printS() {
      router.push({
        name: "modelSanOA",
        params: { id: currentItem.value },
      });
    }
    function printP() {
      router.push({
        name: "modelPresOA",
        params: { id: currentItem.value },
      });
    }
    async function fetchDeletedItems() {
      const response = await directus.items("opera").readByQuery({
        filter: {
          status: {
            _eq: "bozza",
          },
        },
      });
      const { data = [] } = response;
      deletedItems.value = data;
      // fetchRelations();
    }
    async function recoverOpera(item) {
      await directus.items("opera").updateOne(item.id, { status: "attivo" });
      fetchDeletedItems();
    }
    async function deleteOpera(item) {
      const { id } = item;
      await directus
        .items("inventario")
        .updateOne(item.inventario, { oa: null });

      await store.collections.deleteOne("opera", id);
      fetchDeletedItems();
    }
    return {
      authenticated,
      user,
      me,
      items,
      fields,
      userRol,
      imageurl,
      showAlert,
      currentItem,
      deletedItems,
      fieldsOpera,
      userRolePermissions,
      confirmLogout,
      fetchData,
      onSaveClicked,
      onInfoClicked,
      updateImage,
      onEditClicked,
      onChangeUserData,
      fetchDeletedItems,
      closeAlert,
      printS,
      printP,
      recoverOpera,
      deleteOpera,
      toggleClass,
      isToggled: false,
    };
  },
};
</script>
<style scoped></style>
