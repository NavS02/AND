<script setup>
import { ref, computed,onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { directus } from "../API/";
const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);
var root = document.documentElement;

const accessToken = store?.tokenInfo?.access_token;
const authenticated = computed(() => store.authenticated);
const colorAccordeon = ref("#" + import.meta.env.VITE_PROJECT_MAIN_COLOR);
const textColorAccordeon = ref(
  "#" + import.meta.env.VITE_PROJECT_TEXT_MAIN_COLOR
);
const me = ref();
const role = ref();
const isAdmin = ref(true);
const possibleTables = ref([]);

onMounted(async () => {
  await getUserData()
})



async function getUserData() {
  const response = await fetch("/permission.json");
    permissions.value = await response.json();
    const logged = await userStore.getUserInfo();
console.log(logged)
    if (permissions.value[logged.role]) {
      userRolePermissions.value = permissions.value[logged.role].permission;
      console.log("Permission: ", userRolePermissions.value);
    } else {
      console.log("Permissions not found");
    }
}
root.style.setProperty("--bs-primary-bg-subtle", colorAccordeon.value);
root.style.setProperty("--bs-primary-text-emphasis", textColorAccordeon.value);
root.style.setProperty("--bs-primary-border-subtle", colorAccordeon.value);
</script>

<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar" v-if="userRolePermissions">
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            HOME
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item">
                <router-link class="nav-link" :to="{ name: 'homeFotografico' }">
                  <i class="bi bi-house text-primary"></i>
                  Dashboard</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link class="nav-link" :to="{ name: 'searchFot',params: { piano: 'all' }  }">
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li>
              <li class="list-group-item"
              v-if="userRolePermissions.fotografico.create"
              
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'CreateFot', params: { collection: 'Foto' } }"
                >
                  <i class="bi bi-file-earmark-plus text-info"></i> Nuova
                  scheda</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            INDICI
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group" id="sidebar-nav">
             
              <!-- <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listFot', params: { collection: 'Foto' } }"
                  >Foto</router-link
                >
              </li> -->
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listFot', params: { collection: 'fotografo' } }"
                  >Fotografo</router-link
                >
              </li><li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listFot', params: { collection: 'oa_autore' } }"
                  >Autore opera</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listFot', params: { collection: 'oa_ogtd_f' } }"
                  >Oggetto</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listFot', params: { collection: 'oa_collocazione_f' } }"
                  >Collocazione</router-link
                >
              </li>

              <!---<li class="nav-item"><router-link class="nav-link" :to="{name:'listItems',params:{collection:'autore'}}">Autori</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{name:'notes'}">Notes</router-link></li>--->
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse3"
            aria-expanded="false"
            aria-controls="collapse3"
          >
            FUNZIONI
          </button>
        </h2>
        <div
          id="collapse3"
          class="accordion-collapse collapse"
          aria-labelledby="heading3"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item">
                
                  <i class="bi bi-printer"></i> Stampa scheda
              </li>
           
              <!-- prestito -->
            </ul>
          </div>
        </div>
      </div>
          <div id="bottomSidebar" class="position-absolute bottom-0 text-center" style="border:1px solid #ccc; width:80%; padding:10px; cursor:pointer;margin-bottom:10px;border-radius: 10px;" @click="$router.push({ name: 'home' })">
       <i class="bi bi-door-open"></i>
       <span style="margin-bottom: 10px;">       Home
 </span>
        
      </div>
    </div>
  </aside>
  <!-- End Sidebar-->
</template>
<style></style>
