<template>
  <label
    :for="`field-${field.name}`"
    class="form-label"
    v-html="field.label"
  ></label>

  <!-- AutoComplete for multiple selection -->
  <AutoComplete
    v-model="selectedValues"
    multiple
    fluid
    @complete="search"
    :typeahead="false"
  />
</template>

<script setup>
import AutoComplete from "primevue/autocomplete";
import { ref, toRefs, computed, onMounted } from "vue";
import { directus } from "../../../API";

// Define the received properties
const props = defineProps({
  modelValue: String, // modelValue will be a string
  field: {}, // field for additional properties
});

const emit = defineEmits(["update:modelValue"]); // Emit updates to modelValue

const { modelValue, field } = toRefs(props);

const items = ref([]);
const originalitems = ref([]);

const selectedValues = computed({
  get() {
    try {
      return modelValue.value ? JSON.parse(modelValue.value) : [];
    } catch (e) {
      return [];
    }
  },
  set(value) {
    emit("update:modelValue", JSON.stringify(value));
  },
});

// Search function to filter suggestions based on user input
function search(event) {
  items.value = originalitems.value;

  const filtered = items.value.filter(
    (item) => item.toUpperCase().includes(event.query.toUpperCase()) // Filters the suggestions
  );

  items.value = filtered;
}

// Load initial data from the Directus API
async function fetchData() {
  if (field.value.name == "tagAI") {
    let info = await directus.items("Foto").readByQuery({
      fields: "tagAI",
      limit: -1,
      filter: { tagAI: { _nnull: true } },
    });

    items.value = info.data.map((tag) => tag.tagAI);
    originalitems.value = items.value;
  }
}

// Execute data loading when the component is mounted
onMounted(() => {
  // fetchData();
});
</script>

<style scoped></style>
