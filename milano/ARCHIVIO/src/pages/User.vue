<template>
  <main id="main" class="main">
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
              <h2>{{ user.first_name }} {{ user.last_name }}</h2>
              <h3>{{ user.email }}</h3>
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
                    Generale
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
                    Edit Profile
                  </button>
                </li>

                <li class="nav-item" role="presentation">
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
                </li>

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
                    Favorite Items
                  </button>
                </li>
              </ul>
              <div class="tab-content pt-2">
                <div
                  class="tab-pane fade profile-overview active show"
                  id="profile-overview"
                  role="tabpanel"
                >
                  <h5 class="card-title">Profile Details</h5>

                  <div class="container">
                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Nome</div>
                      <div class="col-lg-9 col-md-9">
                        {{ user.first_name }} {{ user.last_name }}
                      </div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Company</div>
                      <div class="col-lg-9 col-md-9">Museo diocesano</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Role</div>
                      <div class="col-lg-9 col-md-9">{{ user.role }}</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Paese</div>
                      <div class="col-lg-9 col-md-9">{{ user.location }}</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Lingua</div>
                      <div class="col-lg-9 col-md-9">IT</div>
                    </div>

                    <div class="row align-items-center justify-content-between">
                      <div class="col-lg-3 col-md-3 label">Email</div>
                      <div class="col-lg-9 col-md-9">{{ user.email }}</div>
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
                    <div class="row mb-3">
                      <label
                        for="profileImage"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Profile Image</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <div class="d-flex align-items-center">
                          <div class="flex-grow-1">
                            <!-- AQUI VA LA FOTO -->
                            <Upload />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Nome" class="col-md-4 col-lg-3 col-form-label"
                        >Nome</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="Nome"
                          type="text"
                          class="form-control"
                          id="Nome"
                          :value="user.first_name"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="Cognome"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Cognome</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="Cognome"
                          type="text"
                          class="form-control"
                          id="Cognome"
                          :value="user.last_name"
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
                          :value="user.description"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Job" class="col-md-4 col-lg-3 col-form-label"
                        >Job</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="job"
                          type="text"
                          class="form-control"
                          id="Job"
                          :value="user.role"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="Paese"
                        class="col-md-4 col-lg-3 col-form-label"
                        >Paese</label
                      >
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="country"
                          type="text"
                          class="form-control"
                          id="Paese"
                          :value="user.location"
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
                          :value="user.email"
                        />
                      </div>
                    </div>

                    <div class="text-center">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        @click="onChangeUserData()"
                      >
                        Save Changes
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
                  <div class="table-responsive"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="d-flex justify-content-end" style="bottom">
        <span class="align-self-end">User ID: {{ user.id }}</span>
        {{user}}
      </div>
    </footer>
  </main>
</template>
<script>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import store from "../store";
// import * as settings from "../settings/";
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
    let imageurl = ref(( import.meta.env.VITE_API_BASE_URL)+"/assets/");
    let items = ref();

    function toggleClass() {
      this.isToggled = !this.isToggled;
      document.body.classList.toggle("toggle-sidebar", this.isToggled);
    }

    function confirmLogout() {
      const confirmed = confirm("È sicuro di voler effettuare il logout?");
      if (confirmed) router.push({ name: "logout" });
    }

    async function onChangeUserData() {
      let name = document.getElementById("Nome").value;
      let surname = document.getElementById("Cognome").value;
      let description = document.getElementById("description").value;
      let country = document.getElementById("Paese").value;
      let email = document.getElementById("Email").value;

      await directus.users.me.update({
        first_name: name,
        last_name: surname,
        description: description,
        location: country,
        email: email,
      });
    }

    return {
      authenticated,
      user,
      items,
      userRol,
      imageurl,
      confirmLogout,
      fetchData,
      updateImage,
      onChangeUserData,
      toggleClass,
      isToggled: false,
    };
  },
};
</script>
<style scoped></style>
