<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

(function () {
  const refreshTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  let timeout;

  function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      router.push({ name: "home" });
    }, refreshTime);
  }

  window.addEventListener("DOMContentLoaded", resetTimer);
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("mousedown", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("scroll", resetTimer);
  window.addEventListener("touchstart", resetTimer);
})();
</script>

<template>
  <router-view/>
</template>

<style scoped>
</style>