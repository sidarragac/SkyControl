<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';

// Internal imports
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';
import DashboardManufacturersComponent from '@/components/dashboard/DashboardManufacturersComponent.vue';
import DashboardMapComponent from '@/components/dashboard/DashboardMapComponent.vue';
import DashboardStatsGridComponent from '@/components/dashboard/DashboardStatsGridComponent.vue';
import { ManufacturerService } from '@/services/ManufacturerService';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';

// Selectors
const totalAircrafts = AircraftService.getTotalAircrafts();
const activeAirlines = AirlineService.getActiveAirlinesCount();
const fleetHealth = AircraftService.getFleetHealth();
const fleetPresenceMap = AircraftService.getFleetPresenceMap();
const airlinesMapData = AirlineService.getAirlinesMapData();

// Reactive Variables
const manufacturers = ref<ManufacturerInterface[]>([]);

onMounted(async () => {
  manufacturers.value = await ManufacturerService.getManufacturers();
});

const manufacturersCount = computed(() => manufacturers.value.length);

const topManufacturers = computed(() =>
  manufacturers.value
    .map((m) => ({ name: m.name, count: fleetPresenceMap.value[m.id] ?? 0 }))
    .filter((m) => m.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4),
);
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left column -->
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <DashboardStatsGridComponent
          :total-aircrafts="totalAircrafts"
          :active-airlines="activeAirlines"
          :manufacturers="manufacturersCount"
          :fleet-health="fleetHealth"
        />
        <DashboardMapComponent :map-data="airlinesMapData" />
      </div>

      <!-- Right column -->
      <div
        class="hidden lg:flex flex-col w-80 overflow-y-auto border-l border-neutral-100/40 p-5 gap-6 bg-white-100"
      >
        <div class="border-t border-neutral-100/50"></div>
        <DashboardManufacturersComponent :manufacturers="topManufacturers" />
      </div>
    </div>
  </div>
</template>
