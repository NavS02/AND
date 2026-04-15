<script setup>
import HelloWorld from './components/SelectLingua.vue'
import PWABadge from './components/PWABadge.vue'
import { SpeedInsights } from "@vercel/speed-insights/vue"

</script>

<template>
    <SpeedInsights/>

<router-view/>
<PWABadge />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
