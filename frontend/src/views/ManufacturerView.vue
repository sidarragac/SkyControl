<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref, watch } from 'vue';
// Internal imports
import { AircraftService } from '@/services/AircraftService';
import ManufacturerCardComponent from '@/components/manufacturers/ManufacturerCardComponent.vue';
import ManufacturerChartsComponent from '@/components/manufacturers/ManufacturerChartsComponent.vue';
import ManufacturerPaginationComponent from '@/components/manufacturers/ManufacturerPaginationComponent.vue';
import ManufacturerSearchBarComponent from '@/components/manufacturers/ManufacturerSearchBarComponent.vue';
import { ManufacturerService } from '@/services/ManufacturerService';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';

// Non-reactive variables
const PAGE_SIZE = 6;
const aircrafts = AircraftService.getAircrafts();

// Reactive variables
const manufacturers = ref<ManufacturerInterface[]>([]);
const search = ref('');
const selectedCountry = ref('All Countries');
const currentPage = ref(1);

// Computed — dashboard charts
const marketShareData = computed(() => {
  const total = Object.values(fleetPresenceMap.value).reduce((a, b) => a + b, 0) || 1;
  return manufacturers.value.map((m) => ({
    name: m.name.split(' ')[0] ?? m.name,
    value: Math.round(((fleetPresenceMap.value[m.id] ?? 0) / total) * 100 * 10) / 10,
  }));
});

const fleetPresenceMap = computed(() => {
  const map: Record<string, number> = {};
  aircrafts.forEach((a) => {
    map[a.manufacturerId] = (map[a.manufacturerId] ?? 0) + 1;
  });
  return map;
});

const productionVolumeData = computed(() =>
  manufacturers.value.map((m) => ({
    name: m.name.split(' ')[0] ?? m.name,
    value: fleetPresenceMap.value[m.id] ?? 0,
  })),
);

const totalProductionVolume = computed(() =>
  Object.values(fleetPresenceMap.value).reduce((a, b) => a + b, 0),
);

// Computed — filters
const countryOptions = computed(() => {
  const countries = manufacturers.value.map((m) => m.country);
  return ['All Countries', ...Array.from(new Set(countries)).sort()];
});

const filteredManufacturers = computed(() =>
  manufacturers.value.filter((m) => {
    const matchesSearch =
      search.value === '' ||
      m.name.toLowerCase().includes(search.value.toLowerCase()) ||
      m.country.toLowerCase().includes(search.value.toLowerCase());
    const matchesCountry =
      selectedCountry.value === 'All Countries' || m.country === selectedCountry.value;
    return matchesSearch && matchesCountry;
  }),
);

// Computed — pagination
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredManufacturers.value.length / PAGE_SIZE)),
);

const paginatedManufacturers = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return filteredManufacturers.value.slice(start, start + PAGE_SIZE);
});

const fleetPresence = computed(() => fleetPresenceMap.value);

// Watchers
watch([search, selectedCountry], (): void => {
  currentPage.value = 1;
});

// Lifecycle
onMounted(async () => {
  manufacturers.value = await ManufacturerService.getManufacturers();
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <ManufacturerChartsComponent
        :market-share-data="marketShareData"
        :production-volume-data="productionVolumeData"
        :total-production-volume="totalProductionVolume"
      />
      <ManufacturerSearchBarComponent
        :search="search"
        :selected-country="selectedCountry"
        :country-options="countryOptions"
        @update:search="search = $event"
        @update:selected-country="selectedCountry = $event"
      />
      <div
        v-if="paginatedManufacturers.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <ManufacturerCardComponent
          v-for="manufacturer in paginatedManufacturers"
          :key="manufacturer.id"
          :manufacturer="manufacturer"
          :fleet-presence="fleetPresence[manufacturer.id] ?? 0"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-14 h-14 rounded-full bg-primary-900/10 flex items-center justify-center mb-3">
          <i class="fas fa-industry text-primary-900 text-xl"></i>
        </div>
        <p class="text-sm font-semibold text-black-800">No manufacturers found</p>
        <p class="text-xs text-black-800/40 mt-1">Try adjusting your search or filters</p>
      </div>
      <ManufacturerPaginationComponent
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="currentPage = $event"
      />
    </div>
  </div>
</template>
