<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { directus } from "../API/";

var root = document.documentElement;
const permissions = ref(null);

const accessToken = store?.tokenInfo?.access_token;
const authenticated = computed(() => store.authenticated);
const colorAccordeon = ref("#" + import.meta.env.VITE_PROJECT_MAIN_COLOR);
const textColorAccordeon = ref(
  "#" + import.meta.env.VITE_PROJECT_TEXT_MAIN_COLOR
);
const me = ref();
const role = ref();
const isAdmin = ref(false);
const possibleTables = ref([]);
const userStore = store.user;
const userRolePermissions = ref(null);

getUserData();
async function getUserData() {
      const response = await fetch("/permission.json");
      permissions.value = await response.json();
      const logged = await userStore.getUserInfo();
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
  <aside id="sidebar" class="sidebar"  v-if="userRolePermissions !== null">
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
                <router-link class="nav-link" :to="{ name: 'homeArchivio' }">
                  <i class="bi bi-house text-primary"></i>
                  Dashboard</router-link
                >
              </li>
              <li
                class="list-group-item"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchArc', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li>
              <li
                class="list-group-item"
                v-if="userRolePermissions.fotografico.create"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'CreateArc', params: { collection: 'Foto' } }"
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
           
          
                <li class="list-group-item" >
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'fotografo' } }"
                  >Fotografo</router-link
                >
              </li>


              <li class="list-group-item" >
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'serie' } }"
                  >Serie</router-link
                >
              </li> <li class="list-group-item" >
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'sotto_serie' } }"
                  >Sotto Serie</router-link
                >
              </li> 
               <!-- <li class="list-group-item" v-if="possibleTables.includes('restauri') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'restauri' } }"
                  >Restauri</router-link
                >
              </li> -->
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'mtx' } }"
                  >MTX – Indicazione colore</router-link
                >
              </li>
              <li class="list-group-item" >
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'ogtd' } }"
                  >OGTD - Definizione</router-link
                >
              </li>
              <li class="list-group-item" >
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'ogtt_F' } }"
                  >OGTT - Tipologia</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'lrcr_f' } }"
                  >LRCR - Regione</router-link
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
                <router-link class="nav-link" :to="{ name: 'modelFav' }">
                  <i class="bi bi-printer"></i> Stampa i preferiti</router-link
                >
              </li>
              <!-- <li class="list-group-item" v-if="possibleTables.includes('opera') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'modelSan', params: { id: 0 } }"
                >
                  <i class="bi bi-printer"></i> Stampa sanitaria</router-link
                >
              </li>
              <li class="list-group-item" v-if="possibleTables.includes('opera') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'modelPres', params: { id: 0 } }"
                >
                  <i class="bi bi-printer"></i> Stampa prestito</router-link
                >
              </li> -->
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'printItem', params: { id: 0 } }"
                >
                  <i class="bi bi-printer"></i> Stampa foto</router-link
                >
              </li>
              <!-- prestito -->
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse4"
            aria-expanded="false"
            aria-controls="collapse4"
          >
            APP
          </button>
        </h2>
        <div
          id="collapse4"
          class="accordion-collapse collapse"
          aria-labelledby="heading3"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item" v-if="possibleTables.includes('app') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'appDash' }"
                >
                <font-awesome-icon icon="fa-solid fa-chart-line" /> Dashboard</router-link
                >
              </li>
              <li class="list-group-item" v-if="possibleTables.includes('app') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'app' } }"
                >
                  <i class="bi bi-search text-warning"></i> Lista</router-link
                >
              </li>
          
            </ul>
          </div>
        </div>
      </div> -->

      <!-- <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse5"
            aria-expanded="false"
            aria-controls="collapse5"
          >
            TOUCHSCREEN
          </button>
        </h2>
        <div
          id="collapse5"
          class="accordion-collapse collapse"
          aria-labelledby="heading3"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item" v-if="possibleTables.includes('touch_chiesa') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listArc',
                    params: { collection: 'touch_chiesa' },
                  }"
                  >Chiese</router-link
                >
              </li>
              <li class="list-group-item" v-if="possibleTables.includes('touch') || isAdmin">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'touch' } }"
                >
                  <i class="bi bi-search text-warning"></i> Lista</router-link
                >
              </li>
              <li class="list-group-item" v-if="possibleTables.includes('touch') || isAdmin">
                <router-link class="nav-link" :to="{ name: 'ItemsMap' }">
                  <i class="bi bi-map"></i>
                  Mappa</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>
  </aside>
  <!-- End Sidebar-->
</template>
<style scoped></style>
