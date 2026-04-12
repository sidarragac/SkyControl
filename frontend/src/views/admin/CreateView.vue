<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import AircraftCreateFormComponent from '@/components/admin/aircraft/AircraftCreateFormComponent.vue';
import AirlineCreateFormComponent from '@/components/admin/airline/AirlineCreateFormComponent.vue';
import ManufacturerCreateFormComponent from '@/components/admin/manufacturer/ManufacturerCreateFormComponent.vue';

// Reactive variables
const activeTab = ref('aircraft');
</script>

<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-black-800">
    <!-- Header -->
    <header class="mb-8">
      <h2 class="text-3xl text-primary-900 font-black tracking-tight mb-2">Create New Entry</h2>
      <p>Add a new aircraft, airline, or manufacturer record to the global registry.</p>
    </header>

    <!-- Tabs Navigation -->
    <nav class="border-b border-primary-700 mb-8">
      <div class="flex gap-4">
        <button
          @click="activeTab = 'aircraft'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'aircraft'
              ? 'bg-primary-700 text-white-100'
              : 'text-black-800 bg-neutral-100 hover:bg-primary-700/80 hover:text-white-100',
          ]"
        >
          <span>Aircraft</span>
        </button>

        <button
          @click="activeTab = 'airline'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'airline'
              ? 'bg-primary-700 text-white-100'
              : 'text-black-800 bg-neutral-100 hover:bg-primary-700/80 hover:text-white-100',
          ]"
        >
          <span>Airline</span>
        </button>

        <button
          @click="activeTab = 'manufacturer'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'manufacturer'
              ? 'bg-primary-700 text-white-100'
              : 'text-black-800 bg-neutral-100 hover:bg-primary-700/80 hover:text-white-100',
          ]"
        >
          <span>Manufacturer</span>
        </button>
      </div>
    </nav>

    <!-- Aircraft Form -->
    <AircraftCreateFormComponent v-if="activeTab === 'aircraft'" />

    <!-- Airline Form -->
    <AirlineCreateFormComponent v-if="activeTab === 'airline'" />

    <!-- Manufacturer Form -->
    <ManufacturerCreateFormComponent v-if="activeTab === 'manufacturer'" />
  </div>
</template>
