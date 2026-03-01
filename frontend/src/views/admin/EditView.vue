<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Internal imports
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';
import { COUNTRIES } from '@/types/SharedTypes';
import { CountryFormatterUtil } from '@/utils/CountryFormatterUtil';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import { ManufacturerService } from '@/services/ManufacturerService';
import type { UpdateAircraftDTO } from '@/dtos/UpdateAircraftDTO';
import type { UpdateAirlineDTO } from '@/dtos/UpdateAirlineDTO';
import type { UpdateManufacturerDTO } from '@/dtos/UpdateManufacturerDTO';
import UploadFile from '@/components/UploadFile.vue';

// States for interactivity
const selectedObjectClass = ref('aircraft');
const activeObject = ref<AircraftInterface | AirlineInterface | ManufacturerInterface | null>(null);
const originalObject = ref<AircraftInterface | AirlineInterface | ManufacturerInterface | null>(
  null,
);

// Aircraft variables
const manufacturers = ManufacturerService.getManufacturers();
const airlines = AirlineService.getAirlines();
const aircraftSuccessMessage = ref('');
const aircraftErrorMessage = ref('');

// Airline variables
const airlineSuccessMessage = ref('');
const airlineErrorMessage = ref('');

// Manufacturer variables
const manufacturerSuccessMessage = ref('');
const manufacturerErrorMessage = ref('');

function getObjectList(): AircraftInterface[] | AirlineInterface[] | ManufacturerInterface[] {
  switch (selectedObjectClass.value) {
    case 'aircraft':
      return AircraftService.getAircrafts();
    case 'airline':
      return AirlineService.getAirlines();
    case 'manufacturer':
      return ManufacturerService.getManufacturers();
    default:
      return [];
  }
}

// Aircraft Form
function saveAircraftChanges(aircraft: AircraftInterface): void {
  try {
    const updatedAircraft: UpdateAircraftDTO = {
      id: aircraft.id,
      registry: aircraft.registry,
      model: aircraft.model,
      passengerCapacity: aircraft.passengerCapacity,
      status: aircraft.status,
      firstFlightDate: aircraft.firstFlightDate,
      imageURL: aircraft.imageURL,
      createdAt: aircraft.createdAt,
    };

    AircraftService.updateAircraft(updatedAircraft);
    aircraftSuccessMessage.value = 'Aircraft entry updated successfully!';
    setTimeout(() => {
      aircraftSuccessMessage.value = '';
    }, 5000);
  } catch (error: Error | unknown) {
    aircraftErrorMessage.value = `An error occurred while editing the aircraft entry. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      aircraftErrorMessage.value = '';
    }, 10000);
  }
}

// Airline Form
function saveAirlineChanges(airline: AirlineInterface): void {
  try {
    if (typeof airline.destinations === 'string') {
      airline.destinations = CountryFormatterUtil.formatDestinations(airline.destinations);
    }

    const updatedAirline: UpdateAirlineDTO = {
      id: airline.id,
      name: airline.name,
      country: airline.country,
      destinations: airline.destinations,
      imageURL: airline.imageURL,
      createdAt: airline.createdAt,
    };

    AirlineService.updateAirline(updatedAirline);
    airlineSuccessMessage.value = 'Airline entry updated successfully!';
    setTimeout(() => {
      airlineSuccessMessage.value = '';
    }, 5000);
  } catch (error: Error | unknown) {
    airlineErrorMessage.value = `An error occurred while editing the airline entry. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      airlineErrorMessage.value = '';
    }, 10000);
  }
}

// Manufacturer Form
function saveManufacturerChanges(manufacturer: ManufacturerInterface): void {
  try {
    const updatedManufacturer: UpdateManufacturerDTO = {
      id: manufacturer.id,
      name: manufacturer.name,
      country: manufacturer.country,
      foundationDate: new Date(manufacturer.foundationDate),
      imageURL: manufacturer.imageURL,
      createdAt: manufacturer.createdAt,
    };

    ManufacturerService.updateManufacturer(updatedManufacturer);
    manufacturerSuccessMessage.value = 'Manufacturer entry updated successfully!';
    setTimeout(() => {
      manufacturerSuccessMessage.value = '';
    }, 5000);
  } catch (error: Error | unknown) {
    manufacturerErrorMessage.value = `An error occurred while editing the manufacturer entry. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      manufacturerErrorMessage.value = '';
    }, 10000);
  }
}
</script>
<template>
  <div class="flex-1 flex overflow-hidden">
    <!-- Left Sidebar: Aircraft List -->
    <aside class="w-80 border-r border-primary-700 flex flex-col bg-primary-900 shrink-0">
      <!-- Object Class Selection (Aircraft | Airline | Manufacturer) -->
      <div class="p-4 border-b border-primary-700">
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

      <!-- List Items -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div
          v-for="object in getObjectList()"
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
      </div>
    </aside>

    <!-- Right Content: Edit Form -->
    <section
      class="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark custom-scrollbar"
    >
      <!-- Return Home -->
      <div class="flex flex-wrap items-center gap-2 px-8 pt-6">
        <RouterLink
          to="/home"
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

        <!-- Success Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="aircraftSuccessMessage"
            class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
            <div>
              <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
                {{ aircraftSuccessMessage }}
              </p>
            </div>
          </div>
        </Transition>

        <!-- Error Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="aircraftErrorMessage"
            class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
            <div>
              <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
              <p
                class="text-xs text-red-700 dark:text-red-400/80"
                v-html="aircraftErrorMessage"
              ></p>
            </div>
          </div>
        </Transition>

        <!-- Form Content -->
        <form
          method="PUT"
          class="px-8 pb-20 text-primary-700"
          @submit.prevent="saveAircraftChanges(activeObject)"
        >
          <div class="bg-neutral-100 rounded-xl border border-neutral-100 overflow-hidden">
            <!-- Section: General Information -->
            <div class="p-6 border-b-2 border-white-100">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                General Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="registry">Registry</label>
                  <input
                    v-model="activeObject.registry"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="registry"
                    id="registry"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="model">Model</label>
                  <input
                    v-model="activeObject.model"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="model"
                    id="model"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="manufacturer">Manufacturer</label>
                  <select
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    name="manufacturer"
                    id="manufacturer"
                    required
                  >
                    <option
                      v-for="manufacturer in manufacturers"
                      :key="manufacturer.id"
                      :value="manufacturer.name"
                    >
                      {{ manufacturer.name }}
                    </option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="airline">Airline</label>
                  <select
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    name="airline"
                    id="airline"
                    required
                  >
                    <option v-for="airline in airlines" :key="airline.id" :value="airline.name">
                      {{ airline.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Section: Media -->
            <div class="p-6 border-b-2 border-white-100 flex">
              <div class="flex-1 flex flex-col">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                  Selected Media
                </h3>
                <img
                  v-if="activeObject.imageURL"
                  :src="activeObject.imageURL"
                  :alt="activeObject.model + 'image'"
                  class="w-48 h-48 object-cover rounded-lg border border-primary-700/20 self-center my-auto"
                />
                <span v-else class="text-sm text-primary-700 self-center my-auto"
                  >No image available</span
                >
              </div>
              <UploadFile
                class="border-none flex-2 p-0!"
                v-model:imageURL="activeObject.imageURL"
                :preview="false"
              />
            </div>

            <!-- Section: Additional Specifications -->
            <div class="p-6 border-b border-white-200">
              <h3 class="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                Additional Specifications
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="passengerCapacity"
                    >Passenger Capacity</label
                  >
                  <div class="relative">
                    <input
                      v-model="activeObject.passengerCapacity"
                      class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none pr-10"
                      type="number"
                      name="passengerCapacity"
                      id="passengerCapacity"
                      required
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="status">Status</label>
                  <select
                    v-model="activeObject.status"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    name="status"
                    id="status"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="firstFlightDate"
                    >First Flight Date</label
                  >
                  <input
                    v-model="String(activeObject.firstFlightDate).split('T')[0]"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="date"
                    name="firstFlightDate"
                    id="firstFlightDate"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div
              class="p-6 bg-white-100 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <button
                type="button"
                @click="
                  AircraftService.deleteAircraft(activeObject.id);
                  activeObject = null;
                "
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-700 font-bold hover:bg-red-700 hover:text-white-100 transition-all order-2 sm:order-1 cursor-pointer"
              >
                <i class="fas fa-trash text-lg"></i>
                Delete Aircraft
              </button>

              <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  type="submit"
                  class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
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

        <!-- Success Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="airlineSuccessMessage"
            class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
            <div>
              <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
                {{ airlineSuccessMessage }}
              </p>
            </div>
          </div>
        </Transition>

        <!-- Error Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="airlineErrorMessage"
            class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
            <div>
              <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
              <p class="text-xs text-red-700 dark:text-red-400/80" v-html="airlineErrorMessage"></p>
            </div>
          </div>
        </Transition>

        <!-- Form Content -->
        <form
          method="PUT"
          class="px-8 pb-20 text-primary-700"
          @submit.prevent="saveAirlineChanges(activeObject)"
        >
          <div class="bg-neutral-100 rounded-xl border border-neutral-100 overflow-hidden">
            <!-- Section: General Information -->
            <div class="p-6 border-b-2 border-white-100">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                General Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="airlineName">Name</label>
                  <input
                    v-model="activeObject.name"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="airlineName"
                    id="airlineName"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="airlineCountry">Country</label>
                  <input
                    v-model="activeObject.country"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="airlineCountry"
                    id="airlineCountry"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="destinations">Destinations</label>
                  <input
                    v-model="activeObject.destinations"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="destinations"
                    id="destinations"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Section: Media -->
            <div class="p-6 border-b-2 border-white-100 flex">
              <div class="flex-1 flex flex-col">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                  Selected Media
                </h3>
                <img
                  v-if="activeObject.imageURL"
                  :src="activeObject.imageURL"
                  :alt="activeObject.name + 'image'"
                  class="w-48 h-48 object-cover rounded-lg border border-primary-700/20 self-center my-auto"
                />
                <span v-else class="text-sm text-primary-700 self-center my-auto"
                  >No image available</span
                >
              </div>
              <UploadFile
                class="border-none flex-2 p-0!"
                v-model:imageURL="activeObject.imageURL"
                :preview="false"
              />
            </div>

            <!-- Form Actions -->
            <div
              class="p-6 bg-white-100 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <button
                type="button"
                @click="
                  AirlineService.deleteAirline(activeObject.id);
                  activeObject = null;
                "
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-700 font-bold hover:bg-red-700 hover:text-white-100 transition-all order-2 sm:order-1 cursor-pointer"
              >
                <i class="fas fa-trash text-lg"></i>
                Delete Ailine
              </button>

              <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  type="submit"
                  class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
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

        <!-- Success Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="manufacturerSuccessMessage"
            class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-check-circle text-emerald-600 dark:text-emerald-400"></i>
            <div>
              <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
              <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
                {{ manufacturerSuccessMessage }}
              </p>
            </div>
          </div>
        </Transition>

        <!-- Error Message -->
        <Transition name="fade" class="mx-8">
          <div
            v-if="manufacturerErrorMessage"
            class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
          >
            <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
            <div>
              <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
              <p
                class="text-xs text-red-700 dark:text-red-400/80"
                v-html="manufacturerErrorMessage"
              ></p>
            </div>
          </div>
        </Transition>

        <!-- Form Content -->
        <form
          method="PUT"
          class="px-8 pb-20 text-primary-700"
          @submit.prevent="saveManufacturerChanges(activeObject)"
        >
          <div class="bg-neutral-100 rounded-xl border border-neutral-100 overflow-hidden">
            <!-- Section: General Information -->
            <div class="p-6 border-b-2 border-white-100">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                General Information
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="manufacturerName">Name</label>
                  <input
                    v-model="activeObject.name"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="text"
                    name="manufacturerName"
                    id="manufacturerName"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="manufacturerCountry">Country</label>
                  <select
                    v-model="activeObject.country"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    name="manufacturerCountry"
                    id="manufacturerCountry"
                    required
                  >
                    <option v-for="country in COUNTRIES" :key="country" :value="country">
                      {{ country }}
                    </option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold" for="foundationDate">Foundation Date</label>
                  <input
                    v-model="String(activeObject.foundationDate).split('T')[0]"
                    class="w-full bg-white-200 border-white-200 rounded-lg text-black-800 px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    type="date"
                    name="foundationDate"
                    id="foundationDate"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Section: Media -->
            <div class="p-6 border-b-2 border-white-100 flex">
              <div class="flex-1 flex flex-col">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
                  Selected Media
                </h3>
                <img
                  v-if="activeObject.imageURL"
                  :src="activeObject.imageURL"
                  :alt="activeObject.name + 'image'"
                  class="w-48 h-48 object-cover rounded-lg border border-primary-700/20 self-center my-auto"
                />
                <span v-else class="text-sm text-primary-700 self-center my-auto"
                  >No image available</span
                >
              </div>
              <UploadFile
                class="border-none flex-2 p-0!"
                v-model:imageURL="activeObject.imageURL"
                :preview="false"
              />
            </div>

            <!-- Form Actions -->
            <div
              class="p-6 bg-white-100 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <button
                type="button"
                @click="
                  ManufacturerService.deleteManufacturer(activeObject.id);
                  activeObject = null;
                "
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-700 font-bold hover:bg-red-700 hover:text-white-100 transition-all order-2 sm:order-1 cursor-pointer"
              >
                <i class="fas fa-trash text-lg"></i>
                Delete Manufacturer
              </button>

              <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  type="submit"
                  class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
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
