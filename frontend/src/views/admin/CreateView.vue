<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import AircraftFormComponent from '@/components/admin-components/AircraftFormComponent.vue';
import AirlineFormComponent from '@/components/admin-components/AirlineFormComponent.vue';
import ManufacturerFormComponent from '@/components/admin-components/ManufacturerFormComponent.vue';

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
    <AircraftFormComponent v-if="activeTab === 'aircraft'" :form-type="'create'" />

    <!-- Airline Form -->
    <AirlineFormComponent v-if="activeTab === 'airline'" :form-type="'create'" />

    <!-- Manufacturer Form -->
    <ManufacturerFormComponent v-if="activeTab === 'manufacturer'" :form-type="'create'" />
  </div>
</template>
