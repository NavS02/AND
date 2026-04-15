<template>
  <div class="video-container">
    <video autoplay loop playsinline class="full-video">
      <source src="/video.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="change-layer" @click="goHome()">
    <div class="svg-wrapper">
      <svg
        width="72px"
        height="72px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
          fill="#000000"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

function goHome(){
  router.push({ name: "home" });

}
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
}

.full-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.change-layer {
  position: absolute;
  bottom: 1%;
  left: 2%;
  width: 7.5%;
  height: 7.5%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 10;
  font-size: 8px !important;

  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
