<!-- Developed by Santiago Idárraga -->
<script setup lang="ts">
// External imports
import {
  ArcElement,
  Chart,
  Legend,
  PolarAreaController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { onMounted, ref, watch } from 'vue';

// Internal Imports
import { ColorGeneratorUtil } from '@/utils/ColorGeneratroUtil';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

// Interfaces
interface Props {
  name: string;
  data: {
    airline: string;
    aircraftCount: number;
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
function renderChart(): void {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'polarArea',
    data: {
      labels: props.data.map((d) => d.airline),
      datasets: [
        {
          data: props.data.map((d) => d.aircraftCount),
          backgroundColor: ColorGeneratorUtil.generateColors(dataLength),
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

// Watchers
watch(
  () => props.data,
  () => {
    renderChart();
  },
  { deep: true },
);

onMounted(renderChart);
</script>

<template>
  <div class="bg-white-100 p-4 rounded-lg border border-neutral-100 mb-6">
    <h3 class="text-lg font-semibold text-black-900 mb-4">{{ props.name }}</h3>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
