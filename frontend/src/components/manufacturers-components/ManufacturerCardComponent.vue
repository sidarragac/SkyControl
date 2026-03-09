<!-- Developed by Juan Jara -->
<script setup lang="ts">
// Internal imports
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';

// Props
defineProps<{
  manufacturer: ManufacturerInterface;
  fleetPresence: number;
}>();
</script>

<template>
  <div
    class="bg-white-100 rounded-xl border border-neutral-100/40 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-primary-700/30 transition-all"
  >
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-lg bg-primary-900/10 flex items-center justify-center shrink-0 overflow-hidden"
      >
        <img
          v-if="manufacturer.imageURL"
          :src="manufacturer.imageURL"
          :alt="manufacturer.name"
          class="w-full h-full object-contain p-1"
        />
        <i v-else class="fas fa-industry text-primary-900 text-base"></i>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-bold text-black-800 leading-tight truncate">
          {{ manufacturer.name }}
        </p>
        <p class="text-[11px] text-black-800/50 mt-0.5 flex items-center gap-1">
          <i class="fas fa-map-marker-alt text-accent-500 text-[10px]"></i>
          {{ manufacturer.country }}
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-white-200 rounded-lg p-3">
        <p class="text-[10px] uppercase tracking-widest text-black-800/40 font-semibold">
          Fleet Presence
        </p>
        <p class="text-lg font-bold text-black-800 mt-0.5">
          {{ fleetPresence.toLocaleString() }}
        </p>
      </div>
      <div class="bg-white-200 rounded-lg p-3">
        <p class="text-[10px] uppercase tracking-widest text-black-800/40 font-semibold">Founded</p>
        <p class="text-lg font-bold text-black-800 mt-0.5">
          {{ new Date(manufacturer.foundationDate).getFullYear() }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-1 border-t border-neutral-100/50">
      <div class="flex -space-x-1">
        <div
          v-for="i in Math.min(3, fleetPresence)"
          :key="i"
          class="w-5 h-5 rounded-full bg-primary-900/20 border border-white-100 flex items-center justify-center"
        >
          <i class="fas fa-plane text-[7px] text-primary-900"></i>
        </div>
        <div
          v-if="fleetPresence > 3"
          class="w-5 h-5 rounded-full bg-neutral-100 border border-white-100 flex items-center justify-center"
        >
          <span class="text-[8px] font-bold text-black-800/50">+{{ fleetPresence - 3 }}</span>
        </div>
      </div>
      <button
        class="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-accent-500 transition-colors"
      >
        Details
        <i class="fas fa-chevron-right text-[10px]"></i>
      </button>
    </div>
  </div>
</template>
