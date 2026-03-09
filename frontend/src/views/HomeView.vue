<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import DashboardActivityComponent from '@/components/dashboard-components/DashboardActivityComponent.vue';
import DashboardManufacturersComponent from '@/components/dashboard-components/DashboardManufacturersComponent.vue';
import DashboardMapComponent from '@/components/dashboard-components/DashboardMapComponent.vue';
import DashboardStatsGridComponent from '@/components/dashboard-components/DashboardStatsGridComponent.vue';
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';
import { ManufacturerService } from '@/services/ManufacturerService';
import { UserService } from '@/services/UserService';

// Selectors
const loggedInUser = computed(() => UserService.getLoggedInUser());
const totalAircrafts = AircraftService.getTotalAircrafts();
const activeAirlines = AirlineService.getActiveAirlinesCount();
const manufacturersCount = ManufacturerService.getManufacturersCount();
const fleetHealth = AircraftService.getFleetHealth();
const fleetPresenceMap = AircraftService.getFleetPresenceMap();
const topManufacturers = ManufacturerService.getTopManufacturers(fleetPresenceMap);
const recentActivity = AircraftService.getRecentActivity();
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Top Bar -->
    <header
      class="flex items-center justify-between px-6 py-3 bg-white-100 border-b border-neutral-100/40 shadow-sm sticky top-0 z-10"
    >
      <h2 class="text-base font-bold text-black-800">Dashboard Home</h2>

      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="relative hidden md:flex items-center">
          <i
            class="fas fa-search absolute left-3 text-black-800/40 text-xs pointer-events-none"
          ></i>
          <input
            type="text"
            placeholder="Search aircraft, registrations, or hubs..."
            class="bg-white-200 text-black-800 text-sm rounded-full pl-8 pr-4 py-2 w-72 border border-neutral-100 focus:outline-none focus:border-primary-700 placeholder:text-black-800/40"
          />
        </div>

        <!-- Notifications -->
        <button class="relative p-2 rounded-full hover:bg-neutral-100/60 transition-colors">
          <i class="fas fa-bell text-black-800/60 text-sm"></i>
          <span
            class="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full border border-white-100"
          ></span>
        </button>

        <!-- Messages -->
        <button class="relative p-2 rounded-full hover:bg-neutral-100/60 transition-colors">
          <i class="fas fa-comment-dots text-black-800/60 text-sm"></i>
        </button>

        <!-- User -->
        <div class="flex items-center gap-2 pl-2 border-l border-neutral-100">
          <div class="text-right hidden md:block">
            <p class="text-xs font-semibold text-black-800 leading-tight">
              {{ loggedInUser?.name ?? 'Guest' }}
            </p>
            <p class="text-[10px] text-black-800/50">Fleet Manager</p>
          </div>
          <div
            class="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-white-100 text-xs font-bold"
          >
            {{ (loggedInUser?.name ?? 'G').charAt(0).toUpperCase() }}
          </div>
        </div>
      </div>
    </header>

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
        <DashboardMapComponent />
      </div>

      <!-- Right column -->
      <div
        class="hidden lg:flex flex-col w-80 overflow-y-auto border-l border-neutral-100/40 p-5 gap-6 bg-white-100"
      >
        <DashboardActivityComponent :activities="recentActivity" />
        <div class="border-t border-neutral-100/50"></div>
        <DashboardManufacturersComponent :manufacturers="topManufacturers" />
      </div>
    </div>
  </div>
</template>
