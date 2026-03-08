<!-- Developed by Santiago Idárraga Ceballos-->
<script setup lang="ts">
// External imports
import { onMounted, watch, ref } from 'vue';
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  name: string;
  data: {
    airline: string;
    aircraftCount: number;
  }[];
}

const props = defineProps<Props>();

let chartInstance: Chart | null = null;


// Reactive variables
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Functions
function renderChart(): void {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'polarArea',
    data: {
      labels: props.data.map(d => d.airline),
      datasets: [
        {
          data: props.data.map(d => d.aircraftCount),
          backgroundColor: [ '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#14b8a6' ]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

onMounted(renderChart);

watch(
  () => props.data,
  () => {
    renderChart();
  },
  { deep: true }
);
</script>

<template>
  <div class="bg-white p-4 rounded-lg border border-slate-200">
    <h3 class="text-lg font-semibold mb-4">{{ props.name }}</h3>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>