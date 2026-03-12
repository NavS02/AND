<template>
  <main id="main" class="main">
    <canvas id="barChart"></canvas>
  </main>
  <hr />
  <main id="main" class="main">
    <br />
    <div style="margin-top: 60px">
      <iframe
        src="https://milanopwa.ambientinarratividigitali.it"
        width="390"
        height="800"
      ></iframe>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart } from "chart.js/auto";
import { directus } from "../../API/";

const chart = ref(null);
const analytics = ref(null);

const fetchChartData = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const data = transformDataForChart(analytics.value, currentYear);

    const ctx = document.getElementById("barChart").getContext("2d");
    chart.value = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
};

const transformDataForChart = (data, currentYear) => {
  const labels = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];
  const datasets = [
    {
      label: `Utenti (${currentYear})`,
      data: Array(12).fill(0),
    },
  ];

  analytics.value.forEach((item) => {
    const monthIndex = labels.indexOf(item.month);
    if (monthIndex !== -1) {
      datasets[0].data[monthIndex] = item.visits;
    }
  });

  return { labels: labels, datasets: datasets };
};

async function getAnalytics() {
  const currentYear = new Date().getFullYear();

  const analyticsResponse = await directus.items("app_analytics").readByQuery({
    limit: 12,
    filter: { year: { _eq: currentYear } },
  });
  analytics.value = analyticsResponse.data;
  fetchChartData();
}

onMounted(() => {
  getAnalytics();
});
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Reduced by half */
}
</style>
