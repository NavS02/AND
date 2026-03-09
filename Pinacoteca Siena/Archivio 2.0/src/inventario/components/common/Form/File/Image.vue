<template>
  <slot name="label">
    <label
      :for="`field-${field.name}`"
      class="form-label"
      v-html="field.label"
    ></label>
  </slot>
  <div class="border rounded p-2">
    <template v-if="asset?.id">
      <div :id="`field-${field.name}`" class="d-flex flex-row align-items-end">
        <div class="me-2">
          <img
            :src="baseURLProject + '/assets/' + asset.id"
            style="max-width: 100px"
          />
        </div>
        <div class="d-flex flex-column">
          <FileMetadata :file="asset" />
          <FileActions
            :file="asset"
            @downloadFile="onDownloadClicked"
            @showFile="onShowAssetClicked"
            @deleteFile="onDeleteFileClicked"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="d-flex gap-2 mt-2" v-if="field.edit !== 'false'">
        <UploadModal @filesSelected="onFilesSelected">
          <template #button-text>Upload Image</template>
        </UploadModal>
        <AssetsModal @filesSelected="onFilesSelected" :filter="filesFilter">
          <template #button-text>Seleziona esistente</template>
        </AssetsModal>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, toRefs, computed, provide, inject } from "vue";
import { Image as ImageModel } from "../../../../../models";
import { useAsset } from "../../../../../utils";
import { accessToken, baseURL } from "../../../../../API";
import UploadModal from "./UploadModal.vue";
import AssetsModal from "./AssetsModal.vue";
import FileMetadata from "../../Upload/FileMetadata.vue";
import FileActions from "../../Upload/FileActions.vue";

const { isImage, url, thumbnail } = useAsset(baseURL, accessToken);
const baseURLProject = ref(baseURL);
const modal = inject("$modalManager");
provide("multiple", false); // this will be injected in ChooseFilesButton

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  field: { type: ImageModel, default: null },
});

const { field, modelValue: asset } = toRefs(props);
const imageOptions = computed(() => {
  const { fit, width, height, quality } = field.value;
  return { fit, width, height, quality };
});

const filesFilter = ref({ type: { _starts_with: "image" } });

function deleteAsset() {
  emit("update:modelValue", null);
}

async function onDeleteFileClicked(_file) {
  const confirmed = await modal.confirm({
    title: "Confirm",
    body: "Are you shure you want to delete this item?",
  });
  if (!confirmed) return;
  deleteAsset();
}

function onShowAssetClicked(_file) {
  window.open(baseURLProject.value + "/assets/" + _file.value.id, "_blank");
  // win.focus()
}
function onDownloadClicked(_file) {
  function downloadImage(imageUrl, fileName) {
    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("There was an error downloading the image:", error);
      });
  }

  const imageUrl = baseURLProject.value + "/assets/" + _file.value.id;
  const fileName = _file.value.title;
  downloadImage(imageUrl, fileName);
}

function onFilesSelected(files) {
  const file = files?.[0];
  if (file) emit("update:modelValue", file);
}
</script>

<style scoped></style>