<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { directus } from "../API/";

const accessToken = store?.tokenInfo?.access_token;
const authenticated = computed(() => store.authenticated);
const user = ref();
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
const colorHome = ref('#'+import.meta.env.VITE_PROJECT_TEXT_MAIN_COLOR);

const router = useRouter();

function toggleClass() {
  if (document.body.classList.contains("toggle-sidebar")) {
    document.body.classList.remove("toggle-sidebar");
  } else {
    document.body.classList.add("toggle-sidebar");
  }
}
getUserInfo();
async function getUserInfo() {
  const me = await directus.users.me.read();
  user.value = me;
}
function confirmLogout() {
  const confirmed = confirm("È sicuro di voler effettuare il logout?");
  if (confirmed) router.push({ name: "logout" });
}
function onProfileClicked() {
  router.push({ name: "userArc" });
}
</script>

<template>
  <header
    id="header"
    class="header fixed-top d-flex align-items-center justify-content-between"
  >
    <!-- ICON OF THE MUSEUM -->
    <div class="d-flex align-items-center">
      <img :src="imageHome" alt="" style="height: 50px" />
      <i class="bi bi-list toggle-sidebar-btn" @click="toggleClass"></i>
    </div>
    <!-- TITLE -->
    <div class="operaTitle text-center">
      <span>Archivio cartografico IGM </span>
    </div>
    <!-- USER DROPDOWN -->
    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <ul class="nav">
          <li class="nav-item dropdown pe-3">
            <a
              class="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              :style="'color:'+colorHome"
            >
              {{ user?.first_name }}
              {{ user?.last_name }}
              <!---- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">-->
              <span class="d-none d-md-block dropdown-toggle ps-2"></span>
            </a>
            <!-- End Profile Iamge Icon -->
            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
            >
              <li class="dropdown-header">
                <h6>{{ user?.first_name }} {{ user?.last_name }}</h6>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  @click="onProfileClicked()"
                >
                  <i class="ri-mail-fill"></i>
                  <span> Profilo</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="#"
                  @click.prevent="confirmLogout"
                >
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Esci</span>
                </a>
              </li>
            </ul>
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
}
.active {
  font-weight: bold;
}
.operaTitle {
  flex-grow: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 25px;
  margin: 0;
}
</style>
