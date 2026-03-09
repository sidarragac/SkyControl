<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';
import { onMounted, ref, watch } from 'vue';

// Internal Imports
import { ColorGeneratorUtil } from '@/utils/ColorGeneratroUtil';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Interfaces
interface Props {
  name: string;
  data: {
    model: string;
    count: number;
  }[];
}

// Props
const props = defineProps<Props>();

// Non-reactive variables
let chartInstance: Chart | null = null;
const dataLength: number = props.data.length;

// Reactive variables
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Functions
function renderChart() {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.data.map((d) => d.model),
      datasets: [
        {
          data: props.data.map((d) => d.count),
          backgroundColor: ColorGeneratorUtil.generateColors(dataLength),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}

onMounted(renderChart);

watch(
  () => props.data,
  () => {
    renderChart();
  },
  { deep: true },
);
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-lg p-4">
    <h3 class="text-lg font-semibold mb-4">
      {{ props.name }}
    </h3>

    <canvas ref="canvasRef"></canvas>
  </div>
</template>
