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
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { Country } from '@/types/SharedTypes';
import { COUNTRY_COORDINATES } from '@/types/SharedTypes';

// Non Reactive Variables
const aircrafts = AircraftService.getAircrafts();
const airlines = AirlineService.getAirlines();
const manufacturers = ref<ManufacturerInterface[]>([]);

onMounted(async () => {
  manufacturers.value = await ManufacturerService.getManufacturers();
});

// Reactive Variables
// Computed — AirCrafts
const totalAircrafts = computed(() => aircrafts.length);

const fleetHealth = computed(() => {
  const total = aircrafts.length;
  if (total === 0) return 0;
  const active = aircrafts.filter((a: AircraftInterface) => a.status === 'active').length;
  return Math.round((active / total) * 100 * 10) / 10;
});

const fleetPresenceMap = computed(() => {
  const map: Record<string, number> = {};
  aircrafts.forEach((a: AircraftInterface) => {
    map[a.manufacturerId] = (map[a.manufacturerId] ?? 0) + 1;
  });
  return map;
});

// Computed — Airline
const activeAirlines = computed(() => airlines.length);

const airlinesMapData = computed(() => {
  const countryMap: Partial<Record<Country, number>> = {};
  for (const airline of airlines) {
    const country = airline.country as Country;
    countryMap[country] = (countryMap[country] ?? 0) + 1;
  }
  const result = [];
  for (const [country, airlineCount] of Object.entries(countryMap)) {
    const coords = COUNTRY_COORDINATES[country as Country];
    if (!coords || airlineCount === undefined) continue;
    result.push({ country: country as Country, airlineCount, lat: coords.lat, lng: coords.lng });
  }
  return result;
});

// Computed — Manufacturer
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
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <DashboardStatsGridComponent
          :total-aircrafts="totalAircrafts"
          :active-airlines="activeAirlines"
          :manufacturers="manufacturersCount"
          :fleet-health="fleetHealth"
        />
        <DashboardMapComponent :map-data="airlinesMapData" />
      </div>
      <div
        class="hidden lg:flex flex-col w-80 overflow-y-auto border-l border-neutral-100/40 p-5 gap-6 bg-white-100"
      >
        <div class="border-t border-neutral-100/50"></div>
        <DashboardManufacturersComponent :manufacturers="topManufacturers" />
      </div>
    </div>
  </div>
</template>
