<template>
    <label
      :for="`field-${field.name}`"
      class="form-label"
      v-html="field.label"
    ></label>
    <input
      v-if="field.special == true"
      style="background-color: lightyellow"
      :type="field.type"
      :id="`field-${field.name}`"
      class="form-control"
      v-model="data"
    />
    <div v-else-if="field.edit == 'false'">
    <input
      
      :type="field.type"
      :id="`field-${field.name}`"
      class="form-control"
      v-model="data"
      disabled
    />
    <button type="button" class="btn btn-light" v-if="field.download=='true'" @click="download(field.value)"><i class="bi bi-download"></i></button>

  </div>
    <input
      v-else
      :type="field.type"
      :id="`field-${field.name}`"
      class="form-control"
      v-model="data"
    />
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
  
  <style scoped></style>