<template>
  <main id="main" class="main">
    <div v-if="loaded">
    
      <!-- SAVE ALERT! -->
      <div
        class="succesAlert alert alert-success"
        role="alert"
        v-if="showAlert"
      >
        Saved!
      </div>
     
      <!-- FORM WITH THE DATA -->
      <Form :fields="fields">
        <template v-slot:footer="{ data, fields }">
          
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" id="tableName">Nome</th>
                <th scope="col" id="add"> <font-awesome-icon icon="fa-solid fa-plus" /> </th>

                <th scope="col" id="view"> <font-awesome-icon icon="eye" /> </th>
                <th scope="col" id="edit"><font-awesome-icon icon="pen-ruler" /></th>
                <th scope="col" id="cancel"><font-awesome-icon icon="trash" /></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableNames" :key="item.id">
                <th scope="row">{{item.collection}}</th>
                <td>
                  <button class="btn btn-transparent" @click="changePermission('create', item)" :style="{ color: item.permission.includes('create') ? '#008000' : '#ff0000', padding: 0, margin: 0, textAlign: 'left' }">
                    <font-awesome-icon
                    :icon="item.permission.includes('create') ? 'check' : 'ban'"
                    
                  />
                  </button>

                 </td>
                <td> 
                  <button class="btn btn-transparent" @click="changePermission('read', item)" :style="{ color: item.permission.includes('read') ? '#008000' : '#ff0000', padding: 0, margin: 0, textAlign: 'left' }">
                    <font-awesome-icon
                  :icon="item.permission.includes('read') ? 'check' : 'ban'"
                />
                  </button></td>
               
                <td>
                  <button class="btn btn-transparent" @click="changePermission('update', item)" :style="{ color: item.permission.includes('update') ? '#008000' : '#ff0000', padding: 0, margin: 0, textAlign: 'left' }">
                    <font-awesome-icon
                  :icon="item.permission.includes('update') ? 'check' : 'ban'"
                />
                  </button></td>
                <td>
                  <button class="btn btn-transparent" @click="changePermission('delete', item)" :style="{ color: item.permission.includes('delete') ? '#008000' : '#ff0000', padding: 0, margin: 0, textAlign: 'left' }">
                    <font-awesome-icon
                  :icon="item.permission.includes('delete') ? 'check' : 'ban'"
                />
                  </button></td>
              </tr>
             
              
            </tbody>
          </table>
          <div class="buttons">
            <button class="btn btn-sm btn-secondary" @click="onCancelClicked()">
              <font-awesome-icon icon="fa-solid fa-xmark" fixed-width />
              <span class="ms-1">Cancel</span>
            </button>
            <button class="btn btn-sm btn-primary" @click="onSaveClicked(data)">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" fixed-width />
              <span class="ms-1">Salva</span>
            </button>
           
            
          </div>
          
        </template>
      </Form>
    </div>
    <Loader v-if="!loaded" style="text-align: center; margin-top: 50%" />
  </main>
</template>

<script setup>
import { ref, watch, toRefs, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { directus } from "../../API";
import * as settings from "../../settings/";
import Form from "../common/Form/Form.vue";
import ItemsNavigation from "./ItemsNavigation.vue";
import store from "../../../store";
import Loader from "../common/Loader.vue";
const toaster = inject("$toaster");
const modal = inject("$modalManager");
const url = ref("/not-found.svg");

const props = defineProps({
  id: { type: String, default: null },
});
const { id } = toRefs(props);
const collection = ref("directus_roles");
const route = useRoute();
const router = useRouter();
const image = ref();
const loaded = ref(false);
const fields = ref([]); // fields settings
const showAlert = ref(false);
const tableNames=ref()
const permissions=ref()
// watch the route and update data based on the collection param
watch(
  route,
  async () => {
    fields.value = null;
    // retrieve the settings
    const itemSettings = settings[collection.value];
    // define the subset of fields you need to view in the table
    const collectionFields = itemSettings.fields();

    // use an instant timeout to make sure the item will update
    setTimeout(async () => {
      const data = await store.collections.fetchOne(
        collection.value,
        id.value,
        true
      );
      for (const field of collectionFields) {
        await field.setInitialValue(data?.[field.name]);
      }
      fields.value = collectionFields;
      loaded.value = true;
      loadTables()
    }, 0);
  },
  { immediate: true, deep: true }
);
async function changePermission(permission,table){
  if(table.permission.includes(permission)){
    let activeFilter= permissions.value.data.filter(item => {
    return item.collection==table.collection && item.action == permission;
});
await directus.items('directus_permissions').deleteOne(activeFilter[0].id)


  }else{
    console.log('Permission not active')
  const response = await directus.items('directus_permissions').createOne({

    fields:['*'],
    collection: table.collection,
    action: permission,
    role:id.value,

  })
 permissions.value = await directus.items("directus_permissions").readByQuery({   limit: -1,
      filter: {
        role: {
          _eq: id.value,
        },
      },
    })
   
  console.log(permissions.value.data)
  }
  loadTables()
 


}
async function onCancelClicked() {
  const confirmed = await modal.confirm({
    title: "Confirma",
    body: "Sei sicuro di voler lasciare questa pagina?",
  });
  if (!confirmed) return;
  goToList();
}
function onSaveClicked(data) {
  save(data());
}
function goToList() {
  router.push({ name: "userArc" });
}

async function loadTables(){
   permissions.value = await directus.items("directus_permissions").readByQuery({   limit: -1,
      filter: {
        role: {
          _eq: id.value,
        },
      },
    })
   
  console.log(permissions.value.data)
  let response2 = await directus.items("directus_collections").readByQuery()

console.log(response2.data);
tableNames.value = response2.data.filter(item => !item.collection.startsWith('directus_'));

tableNames.value.forEach(table => {
  table.permission=[]
  permissions.value.data.forEach(permission => {
  if (table.collection === permission.collection) {
    table.permission.push(permission.action);
  }    
  });
});
console.log(tableNames.value)
}
async function save(data) {
  try {
    const response = await directus
      .items(collection.value)
      .updateOne(id.value, data);
  
    // ALERT
    showAlert.value = true;
    setTimeout(function () {
      showAlert.value = false;
    }, 3000);
  } catch (error) {
    console.error(error);
    toaster.toast({ title: "Error", body: error }, "top right");
  }
}
// WHEN THE OPERA IS SAVED EDIT THE INFO IN THE APP AND TOUCH



</script>

<style scoped>
/* SAVE AND CANCEL BUTTON */
.buttons {
  display: flex;
  gap: 5px;
}
/* IMAGE */
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.succesAlert {
  width: 25%;
  text-align: center;

  position: fixed;
  right: 0;
}
</style>
../../settings
