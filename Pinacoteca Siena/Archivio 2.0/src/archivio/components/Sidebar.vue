<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";

export default {
  setup(props, context) {
    const accessToken = store?.tokenInfo?.access_token;
    const authenticated = computed(() => store.authenticated);

    const permissions = ref(null);
    const userStore = store.user;
    const userRolePermissions = ref(null);
    onMounted(async () => {
      await getUserData();
    });
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
    return {
      authenticated,
      userRolePermissions,
    };
  },
};
</script>

<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar" v-if="userRolePermissions !== null">
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
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchOA', params: { queryP: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca</router-link
                >
              </li>
              <li class="list-group-item" v-if="userRolePermissions.oa.create">
                <router-link
                  class="nav-link"
                  :to="{ name: 'createOA', params: { collection: 'opera' } }"
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
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'collocazione' },
                  }"
                  >Collocazione</router-link
                >
              </li>

              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'cronologia' },
                  }"
                  >Cronologia</router-link
                >
              </li>
              <!-- <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'localizzazione' },
                  }"
                  >Altre localizzazioni</router-link
                >
              </li> -->
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'autore' } }"
                  >Autore</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'ambito' } }"
                  >Ambito</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'committenza' },
                  }"
                  >Committenza</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'restauro' },
                  }"
                  >Restauro</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listOA',
                    params: { collection: 'iscrizione' },
                  }"
                  >Iscrizione</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'stemmi' } }"
                  >Stemmi</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'fta' } }"
                  >Fotografia</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'mostra' } }"
                  >Mostra</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'fonte' } }"
                  >Fonte</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'listOA', params: { collection: 'bib' } }"
                  >Bibliografia</router-link
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
                <router-link class="nav-link" :to="{ name: 'modelFavOA' }">
                  <i class="bi bi-printer"></i> Stampa i preferiti</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'modelSanOA', params: { id: 0 } }"
                >
                  <i class="bi bi-printer"></i> Stampa sanitaria</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'modelPresOA', params: { id: 0 } }"
                >
                  <i class="bi bi-printer"></i> Stampa prestito</router-link
                >
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
