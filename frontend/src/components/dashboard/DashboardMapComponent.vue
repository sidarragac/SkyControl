<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';

// Props
const props = defineProps<{
  mapData: { country: string; airlineCount: number; lat: number; lng: number }[];
}>();

// Non-reactive variables
let mapInstance: LeafletMap | null = null;

// Reactive variables
const mapContainer = ref<HTMLDivElement | null>(null);
const hubSearch = ref('');
const isMapLoading = ref(true);

// Functions
async function initMap(): Promise<void> {
  if (!mapContainer.value) return;

  mapInstance = L.map(mapContainer.value, {
    center: [20, 10],
    zoom: 2,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance);

  renderMarkers();
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
  isMapLoading.value = false;
}

function renderMarkers(): void {
  if (!mapInstance) return;

  const filtered = props.mapData.filter(
    (d) =>
      hubSearch.value === '' || d.country.toLowerCase().includes(hubSearch.value.toLowerCase()),
  );

  filtered.forEach((point) => {
    const icon = L.divIcon({
      className: '',
      html: `
        <div style="
          background: #e98a15;
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 2px solid #fafafa;
          box-shadow: 0 0 8px rgba(233,138,21,0.7);
        "></div>
      `,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });

    const marker = L.marker([point.lat, point.lng], { icon }).addTo(mapInstance!);

    const tooltip = L.tooltip({
      permanent: true,
      direction: 'top',
      offset: [0, -8],
      className: 'hub-tooltip',
    })
      .setContent(
        `<span style="font-size:10px;font-weight:700;color:#111827">${point.country}: ${point.airlineCount} airline${point.airlineCount > 1 ? 's' : ''}</span>`,
      )
      .setLatLng([point.lat, point.lng]);

    mapInstance!.addLayer(tooltip);
    marker.bindPopup(
      `<b>${point.country}</b><br/>${point.airlineCount} airline${point.airlineCount > 1 ? 's' : ''}`,
    );
  });
}

async function refreshMarkers(): Promise<void> {
  if (!mapInstance) return;
  const L = await import('leaflet');
  mapInstance.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Tooltip) {
      mapInstance!.removeLayer(layer);
    }
  });
  renderMarkers();
}

// Watchers
watch(hubSearch, (): void => {
  refreshMarkers();
});

watch(
  () => props.mapData,
  (): void => {
    refreshMarkers();
  },
  { deep: true },
);

onMounted((): void => {
  initMap();
});

onUnmounted((): void => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<template>
  <div class="bg-white-100 rounded-xl shadow-sm border border-neutral-100/40 flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-100/40">
      <h3 class="text-sm font-bold text-black-800">Global Airlines Distribution</h3>
    </div>

    <!-- Search -->
    <div class="px-5 pt-3 pb-2">
      <div class="relative">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-black-800/30 text-xs pointer-events-none"
        ></i>
        <input
          v-model="hubSearch"
          type="text"
          placeholder="Search by country code (e.g. US, CA)"
          class="w-full bg-white-200 text-black-800 text-sm rounded-lg pl-8 pr-4 py-2 border border-neutral-100 focus:outline-none focus:border-primary-700 placeholder:text-black-800/40"
        />
      </div>
    </div>

    <!-- Map -->
    <div class="relative mx-5 mb-5 rounded-lg overflow-hidden h-[420px]">
      <div
        v-if="isMapLoading"
        class="absolute inset-0 bg-primary-900/10 flex items-center justify-center z-10 rounded-lg"
      >
        <i class="fas fa-spinner fa-spin text-primary-900 text-xl"></i>
      </div>
      <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.hub-tooltip) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 2px 4px !important;
}

:deep(.hub-tooltip::before) {
  display: none !important;
}
</style>
