<!-- Developed by Juan Jara -->
<script setup lang="ts">
// External imports
import { computed, ref, watch } from 'vue';

// Internal imports
import { AircraftService } from '@/services/AircraftService';
import ManufacturerCardComponent from '@/components/manufacturers/ManufacturerCardComponent.vue';
import ManufacturerChartsComponent from '@/components/manufacturers/ManufacturerChartsComponent.vue';
import ManufacturerPaginationComponent from '@/components/manufacturers/ManufacturerPaginationComponent.vue';
import ManufacturerSearchBarComponent from '@/components/manufacturers/ManufacturerSearchBarComponent.vue';
import { ManufacturerService } from '@/services/ManufacturerService';

// Non-reactive variables
const PAGE_SIZE = 6;

// Reactive variables
const search = ref('');
const selectedCountry = ref('All Countries');
const currentPage = ref(1);
const fleetPresence = computed(() => fleetPresenceMap.value);

const fleetPresenceMap = AircraftService.getFleetPresenceMap();
const marketShareData = ManufacturerService.getMarketShareData(fleetPresenceMap);
const productionVolumeData = ManufacturerService.getProductionVolumeData(fleetPresenceMap);
const totalProductionVolume = ManufacturerService.getTotalProductionVolume(fleetPresenceMap);
const countryOptions = ManufacturerService.getCountryOptions();
const filteredManufacturers = ManufacturerService.getFilteredManufacturers(
  search,
  selectedCountry,
  fleetPresenceMap,
);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredManufacturers.value.length / PAGE_SIZE)),
);
const paginatedManufacturers = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return filteredManufacturers.value.slice(start, start + PAGE_SIZE);
});

// Watchers
watch([search, selectedCountry], (): void => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Top Bar -->
    <header
      class="flex items-center justify-between px-6 py-3 bg-white-100 border-b border-neutral-100/40 shadow-sm sticky top-0 z-10"
    >
      <div>
        <p class="text-[11px] text-black-800/40 font-medium">
          Dashboard &rsaquo;
          <span class="text-primary-900 font-semibold">Manufacturers</span>
        </p>
        <h2 class="text-base font-bold text-black-800 leading-tight">Aircraft Manufacturers</h2>
        <p class="text-[11px] text-black-800/50 mt-0.5">
          Global market insights and manufacturer directory
        </p>
      </div>
    </header>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <!-- Charts -->
      <ManufacturerChartsComponent
        :market-share-data="marketShareData"
        :production-volume-data="productionVolumeData"
        :total-production-volume="totalProductionVolume"
      />

      <!-- Search & Filters -->
      <ManufacturerSearchBarComponent
        :search="search"
        :selected-country="selectedCountry"
        :country-options="countryOptions"
        @update:search="search = $event"
        @update:selected-country="selectedCountry = $event"
      />

      <!-- Cards Grid -->
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

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-14 h-14 rounded-full bg-primary-900/10 flex items-center justify-center mb-3">
          <i class="fas fa-industry text-primary-900 text-xl"></i>
        </div>
        <p class="text-sm font-semibold text-black-800">No manufacturers found</p>
        <p class="text-xs text-black-800/40 mt-1">Try adjusting your search or filters</p>
      </div>

      <!-- Pagination -->
      <ManufacturerPaginationComponent
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="currentPage = $event"
      />

      <!-- Footer -->
      <footer class="text-center text-[11px] text-black-800/30 pt-2 pb-1">
        © {{ new Date().getFullYear() }} SkyControl System. All rights reserved.
      </footer>
    </div>
  </div>
</template>
