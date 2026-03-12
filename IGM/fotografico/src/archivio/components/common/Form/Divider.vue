<template>
  <hr :style="{ borderColor: color }" />
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'grey' 
  }
});
</script>

<style scoped>
hr {
  border-width: 1px;
  border-style: solid;
  
}
</style>
