<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { Map as LeafletMap } from 'leaflet';

// Non-reactive variables
const mapContainer = ref<HTMLDivElement | null>(null);
let mapInstance: LeafletMap | null = null;

const hubMarkers = [
  { name: 'JFK', lat: 40.6413, lng: -73.7781, count: 1240 },
  { name: 'LHR', lat: 51.477, lng: -0.4613, count: 2102 },
  { name: 'DXB', lat: 25.2532, lng: 55.3657, count: 890 },
  { name: 'HND', lat: 35.5494, lng: 139.7798, count: 650 },
  { name: 'CDG', lat: 49.0097, lng: 2.5479, count: 980 },
  { name: 'SIN', lat: 1.3644, lng: 103.9915, count: 720 },
];

// Reactive variables
const mapFilter = ref<'regions' | 'airline'>('regions');
const hubSearch = ref('');
const isMapLoading = ref(true);

// Functions
async function initMap(): Promise<void> {
  if (!mapContainer.value) return;

  const L = await import('leaflet');
  await import('leaflet/dist/leaflet.css');

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

  renderMarkers(L);
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
  isMapLoading.value = false;
}

function renderMarkers(L: typeof import('leaflet')): void {
  if (!mapInstance) return;

  const filtered = hubMarkers.filter(
    (h) => hubSearch.value === '' || h.name.toLowerCase().includes(hubSearch.value.toLowerCase()),
  );

  filtered.forEach((hub) => {
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

    const marker = L.marker([hub.lat, hub.lng], { icon }).addTo(mapInstance!);

    const tooltip = L.tooltip({
      permanent: true,
      direction: 'top',
      offset: [0, -8],
      className: 'hub-tooltip',
    })
      .setContent(
        `<span style="font-size:10px;font-weight:700;color:#111827">${hub.name}: ${hub.count.toLocaleString()}</span>`,
      )
      .setLatLng([hub.lat, hub.lng]);

    mapInstance!.addLayer(tooltip);
    marker.bindPopup(`<b>${hub.name}</b><br/>${hub.count.toLocaleString()} aircraft`);
  });
}

// Watchers
watch(hubSearch, async () => {
  if (!mapInstance) return;
  const L = await import('leaflet');
  mapInstance.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Tooltip) {
      mapInstance!.removeLayer(layer);
    }
  });
  renderMarkers(L);
});

onMounted(() => {
  initMap();
});

onUnmounted(() => {
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
      <h3 class="text-sm font-bold text-black-800">Global Aircraft Distribution</h3>
      <div class="flex gap-2">
        <button
          @click="mapFilter = 'regions'"
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
            mapFilter === 'regions'
              ? 'bg-primary-900 text-white-100'
              : 'bg-neutral-100/60 text-black-800/60 hover:bg-neutral-100',
          ]"
        >
          All Regions
        </button>
        <button
          @click="mapFilter = 'airline'"
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
            mapFilter === 'airline'
              ? 'bg-primary-900 text-white-100'
              : 'bg-neutral-100/60 text-black-800/60 hover:bg-neutral-100',
          ]"
        >
          By Airline
        </button>
      </div>
    </div>

    <!-- Hub Search -->
    <div class="px-5 pt-3 pb-2">
      <div class="relative">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-black-800/30 text-xs pointer-events-none"
        ></i>
        <input
          v-model="hubSearch"
          type="text"
          placeholder="Search hubs (e.g. Heathrow)"
          class="w-full bg-white-200 text-black-800 text-sm rounded-lg pl-8 pr-4 py-2 border border-neutral-100 focus:outline-none focus:border-primary-700 placeholder:text-black-800/40"
        />
      </div>
    </div>

    <!-- Map -->
    <div class="relative mx-5 mb-5 rounded-lg overflow-hidden" style="height: 300px">
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
