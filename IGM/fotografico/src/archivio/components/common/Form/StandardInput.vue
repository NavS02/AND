<template>
  <label
    :for="`field-${field.name}`"
    class="form-label"
    v-html="field.label"
  ></label>

  <input
    v-if="field.special == true"
    :disabled="field.edit == 'false'"
    style="background-color: lightyellow"
    :type="field.type"
    :id="`field-${field.name}`"
    class="form-control"
    v-model="data"
  />

  <div v-else-if="field.edit == 'false'" class="input-group">
    <input
      :type="field.type"
      :id="`field-${field.name}`"
      class="form-control"
      v-model="data"
      disabled
    />
    <button
      v-if="field.name == 'image'"
      class="btn btn-outline-secondary"
      @click="data = ''"
    >
    <font-awesome-icon icon="fa-solid fa-trash" fixed-width />

    </button>
  </div>

  <input
    v-else-if="field.invisible == 'true'"
    :type="field.type"
    :id="`field-${field.name}`"
    class="form-control"
    style="display: none;"
    v-model="data"
    disabled
  />

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
  const emit = defineEmits(["update:modelValue"]);
  
  const { modelValue, field } = toRefs(props);
  
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