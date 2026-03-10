<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { Chart, registerables } from 'chart.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';

// Props
const props = defineProps<{
  marketShareData: { name: string; value: number }[];
  productionVolumeData: { name: string; value: number }[];
  totalProductionVolume: number;
}>();

// Reactive variables
const marketShareCanvas = ref<HTMLCanvasElement | null>(null);
const productionVolumeCanvas = ref<HTMLCanvasElement | null>(null);

// Non-reactive variables
Chart.register(...registerables);
let marketShareChart: Chart | null = null;
let productionVolumeChart: Chart | null = null;

const CHART_COLOR = '#003b36';
const CHART_COLOR_HOVER = '#e98a15';

// Functions
function buildChart(
  canvas: HTMLCanvasElement,
  labels: string[],
  data: number[],
  color: string,
): Chart {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: color,
          hoverBackgroundColor: CHART_COLOR_HOVER,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#0b1c1a', font: { size: 10 } },
        },
        y: {
          display: false,
          grid: { display: false },
        },
      },
    },
  });
}

function initCharts(): void {
  if (marketShareCanvas.value) {
    marketShareChart?.destroy();
    marketShareChart = buildChart(
      marketShareCanvas.value,
      props.marketShareData.map((d) => d.name),
      props.marketShareData.map((d) => d.value),
      CHART_COLOR,
    );
  }

  if (productionVolumeCanvas.value) {
    productionVolumeChart?.destroy();
    productionVolumeChart = buildChart(
      productionVolumeCanvas.value,
      props.productionVolumeData.map((d) => d.name),
      props.productionVolumeData.map((d) => d.value),
      CHART_COLOR,
    );
  }
}

// Watchers
watch(
  () => [props.marketShareData, props.productionVolumeData],
  () => initCharts(),
  { deep: true },
);

onMounted(() => initCharts());

onUnmounted(() => {
  marketShareChart?.destroy();
  productionVolumeChart?.destroy();
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Global Market Share -->
    <div class="bg-white-100 rounded-xl border border-neutral-100/40 shadow-sm p-4">
      <div class="flex items-start justify-between mb-1">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-black-800/40 font-semibold">
            Global Market Share (%)
          </p>
          <p class="text-3xl font-bold text-black-800 mt-1">100%</p>
        </div>
      </div>
      <div style="height: 100px">
        <canvas ref="marketShareCanvas"></canvas>
      </div>
    </div>

    <!-- Production Volume -->
    <div class="bg-white-100 rounded-xl border border-neutral-100/40 shadow-sm p-4">
      <div class="flex items-start justify-between mb-1">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-black-800/40 font-semibold">
            Production Volume (Units)
          </p>
          <p class="text-3xl font-bold text-black-800 mt-1">
            {{ totalProductionVolume.toLocaleString() }}
          </p>
        </div>
      </div>
      <div style="height: 100px">
        <canvas ref="productionVolumeCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
