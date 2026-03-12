<template>
  <slot name="label">
    <label
      :for="`field-${field.name}`"
      class="form-label"
      v-html="field.label"
    ></label>
  </slot>

  <div class="border rounded p-2 d-flex align-items-center gap-2" :id="`field-${field.name}`">
    
    <!-- Descargar XML -->
    <button class="btn btn-sm btn-primary" @click="onDownloadClicked">
      Download
    </button>

    <!-- Abrir drawer -->
    <button
      class="btn btn-sm btn-warning"
      @click="onEditClicked"
      v-if="field.edit !== 'false'"
    >
      Modifica
    </button>

  </div>

  <!-- Drawer -->
  <Drawer ref="editRef">
    <template #header>
      Modificar
    </template>

    <div>
      <MyForm :fields="editFields" @change="editedData = $event"/>
    </div>
  </Drawer>
</template>

<script setup>
import { ref, toRaw, defineAsyncComponent, toRefs } from "vue"
import Drawer from "../Modal/Drawer.vue"
import FormField from "@/models/FormField"

const MyForm = defineAsyncComponent(() => import("./Form.vue"))

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  field: { type: FormField, default: null },
  fields: { type: Array, default: () => [] }
})

const { modelValue, field } = toRefs(props)

/* ---------- DOWNLOAD XML ---------- */
function onDownloadClicked() {
  const imageField = props.fields.find(f => f.name === "image")
  const fileName = imageField?.__value || ""

  if (!fileName) {
    alert("No hay imagen seleccionada")
    return
  }

  const link = document.createElement("a")
  link.href = `http://195.231.23.205/igm/download_metadata.php?file=${encodeURIComponent(fileName)}`
  link.click()
}

/* ---------- EDIT DRAWER ---------- */
const editRef = ref()
const editFields = ref([])
const editedData = ref(null)

async function onEditClicked() {
  editFields.value = field.value.fields().map(f => f.clone())
  const response = await editRef.value.show()
  if (response === false) return
  saveChanges()
}

function saveChanges() {
  const fields = toRaw(editFields.value)
  const data = { ...modelValue.value }

  for (const f of fields) {
    if (!f.dirty) continue
    data[f.name] = f.value
  }

  emit("update:modelValue", data)
}
</script>

<style scoped>
</style>