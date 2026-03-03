<template>
  <div class="container">
    <div class="card">
      <img src="/logoMilano.png" alt="Logo" class="logo" />

      <div class="options">
        <div class="card" @click="onOptionClicked('archivio')">
          <div class="card-icon">
            <font-awesome-icon :icon="['fa-solid', 'fa-paintbrush']" />
          </div>
          <div class="card-body">
            <h5 class="card-title">Archivio opere d'arte</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="credits">
      Progettato da
      <a href="https://www.ambientinarratividigitali.it/" target="_blank"
        >AND Srl</a
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();

    function onOptionClicked(option) {
      router.push({ name: "login", params: { program: option } });
    }

    return {
      onOptionClicked,
    };
  },
};
</script>

<style scoped>
.container {
   max-width: 1024px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; /* opcional si quieres que el contenedor ocupe toda la altura de la pantalla */
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
  color: #861B2A;
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
  color: #999;
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
