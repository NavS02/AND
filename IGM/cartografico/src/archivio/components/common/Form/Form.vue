<template>
  <!-- header -->
  <slot name="header" :data="data" :fields="fields"></slot>

  <div class="row">
    <template v-for="(field, index) in fields" :key="index">
      <slot
        :name="`field-${field.name}`"
        :data="data"
        :fields="fields"
        :field="field"
      >
        <template v-if="field.type == 'manyToMany'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <ManyToMany v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'oneToMany'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <OneToMany v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'manyToOne'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <ManyToOne v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'checkbox'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Checkbox v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'toggle'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Toggle v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'radio'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Radio v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'select'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <SelectDropdown v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'simple-select'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <SelectSimple v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'file'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <File v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'files'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Files v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'image'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Image v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'divider'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Divider />
          </div>
        </template>
        <template v-else-if="field.type == 'external-link'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <ExternalLinkInput v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'markdown'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <MdEditor v-model="field.value" />
          </div>
        </template>
        <template v-else-if="field.type == 'map'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <Map v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else-if="field.type == 'uploadPHP' && field.edit !== 'false'">
  <div :class="`col-md-${field.column}`">
    <form class="form-upload" @submit.prevent="uploadFile">
      <label for="fileToUpload" class="form-label">{{ field.label }}</label>
      <div class="input-group">
        <input
          type="file"
          name="fileToUpload"
          id="fileToUpload"
          class="form-control"
          aria-label="Upload"
          @change="handleFileChange"
          required
        />
        <button type="submit" class="btn btn-primary">
          Upload Image
        </button>
      </div>
      <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </form>
    <div v-if="imagePreview" class="preview-container mt-3">
      <h5>Immagine da caricare:</h5>
      <VueMagnifier :src="imagePreview" alt="Image Preview" class="img-thumbnail" />
    </div>
  </div>
</template>

        <template
          v-else-if="field.type == 'uploadPHP2' && field.edit !== 'false'"
        >
          <div :class="`col-md-${field.column}`">
            <form class="form-upload" @submit.prevent="uploadFile2">
              <label for="fileToUpload" class="form-label">{{
                field.label
              }}</label>
              <div class="input-group">
                <input
                  type="file"
                  name="fileToUpload"
                  id="fileToUpload"
                  class="form-control"
                  aria-label="Upload"
                  @change="handleFileChange"
                  required
                />
                <button type="submit" class="btn btn-primary">
                  Upload Image
                </button>
              </div>
              <p v-if="uploadStatus">{{ uploadStatus }}</p>
            </form>
            <div v-if="imagePreview" class="preview-container mt-3">
      <h5>Immagine da caricare:</h5>
      <VueMagnifier :src="imagePreview" alt="Image Preview" class="img-thumbnail" />
    </div>
          </div>
          <br />
          <br />
        </template>
        <!-- <template v-else-if="field.type == 'richtext'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <div>
              <label
                :for="`field-${field.name}`"
                class="form-label"
                v-html="field.label"
              ></label>
              <editor                 v-model="field.value"
                api-key="7vy8ie0rxcb6wxvm6pwpvw6pqh74qjoq3beib9fpf8gd9l75"
                :init="{height: 500,
                  menubar: false,
                  branding: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor ',
                    'searchreplace visualblocks  fullscreen',
                    'insertdatetime media table paste  help wordcount ',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic underline  forecolor backcolor | image link media  | \alignleft aligncenter alignright alignjustify table | \bullist numlist outdent indent | removeformat | help preview',
                }"
                :disabled="field.edit === 'false'" />
               
            </div>
          </div>
        </template> -->
        <template v-else-if="field.type == 'biglabel'">
          <h4 style="margin-top: 20px; margin-bottom: -20px">
            {{ field.label }}
          </h4>
        </template>

        <template v-else-if="field.type == 'textarea'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <label
              :for="`field-${field.name}`"
              class="form-label"
              v-html="field.label"
            ></label>
            <textarea
              :disabled="field.edit === 'false'"
              v-if="field.special == true"
              :type="field.type"
              style="background-color: lightyellow"
              :id="`field-${field.name}`"
              class="form-control"
              rows="5"
              v-model="field.value"
            ></textarea>

            <textarea
              v-else
              :type="field.type"
              :id="`field-${field.name}`"
              class="form-control"
              rows="5"
              v-model="field.value"
              :disabled="field.edit === 'false'"
            ></textarea>
          </div>
        </template>
        <template v-else-if="field.type == 'autocomplete'">
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <AutoComplete v-model="field.value" :field="field" />
          </div>
        </template>
        <template v-else>
          <div id="alignp-1" :class="`col-md-${field.column}`">
            <StandardInput v-model="field.value" :field="field" />
          </div>
        </template>
      </slot>
    </template>
    <!-- extra content in the body -->
    <slot :data="data" :fields="fields"></slot>
  </div>
  <!-- {{ data }} -->
  <!-- footer -->
  <slot name="footer" :data="data" :fields="fields"></slot>
</template>

<script setup>
import { toRefs, computed, ref } from "vue";
import VueMagnifier from "@websitebeaver/vue-magnifier";

import {
  ManyToMany,
  OneToMany,
  ManyToOne,
  Toggle,
  Checkbox,
  SelectDropdown,
  SelectSimple,
  Radio,
  File,
  Files,
  Image,
  Divider,
  StandardInput,
  ExternalLinkInput,
  Map,
  AutoComplete,
} from ".";
import Editor from "@tinymce/tinymce-vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import axios from "axios";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  fields: { type: Array, default: () => [] },
});
const { fields } = toRefs(props);
const imagePreview = ref(null);

const uploadStatus = ref("");
const selectedFile = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result; 
    };
    reader.readAsDataURL(file); 
  } else {
    imagePreview.value = null;
  }
  selectedFile.value = event.target.files[0];

};

const uploadFile = () => {
  const result = fields.value.find(field => field.name === 'route');

  if (!selectedFile.value) {
    uploadStatus.value = "Please select a file.";
    return;
  }

  const formData = new FormData();
  formData.append("fileToUpload", selectedFile.value);
  
  formData.append("route", result.__value);

  axios
    .post("/upload.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      uploadStatus.value = "File uploaded successfully!";
      const nomeImage = fields.value.find((field) => field.name === "image");
  if(nomeImage.value==null){nomeImage.value=''}
  console.log(nomeImage)
  nomeImage.value +='['+ selectedFile.value.name+']';
    })
    .catch((error) => {
      uploadStatus.value = "File upload failed.";
      console.error("Upload error:", error);
    });

    imagePreview.value=null
};
const uploadFile2 = () => {

  if (!selectedFile.value) {
    uploadStatus.value = "Please select a file.";
    return;
  }

  const formData = new FormData();
  formData.append("fileToUpload", selectedFile.value);
  
  formData.append("route", 'foto_digitales');

  axios
    .post("/upload.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      uploadStatus.value = "File uploaded successfully!";
      const nomeImage = fields.value.find((field) => field.name === "link");
  if(nomeImage.value==null){nomeImage.value=''}
  console.log(nomeImage)
  nomeImage.value = selectedFile.value.name
    })
    .catch((error) => {
      uploadStatus.value = "File upload failed.";
      console.error("Upload error:", error);
    });

    imagePreview.value=null

};


const data = () => {
  const onlyDirty = fields.value.filter((field) => field.dirty === true);
  const keyValuesList = onlyDirty.map((field) => [field.name, field.value]);
  return Object.fromEntries(keyValuesList);
};
</script>

<style scoped>
.form-upload {
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.form-upload .form-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group .form-control {
  margin-right: 10px;
}

.input-group .btn-primary {
  padding: 0.5rem 1rem;
}

@media (max-width: 768px) {
  .form-upload {
    padding: 10px;
  }

  .input-group {
    flex-direction: column;
    align-items: stretch;
  }

  .input-group .form-control,
  .input-group .btn-primary {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
.preview-container {
  margin-top: 15px;
}

.preview-container img {
  width: 120px;
  max-height: 120px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

</style>
