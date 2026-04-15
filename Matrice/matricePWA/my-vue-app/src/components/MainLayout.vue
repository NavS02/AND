<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
const route = useRoute();
const router = useRouter();

const currentLanguage = ref("italiano");
const currentTranslations = ref({});
const sidebarOpen = ref(false);
const dropdownOpen = ref(false);
let hasLoadedTranslations = false;
const viewKey = ref(0); 


const loadTranslations = async () => {
  try {
    let data;

    const stored = localStorage.getItem("translations");
    if (stored) {
      data = JSON.parse(stored);
    } else {
      const response = await fetch("/translations.json");
      data = await response.json();
      localStorage.setItem("translations", JSON.stringify(data));
    }

    currentLanguage.value = route.params.lingua || "italiano";
    currentTranslations.value = data[currentLanguage.value];
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

watch(
  () => route.params.lingua,
  async (newLang, oldLang) => {
    if (newLang !== oldLang) {
      await loadTranslations();
    }
  },
  { immediate: true }
);



onMounted(() => {
  currentLanguage.value = route.params.lingua || "italiano";

  const storedTranslations = localStorage.getItem("translations");
  if (storedTranslations) {
    const parsed = JSON.parse(storedTranslations);
    currentTranslations.value = parsed[currentLanguage.value];
  } else {
    loadTranslations();
  }
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const changeLingua = async (lingua) => {
  localStorage.setItem("language", lingua);

  await router.push({ name: "HomePage", params: { lingua } });

  await loadTranslations();

  toggleSidebar();
  dropdownOpen.value = false;
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
function goToHomePage() {
  router.push({ name: "HomePage", params: { lingua: currentLanguage.value } });
  toggleSidebar();
}

function goToMap() {
  router.push({ name: "Mappa", params: { lingua: currentLanguage.value } });
  toggleSidebar();
}
function goToInformazione() {
  router.push({ name: "Informazione", params: { lingua: currentLanguage.value } });
  toggleSidebar();
}function goToCredits() {
  router.push({ name: "Crediti", params: { lingua: currentLanguage.value } });
  toggleSidebar();
}
function goToStoria() {
  router.push({
    name: "Informazione",
    params: { lingua: currentLanguage.value },
  });
  toggleSidebar();
}
</script>

<template>
  <div>
    <div
      v-if="route.name !== 'SelectLingua'"
      class="fixed-icon"
      @click="toggleSidebar"
    >
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 17H20M4 12H20M4 7H20"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Sidebar -->
    <div
      :class="['sidebar', { 'sidebar-open': sidebarOpen }]"
      v-if="currentTranslations"
    >
      <div class="sidebar-header">
        <button
          class="close-btn"
          style="background-color: transparent !important"
          @click="toggleSidebar"
        >
          ✖
        </button>
      </div>
      <div class="sidebar-menu">
        <div style="text-align: center">
          <img
            src="/logoFioreI.svg"
            alt="IMAGE"
            class="main-image"
            style="width: 200px"
          />

          <div style="position: relative; margin-top: 10px">
            <div
              @click="toggleDropdown"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
              "
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8" stroke="#222222" />
                <path
                  d="M18.2075 6.78485C17.4747 7.46088 16.5544 8.00912 15.5106 8.39144C14.4668 8.77376 13.3244 8.981 12.163 8.99875C11.0016 9.01651 9.84894 8.84434 8.7852 8.49423C7.72146 8.14412 6.77215 7.62447 6.00325 6.97139"
                  stroke="#222222"
                />
                <path
                  d="M18.3222 17.3235C17.5826 16.608 16.6367 16.0274 15.5553 15.6251C14.474 15.2227 13.2853 15.0091 12.0783 15.0003C10.8713 14.9914 9.67723 15.1875 8.58561 15.5739C7.494 15.9603 6.53311 16.5269 5.77495 17.2314"
                  stroke="#222222"
                />
                <path d="M12 4V20" stroke="#222222" />
                <path d="M20 12H4" stroke="#222222" />
              </svg>

              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                  fill="#0F0F0F"
                />
              </svg>

              <span style="font-size: 18px; text-transform: capitalize">{{
                route.params.lingua
              }}</span>
            </div>

            <div
              v-if="dropdownOpen"
              style="
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                margin-top: 5px;
                z-index: 10;
              "
            >
              <div
                @click="changeLingua('italiano')"
                style="padding: 8px 16px; cursor: pointer"
              >
                Italiano
              </div>
              <div
                @click="changeLingua('english')"
                style="padding: 8px 16px; cursor: pointer"
              >
                English
              </div>
            </div>
          </div>
        </div>

        <ul>
          <li @click="goToHomePage()">{{ currentTranslations.torna_home }}</li>
          <li @click="goToMap()">{{ currentTranslations.mappa }}</li>
          <li @click="goToStoria()">{{ currentTranslations.storia }}</li>
          <li @click="goToInformazione()">  {{ currentTranslations.informazione }}</li>
          <li @click="goToCredits()">{{ currentTranslations.crediti }}</li>
        </ul>
      </div>
    </div>

    <router-view :key="viewKey" />
  </div>
</template>

<style scoped>
.fixed-icon {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  cursor: pointer;
}

/* Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 2000;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: flex-start;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin-top: 40px;
}

.sidebar-menu li {
  margin: 20px 0;
}

.sidebar-menu a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}
</style>
