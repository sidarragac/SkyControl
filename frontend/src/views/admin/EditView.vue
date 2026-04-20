<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Internal imports
import AircraftEditFormComponent from '@/components/admin/aircraft/AircraftEditFormComponent.vue';
import { AircraftService } from '@/services/AircraftService';
import AirlineEditFormComponent from '@/components/admin/airline/AirlineEditFormComponent.vue';
import { AirlineService } from '@/services/AirlineService';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import ManufacturerEditFormComponent from '@/components/admin/manufacturer/ManufacturerEditFormComponent.vue';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import { ManufacturerService } from '@/services/ManufacturerService';

// Reactive variables
const selectedObjectClass = ref('aircraft');
const activeObject = ref<AircraftInterface | AirlineInterface | ManufacturerInterface | null>(null);
const originalObject = ref<AircraftInterface | AirlineInterface | ManufacturerInterface | null>(
  null,
);

const searchQuery = ref('');
const objects = ref<AircraftInterface[] | AirlineInterface[] | ManufacturerInterface[]>([]);
const filteredObjects = computed(() => {
  if (!searchQuery.value) {
    return objects.value;
  }

  return objects.value.filter((object) => {
    if ('registry' in object) {
      return (
        object.registry.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        object.model.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    } else if ('destinations' in object) {
      return object.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    } else if ('foundationDate' in object) {
      return object.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    }

    return false;
  });
});

const currentPage = ref(1);
const objectsPerPage = 10;
const paginatedObjects = computed(() => {
  const start = (currentPage.value - 1) * objectsPerPage;
  const end = start + objectsPerPage;
  return filteredObjects.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(filteredObjects.value.length / objectsPerPage));

// Functions
async function getObjectList(): Promise<
  AircraftInterface[] | AirlineInterface[] | ManufacturerInterface[]
> {
  switch (selectedObjectClass.value) {
    case 'aircraft':
      return await AircraftService.getAircrafts();
    case 'airline':
      return await AirlineService.getAirlines();
    case 'manufacturer':
      return await ManufacturerService.getManufacturers();
    default:
      return [];
  }
}

async function loadObjects() {
  objects.value = await getObjectList();
}

// Watchers
watch(searchQuery, () => {
  currentPage.value = 1;
});

watch(selectedObjectClass, () => {
  currentPage.value = 1;
  activeObject.value = null;
  loadObjects();
});

// Hooks
onMounted(() => {
  loadObjects();
});
</script>
<template>
  <div class="flex-1 flex overflow-hidden">
    <!-- Left Sidebar: Aircraft List -->
    <aside class="w-80 border-r border-primary-700 flex flex-col bg-primary-900 shrink-0">
      <!-- Object Class Selection (Aircraft | Airline | Manufacturer) -->
      <div class="p-4">
        <div class="flex items-center justify-between mb-4 px-1">
          <select
            v-model="selectedObjectClass"
            @change="activeObject = null"
            name="objectClass"
            id="objectClass"
            class="bg-primary-700 w-full text-white-100 text-lg font-bold p-2 rounded-lg"
          >
            <option value="aircraft">Aircraft</option>
            <option value="airline">Airline</option>
            <option value="manufacturer">Manufacturer</option>
          </select>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="flex flex-col h-12 w-full px-5 pb-2 border-b border-primary-700">
        <div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-white-200">
          <div class="text-primary-700 flex items-center justify-center pl-3">
            <i class="fas fa-search"></i>
          </div>

          <input
            v-model="searchQuery"
            class="pl-2 bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-black-900/50 focus:outline-none"
            placeholder="Search list of entries"
            value=""
          />
        </div>
      </div>

      <!-- List Items -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div
          v-for="object in paginatedObjects"
          :key="object.id"
          @click="
            activeObject = { ...object };
            originalObject = { ...object };
          "
          class="flex flex-col"
        >
          <!-- Aircraft Item -->
          <div
            v-if="'registry' in object"
            :class="[
              'p-4 flex gap-3 transition-colors cursor-pointer',
              activeObject?.id === object.id
                ? 'bg-secondary-700 border-l-4 border-accent-500'
                : 'hover:bg-primary-700',
            ]"
          >
            <img :src="object.imageURL" class="w-16 h-16 object-cover rounded-lg shrink-0" />

            <div class="flex flex-col justify-center">
              <p class="text-sm font-semibold text-white-200">{{ object.model }}</p>
              <p class="text-xs text-white-200/80">{{ object.registry }}</p>
            </div>
            <div class="ml-auto flex items-center">
              <span
                :class="[
                  'size-2 rounded-full',
                  object.status === 'active' ? 'bg-green-500' : '',
                  object.status === 'maintenance' ? 'bg-amber-500' : '',
                  object.status === 'retired' ? 'bg-red-500' : '',
                ]"
              ></span>
            </div>
          </div>

          <!-- Airline Item -->
          <div
            v-if="'destinations' in object"
            :class="[
              'p-4 flex gap-3 transition-colors cursor-pointer',
              activeObject?.id === object.id
                ? 'bg-secondary-700 border-l-4 border-accent-500'
                : 'hover:bg-primary-700',
            ]"
          >
            <img :src="object.imageURL" class="w-16 h-16 object-cover rounded-lg shrink-0" />

            <div class="flex flex-col justify-center">
              <p class="text-sm font-semibold text-white-200">{{ object.name }}</p>
              <p class="text-xs text-white-200/80">{{ object.country }}</p>
            </div>
          </div>

          <!-- Manufacturer Item -->
          <div
            v-if="'foundationDate' in object"
            :class="[
              'p-4 flex gap-3 transition-colors cursor-pointer',
              activeObject?.id === object.id
                ? 'bg-secondary-700 border-l-4 border-accent-500'
                : 'hover:bg-primary-700',
            ]"
          >
            <img :src="object.imageURL" class="w-16 h-16 object-cover rounded-lg shrink-0" />

            <div class="flex flex-col justify-center">
              <p class="text-sm font-semibold text-white-200">{{ object.name }}</p>
              <p class="text-xs text-white-200/80">{{ object.country }}</p>
            </div>
          </div>
        </div>

        <div v-if="paginatedObjects.length === 0" class="text-white-200 text-center mt-5">
          No results found
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="paginatedObjects.length > 0"
          class="flex justify-center gap-2 p-2 bg-primary-900 border-t border-primary-700"
        >
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-primary-700 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-auto"
          >
            Prev
          </button>

          <span class="text-white-200 px-2"> Page {{ currentPage }} of {{ totalPages }} </span>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-primary-700 text-white rounded disabled:opacity-50 cursor-pointer disabled:cursor-auto"
          >
            Next
          </button>
        </div>
      </div>
    </aside>

    <!-- Right Content: Edit Form -->
    <section
      class="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar"
    >
      <!-- Return Home -->
      <div class="flex flex-wrap items-center gap-2 px-8 pt-6">
        <RouterLink
          to="/"
          class="text-sm text-black-800/80 hover:text-black-800 transition-colors flex items-center gap-1"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Return to Home</span>
        </RouterLink>
      </div>

      <!-- Aircraft Edit Form -->
      <!-- Header Section -->
      <div v-if="activeObject && 'registry' in activeObject">
        <div class="flex items-center justify-between px-8 py-6">
          <div>
            <h1
              class="text-primary-900 tracking-light text-2xl lg:text-3xl font-bold leading-tight"
            >
              Edit Aircraft
            </h1>
          </div>
        </div>

        <!-- Form Content -->
        <AircraftEditFormComponent
          v-if="activeObject && 'registry' in activeObject"
          v-model="activeObject"
          @delete="activeObject = null"
          @updated="loadObjects()"
        />
      </div>

      <!-- Airline Edit Form -->
      <!-- Header Section -->
      <div v-else-if="activeObject && 'destinations' in activeObject">
        <div class="flex items-center justify-between px-8 py-6">
          <div>
            <h1
              class="text-primary-900 tracking-light text-2xl lg:text-3xl font-bold leading-tight"
            >
              Edit Airline
            </h1>
          </div>
        </div>

        <!-- Form Content -->
        <AirlineEditFormComponent
          v-if="activeObject && 'destinations' in activeObject"
          v-model="activeObject"
          @delete="activeObject = null"
          @updated="loadObjects()"
        />
      </div>

      <!-- Manufacturer Edit Form -->
      <!-- Header Section -->
      <div v-else-if="activeObject && 'foundationDate' in activeObject">
        <div class="flex items-center justify-between px-8 py-6">
          <div>
            <h1
              class="text-primary-900 tracking-light text-2xl lg:text-3xl font-bold leading-tight"
            >
              Edit Manufacturer
            </h1>
          </div>
        </div>

        <!-- Form Content -->
        <ManufacturerEditFormComponent
          v-if="activeObject && 'foundationDate' in activeObject"
          v-model="activeObject"
          @delete="activeObject = null"
          @updated="loadObjects()"
        />
      </div>

      <div v-else class="flex flex-col items-center justify-center h-full gap-4">
        <i class="fas fa-plane-departure text-6xl text-primary-700"></i>
        <p class="text-lg text-primary-700">
          Select an entry from the left to view and edit its details.
        </p>
      </div>
    </section>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-neutral-100);
  border-radius: 10px;
}
</style>
