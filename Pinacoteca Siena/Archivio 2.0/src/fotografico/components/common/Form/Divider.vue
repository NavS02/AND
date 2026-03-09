<template>
    <slot v-if="!field.special">
        <hr>
    </slot>
    <slot v-else>
        <hr style="height:5px;border-width:0;color:black;background-color:black">
    </slot>
</template>

<script setup>
import { toRefs, computed } from "vue";
  
  const props = defineProps({
    modelValue: {},
    field: {},
  });
  const { modelValue, field } = toRefs(props);

  const emit = defineEmits(["update:modelValue"]);
  function download(value){
    let url = import.meta.env.VITE_API_BASE_URL;
  let urlWithoutPort = url.replace(/:\d+/, "");

   let route=urlWithoutPort+ "/dataEntry/public/images/foto_digitales/"+value;
   const link = document.createElement('a');
    link.href = route;

    if (value.endsWith('.pdf')) {
        link.target = '_blank'; 
    } else {
        link.download = value;
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

  
  const data = computed({
    get() {
      return modelValue.value;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

</script>

<style scoped>

</style>