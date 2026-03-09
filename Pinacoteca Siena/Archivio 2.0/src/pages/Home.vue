<template>
  <div class="container" style="text-align:center">
    <div class="card" style="width: 100%" v-if="userRolePermissions !== null">
      <img :src="imageHome" alt="Logo" class="logo" />
      <br />
      <div >

      </div>
      <div class="options">
        <div class="card" @click="onOptionClicked('inventario')" v-if="userRolePermissions.inventario.read">
          <div class="card-icon" :style="'color:' + colorHome">
            <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
          </div>
          <div class="card-body">
            <h5 class="card-title">Inventario OA</h5>
          </div>
        </div>
        <div class="card" @click="onOptionClicked('archivio')" v-if="userRolePermissions.oa.read">
          <div class="card-icon" :style="'color:' + colorHome">
            <font-awesome-icon :icon="['fas', 'palette']" />
          </div>
          <div class="card-body">
            <h5 class="card-title">Opere d'arte</h5>
          </div>
        </div>
        <div class="card" @click="onOptionClicked('fotografico')" v-if="userRolePermissions.fotografico.read">
          <!-- <div class="card"> -->
          <div class="card-icon" :style="'color:' + colorHome">
            <font-awesome-icon :icon="['fas', 'image']" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
              &nbsp;&nbsp;&nbsp; Fototeca &nbsp;&nbsp;&nbsp;
            </h5>
          </div>
        </div>
        <div class="card" @click="onOptionClicked('biblioteca')" v-if="userRolePermissions.biblioteca.read">
          <div class="card-icon" :style="'color:' + colorHome">
            <font-awesome-icon icon="book" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
              &nbsp;&nbsp;&nbsp;Biblioteca &nbsp;&nbsp;&nbsp;
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="credits" v-if="userRolePermissions !== null">


     <router-link
                  class="nav-link"
                  :to="{ name: 'logout' }"
                >
                  Esci
                  </router-link
                >
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import store from "../store";

const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);

const router = useRouter();
const route = useRoute();
const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);
const colorHome = ref("#" + import.meta.env.VITE_PROJECT_MAIN_COLOR);

onMounted(async () => {
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
});


function onOptionClicked(option) {

switch (option) {
  case 'inventario':
  router.push({ name: "homeInventario" });
    
    break;
    case 'archivio':
  router.push({ name: "homeArchivio" });
    
    break;
    case 'fotografico':
  router.push({ name: "homeFotografico" });
    
    break;
    case 'biblioteca':
  router.push({ name: "homeBiblioteca" });
    
    break;

  default:
    break;
}
  // router.push({ name: "login", params: { program: option } });
}
</script>

<style scoped>
.container {
  max-width: 1024px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; 
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50%;
  max-width: 400px;
  display: block;
  margin: auto;
}

.options {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.card {
  margin: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
}

.card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.card-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.credits {
  text-align: center;
  font-size: 14px;
  color: blue;
  text-decoration:underline;
}

@media only screen and (max-width: 768px) {
  .card {
    width: 45%;
  }
}

@media only screen and (max-width: 480px) {
  .card {
    width: 90%;
  }
}
</style>
