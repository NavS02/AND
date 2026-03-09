<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 400px">
      <div class="card-header text-center bg-transparent border-0">
        <img :src="imageHome" alt="Logo" class="logo img-fluid mb-2" />
      </div>

      <div class="card-body">

        <div class="row g-3 needs-validation">
          <div class="col-12">
            <label for="yourUsername" class="form-label">Username</label>
            <div class="input-group">
              <span class="input-group-text">@</span>
              <input
                class="form-control"
                id="email"
                type="text"
                v-model="email"
                required
              />
            </div>
          </div>

          <div class="col-12">
            <label for="yourPassword" class="form-label">Password</label>
            <input
              class="form-control"
              id="password"
              type="password"
              v-model="password"
              required
            />
            <div class="text-danger text-center mt-2" v-if="showError">
              Dati non corretti
            </div>
          </div>

          <div class="col-12">
            <button class="btn btn-primary w-100 mt-3" @click="login">
              Login
            </button>
          </div>
        </div>
      </div>

      <div class="card-footer text-center bg-transparent border-0">
        <small>
          Progettato da
          <a href="https://www.ambientinarratividigitali.it/" target="_blank">
            AND Srl
          </a>
        </small>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, watch } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";

export default {
  setup(props, context) {
    const imageHome = ref(import.meta.env.VITE_PROJECT_MAIN_LOGO);

    const router = useRouter();
    const route = useRoute();
    const userStore = store.user;

    const program = ref();
    const email = ref("");
    const password = ref("");
    const showError = ref(false);
    const projectName = ref(import.meta.env.VITE_PROJECT_NAME);

    watch(
      route,
      () => {
        program.value = route.params?.program;
        if (!program.value) return;
      },
      { immediate: true, deep: true }
    );

    async function login() {
      showError.value = false;
      const logged = await userStore.login(email.value, password.value);

      if (!logged) {
        showError.value = true;
        return;
      }
      const { redirect } = route.query;
      router.push({ name: "home" });
    }

    return {
      email,
      showError,
      password,
      projectName,
      imageHome,
      login,
    };
  },
  props: {
    program: { type: String, default: null }, // this prop is coming from the router
  },
};
</script>

<style scoped>
main {
  max-width: 400px;
  margin: 0 auto;
}
</style>
