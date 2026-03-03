<template>
  <div class="container">
    <section
      class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
          >
            <div class="d-flex justify-content-center py-4">
              <a class="logo d-flex align-items-center w-auto">
                <!---  <img src="assets/img/logo.png" alt="">---->

                <i class="bi bi-house text-primary"></i>
                <router-link class="nav-link" :to="{ name: 'home' }">
                  Museo diocesano</router-link
                >
              </a>
            </div>
            <!-- End Logo -->

            <div class="card mb-3" style="width: 300%; height: 100%">
              <div class="card-body">
                <div class="row g-3 needs-validation">
                  <div class="col-12"></div>
                  <div class="col-12">
                    <label for="yourUsername" class="form-label"
                      >Username</label
                    >
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend"
                        >@</span
                      >
                      <input
                        class="form-control"
                        id="email"
                        type="text"
                        v-model="email"
                        required
                      />
                      <div class="invalid-feedback">
                        Please enter your username.
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="yourPassword" class="form-label"
                      >Password</label
                    >
                    <input
                      class="form-control"
                      id="password"
                      type="password"
                      v-model="password"
                      required
                    />
                    <br>
                    <div style="color: red; text-align: center" v-if="showError">
                      Dati non corretti
                    </div>
                  </div>
                  <div class="col-12"></div>
                  <!----- <div class="col-12">
                                        <div class="form-check">
                                           <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">  -Remember me-</label>
                                        </div>
                                    </div>--->
                  <div class="col-12">
                    <button
                      class="btn btn-primary w-100"
                      type="button"
                      @click="login"
                    >
                      Login
                    </button>
                  </div>
                  <div class="col-12"></div>
                </div>
              </div>
            </div>

            <div class="credits">
              Progettato da
              <a
                href="https://www.ambientinarratividigitali.it/"
                target="_blank"
                >And Srl</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";

export default {
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const userStore = store.user;

    const program = ref();
    const email = ref("");
    const password = ref("");
    const showError =ref(false)
    watch(
      route,
      () => {
        program.value = route.params?.program;
        if (!program.value) return;
      },
      { immediate: true, deep: true }
    );

    async function login() {
      showError.value=false
      const logged = await userStore.login(email.value, password.value);

      if (!logged) {
        showError.value=true;
        return;
      }
      const { redirect } = route.query;
      if (redirect) router.push(redirect);
      else {
        if (program.value == "archivio") {
          router.push({ name: "homeArchivio" });
        } else if (program.value == "inventario") {
          router.push({ name: "homeInventario" });
        } else if (program.value == null) {
          console.log("ERROR");
        }
      }
    }

    return {
      email,
      showError,
      password,
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
