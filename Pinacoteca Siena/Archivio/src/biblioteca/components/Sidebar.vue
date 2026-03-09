<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

export default {
  setup(props, context) {
    const accessToken = store?.tokenInfo?.access_token;
    const authenticated = computed(() => store.authenticated);

    return {
      authenticated,
    };
  },
};
</script>

<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
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
                <router-link class="nav-link" :to="{ name: 'homeBiblioteca' }">
                  <i class="bi bi-house text-primary"></i>
                  Dashboard</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchBib', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca libro</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'CreateBib',
                    params: { collection: 'biblioteca' },
                  }"
                >
                  <i class="bi bi-file-earmark-plus text-info"></i> Nuovo libro</router-link
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
                    name: 'listBib',
                    params: { collection: 'bib_autore' },
                  }"
                  >Autori</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_curatore' },
                  }"
                  >Curatori</router-link
                >
              </li>
              <!-- <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_collocazione' },
                  }"
                  >Collocazione</router-link
                >
              </li> -->
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_armadio' },
                  }"
                  >Armadio</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_editore' },
                  }"
                  >Editore</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_luogo' },
                  }"
                  >Luogo</router-link
                >
              </li>
             

              <!---<li class="nav-item"><router-link class="nav-link" :to="{name:'listItems',params:{collection:'autore'}}">Autori</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{name:'notes'}">Notes</router-link></li>--->
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse4"
            aria-expanded="false"
            aria-controls="collapse4"
          >
            UTENTI
          </button>
        </h2>
        <div
          id="collapse4"
          class="accordion-collapse collapse"
          aria-labelledby="heading4"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'searchUBib', params: { piano: 'all' } }"
                >
                  <i class="bi bi-search text-warning"></i> Cerca utente</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'listBib',
                    params: { collection: 'bib_utente' },
                  }"
                  > Utenti</router-link
                >
              </li>
              <li class="list-group-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'CreateBib',
                    params: { collection: 'bib_utente' },
                  }"
                >
                <i class="bi bi-person-add"></i> Nuovo
                  utente</router-link
                >
              </li>
              <!-- prestito -->
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFive">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse5"
            aria-expanded="false"
            aria-controls="collapse5"
          >
            PRESTITO
          </button>
        </h2>
        <div
          id="collapse5"
          class="accordion-collapse collapse"
          aria-labelledby="heading5"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li class="list-group-item">
                <i class="bi bi-book"></i> Lista prestiti
              </li>
              

              <!-- prestito -->
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
                <i class="bi bi-printer"></i> Stampa scheda libro
              </li> <li class="list-group-item">
                <i class="bi bi-printer"></i> Stampa etichetta
              </li>

              <!-- prestito -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <!-- End Sidebar-->
</template>
<style></style>
