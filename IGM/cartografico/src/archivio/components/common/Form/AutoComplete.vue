<template>
  <label
    :for="`field-${field.name}`"
    class="form-label"
    v-html="field.label"
  ></label>

  <!-- AutoComplete for multiple selection -->
  <AutoComplete
    v-model="selectedValues"
    forceSelection
    multiple
    fluid
    :suggestions="items"
    @complete="search"
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

// Computed to handle the conversion between array and string
const selectedValues = computed({
  get() {
    // Convert the string to an array when loading the value (assuming it's comma-separated)
    return modelValue.value ? modelValue.value.split(",") : [];
  },
  set(value) {
    // Convert the array to a string when saving (joined by commas)
    emit("update:modelValue", value.join(","));
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
async function fetchNazione() {
  if (field.value.name == "nazione") {
    let nazioni = await directus
      .items("nazioni")
      .readByQuery({ fields: "nazione", limit: -1 });

    items.value = nazioni.data.map((nazione) => nazione.nazione);
    originalitems.value = items.value;
  } else if (field.value.name == "regione") {
    let regioni = await directus
      .items("regioni")
      .readByQuery({ fields: "regione", limit: -1 });

    items.value = regioni.data.map((regione) => regione.regione);
    originalitems.value = items.value;
  }
  else if (field.value.name == "provincia") {
    let province = await directus
      .items("province")
      .readByQuery({ fields: "provincia", limit: -1 });

    items.value = province.data.map((provincia) => provincia.provincia);
    originalitems.value = items.value;
  }
  else if (field.value.name == "comune") {
    let comuni = await directus
      .items("comuni")
      .readByQuery({ fields: "comune", limit: -1 });

    items.value = comuni.data.map((comune) => comune.comune);
    originalitems.value = items.value;
  }
}

// Execute data loading when the component is mounted
onMounted(() => {
  fetchNazione();
});
</script>

<style scoped></style>
