<template>
  <div class="split-screen">
    <div class="left" @click="goVideo()">
      <video autoplay muted loop playsinline class="video-bg">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div class="overlay-text">VIDEO</div>
    </div>

    <div class="circle-container">
      <div class="circle-text">
        <!-- Chiesa di<br />
        Santa Maria della Strada -->
      </div>
    </div>

    <div class="right" @click="goMappa()">
      <div class="overlay-text">
                {{ lingua === "it" ? 'ESPLORA' : 'EXPLORE' }}

      </div>
    </div>
  </div>
  <div class="split-screen2"></div>

<div
  class="flag-circle"
  :class="{ expanded: showUKFlag }"
  @click="toggleFlags"
>
  <div class="flag-content">
    <img
      v-if="lingua === 'it'"
      src="/italy-flag-round-large.png"
      alt="Bandiera Italia"
    />
    <img
      v-else-if="lingua === 'en'"
      src="/United-kingdom_flag_icon_round.svg.png"
      alt="Bandiera UK"
    />

   <transition name="expand-fade">
  <img
    v-if="showUKFlag && lingua === 'it'"
    class="uk-flag"
    src="/United-kingdom_flag_icon_round.svg.png"
    alt="Bandiera UK"
    @click.stop="switchLanguage('en')"
  />
  <img
    v-else-if="showUKFlag && lingua === 'en'"
    class="italy-flag"
    src="/italy-flag-round-large.png"
    alt="Bandiera Italia"
    @click.stop="switchLanguage('it')"
  />
</transition>

  </div>
</div>




</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from 'vue';

const showUKFlag = ref(false);
defineProps({
  lingua: {
    type: String,
    required: true,
  },
});

function toggleFlags() {
  showUKFlag.value = !showUKFlag.value;
}
function switchLanguage(newLang) {
  const currentPath = route.fullPath;
  const pathParts = currentPath.split('/').filter(Boolean);

  pathParts[0] = newLang;

  const newPath = '/' + pathParts.join('/');
  router.push(newPath);
  toggleFlags()
}

const route = useRoute();
const router = useRouter();

function goMappa() {
  router.push({ name: "mappa" });
}

function goVideo() {
  router.push({ name: "video" });
}
</script>

<style scoped>
.flag-circle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: rgb(244, 243, 243);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 99999;
  transition: height 0.3s ease, border-radius 0.3s ease;
  overflow: hidden;
}

.flag-circle.expanded {
  height: 120px;
  border-radius: 30px; 
}

.flag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  padding-top: 10px;
}

.flag-content img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.expand-fade-enter-from,
.expand-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

html,
body {
  margin: 0;
  height: 100%;
}

.split-screen {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.split-screen2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: transparent;
  pointer-events: none;
}

.split-screen2::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("/Mediamodifier-Design2.svg") no-repeat center center;
  background-size: 9000px;
  opacity: 0.3;
  z-index: -1;
  background-position-x: -5000px;
  background-position-y: -3000px;
}

.left,
.right {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  background-color: black;
}

.right {
  background: url("/S.MariaStrada.jpg") no-repeat center center;
  background-size: cover;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay-text {
  z-index: 1;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 10px black;
  cursor: pointer;
}

.circle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.circle-text {
  background: url("/background.svg") no-repeat center center;
  background-size: cover;
  background-color: rgba(200, 200, 200, 0.7);
  background-size: 9000px;
  color: white;
  font-size: 1.75rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 50%;
  text-align: center;
  width: 450px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
</style>
