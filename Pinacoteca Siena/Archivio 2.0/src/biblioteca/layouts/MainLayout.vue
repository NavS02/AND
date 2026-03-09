<template>
  <main>
    <section class="layout" v-if="canAccess">
      <Menu />
      <Sidebar />
      <router-view />
    </section>
    <section v-else class="no-access">
      <p>Non hai i permessi per accedere a questa pagina.</p>
      <p style="font-weight: 600; text-decoration: underline">
        <router-link class="nav-link" :to="{ name: 'logout' }">
          Esci
        </router-link>
      </p>
    </section>
  </main>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import Sidebar from "../components/Sidebar.vue";
import store from "../../store";
import { ref, onMounted } from "vue";

const permissions = ref(null);
const userStore = store.user;
const userRolePermissions = ref(null);
const canAccess = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("/permission.json");
    permissions.value = await response.json();
    const logged = await userStore.getUserInfo();
    if (permissions.value[logged.role]) {
      userRolePermissions.value = permissions.value[logged.role].permission;
      canAccess.value = userRolePermissions.value.biblioteca.read;
    } else {
      console.log("Permissions not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>

<style scoped>
.no-access {
  text-align: center;
  font-size: 1.2rem;
  color: red;
  margin-top: 50px;
}
</style>
