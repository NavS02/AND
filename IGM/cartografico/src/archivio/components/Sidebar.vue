<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { directus } from "../API/";

var root = document.documentElement;
const permissions = ref(null);
const userRolePermissions = ref(null);
const userStore = store.user;

const accessToken = store?.tokenInfo?.access_token;
const authenticated = computed(() => store.authenticated);
const colorAccordeon = ref("#0D6EFD");
const textColorAccordeon = ref("white");
const me = ref();
const role = ref();
const isAdmin = ref(true);
const possibleTables = ref([]);
const myButton=ref()

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




// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.value.style.display = "block";
  } else {
    myButton.value.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


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
            style="font-weight: bold"
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
                  Pannello di controllo</router-link
                >
              </li>
              <!-- <li
                class="list-group-item"
                v-if="possibleTables.includes('carte_storiche') || isAdmin"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchArc', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li> -->
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseFour"
            style="font-weight: bold"
          >
            CARTE STORICHE
          </button>
        </h2>
        <div
          id="collapseFour"
          class="accordion-collapse collapse show"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchArc', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listArc',
                    params: { collection: 'carte_storiche' },
                  }"
                >
                  Indice Carte</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'ogtt' } }"
                >
                OGTT - Tipologia</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'MTCM' } }"
                >
                MTCM – Materia</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'MTCT' } }"
                >
                  MTCT – Tecnica</router-link
                >
              </li>
              <!-- <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listArc', params: { collection: 'regioni' } }"
                >
                  Indice regione</router-link
                >
              </li> -->
              <!-- <li
                class="list-group-item"
                v-if="possibleTables.includes('carte_storiche') || isAdmin"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchArc', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li> -->
              <li
                class="list-group-item"
                v-if="userRolePermissions.cartografico.create"
              >
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'CreateArc',
                    params: { collection: 'carte_storiche' },
                  }"
                >
                  <i class="bi bi-file-earmark-plus text-info"></i> Nuova carta
                </router-link>
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
            style="font-weight: bold"
          >
            SERIE ITALIANA
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
              <li
                class="list-group-item"
                v-if="possibleTables.includes('regioni') || isAdmin"
              >
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchSer', params: { piano: 'all' } }"
                  ><i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li>
              <li
                class="list-group-item"
                v-if="possibleTables.includes('serie_italiana') || isAdmin"
              >
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listArc',
                    params: { collection: 'serie_italiana' },
                  }"
                  >Indici</router-link
                >
              </li>
              <li
                class="list-group-item"
                v-if="userRolePermissions.cartografico.create"
              >
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'CreateArc',
                    params: { collection: 'serie_italiana' },
                  }"
                >
                  <i class="bi bi-file-earmark-plus text-info"></i> Nuova serie
                </router-link>
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
            data-bs-target="#collapse3"
            aria-expanded="false"
            aria-controls="collapse3"
            style="font-weight: bold"
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
              <li
                class="list-group-item"
                v-if="possibleTables.includes('Foto') || isAdmin" 
              >
                <!-- <router-link class="nav-link" :to="{ name: 'modelFav' }" disabled> -->
                  <i class="bi bi-printer"></i> Stampa i preferiti
                  <!-- </router-link> -->
                
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
              <li
                class="list-group-item"
                v-if="possibleTables.includes('carte_storiche') || isAdmin"
              >
                <!-- <router-link
                  class="nav-link"
                  :to="{ name: 'stampaSinteticaCarta', params: { id: 0 } }"
                > -->
                  <i class="bi bi-printer"></i> Stampa carta
                  <!-- </router-link> -->
              </li>
              <li
                class="list-group-item"
                v-if="possibleTables.includes('serie_italiana') || isAdmin"
              >
                <!-- <router-link
                  class="nav-link"
                  :to="{ name: 'printItem', params: { id: 0 } }"
                > -->
                  <i class="bi bi-printer"></i> Stampa serie italiana
                  <!-- </router-link> -->
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
      <button @click="topFunction()" id="myBtn" class="btn btn-outline-dark" title="Go to top"><font-awesome-icon icon="arrow-up" /></button>

    </div>
  </aside>
  <!-- End Sidebar-->
</template>
<style scoped>
#myBtn {
  display: none; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */

}

#myBtn:hover {
  background-color: #555; /* Add a dark-grey background on hover */
}</style>
