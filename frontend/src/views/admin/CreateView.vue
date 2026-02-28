<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue';
import type { CreateAircraftDTO } from '@/dtos/CreateAircraftDTO';
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';
import { ManufacturerService } from '@/services/ManufacturerService';
import { COUNTRIES, type Country } from '@/types/SharedTypes';
import { CountryFormatUtil } from '@/utils/CountryFormatUtil';
import type { Status } from '@/types/AircraftTypes';

// States for interactivity
const activeTab = ref('aircraft');
const selectedManufacturer = ref('');
const selectedAirline = ref('');

// Aricraft creation form
const registry = ref('');
const model = ref('');
const aircraftImageURL = ref('');
const passengerCapacity = ref(0);
const firstFlightDate = ref('');
const status = ref<Status>('active');
const manufacturers = ManufacturerService.getManufacturers();
const airlines = AirlineService.getAirlines();
const aircraftSuccessMessage = ref('');
const aircraftErrorMessage = ref('');

function submitAircraftForm(): void {
  try {
    const newAircraft: CreateAircraftDTO = {
      registry: registry.value,
      model: model.value,
      passengerCapacity: passengerCapacity.value,
      status: status.value,
      firstFlightDate: new Date(firstFlightDate.value),
      imageURL: aircraftImageURL.value,
    };

    AircraftService.createAircraft(newAircraft);
    aircraftSuccessMessage.value = 'Aircraft entry created succesfully!';
    setTimeout(() => {
      aircraftSuccessMessage.value = '';
    }, 3000);

    clearAircraftForm();
  } catch (error: Error | unknown) {
    aircraftErrorMessage.value = `An error occurred while creating the aircraft entry. Please try again.\nError details:${(error as Error).message}`;
    setTimeout(() => {
      aircraftErrorMessage.value = '';
    }, 3000);
  }
}

function clearAircraftForm(): void {
  registry.value = '';
  model.value = '';
  passengerCapacity.value = 0;
  status.value = 'active';
  firstFlightDate.value = '';
  aircraftImageURL.value = '';
}

// Ariline creation form
const airlineName = ref('');
const airlineCountry = ref<Country>('AF');
const destinations = ref('');
const airlineImageURL = ref('');
const airlineSuccessMessage = ref('');
const airlineErrorMessage = ref('');

function submitAirlineForm(): void {
  try {
    const newAirline: CreateAirlineDTO = {
      name: airlineName.value,
      country: airlineCountry.value,
      destinations: CountryFormatUtil.formatDestinations(destinations.value),
      imageURL: airlineImageURL.value,
    };

    AirlineService.createAirline(newAirline);
    airlineSuccessMessage.value = 'Airline entry created succesfully!';
    setTimeout(() => {
      airlineSuccessMessage.value = '';
    }, 3000);

    clearAirlineForm();
  } catch (error: Error | unknown) {
    airlineErrorMessage.value = `An error occurred while creating the airline entry. Please try again.\nError details:${(error as Error).message}`;
    setTimeout(() => {
      airlineErrorMessage.value = '';
    }, 3000);
  }
}

function clearAirlineForm(): void {
  airlineName.value = '';
  airlineCountry.value = 'AF';
  destinations.value = '';
  airlineImageURL.value = '';
}

// Manufacturer creation form
const manufacturerName = ref('');
const manufacturerCountry = ref<Country>('AF');
const foundationDate = ref('');
const manufacturerImageURL = ref('');
const manufacturerSuccessMessage = ref('');
const manufacturerErrorMessage = ref('');

function submitManufacturerForm(): void {
  try {
    const newManufacturer: CreateManufacturerDTO = {
      name: manufacturerName.value,
      country: manufacturerCountry.value,
      foundationDate: new Date(foundationDate.value),
      imageURL: manufacturerImageURL.value,
    };

    ManufacturerService.createManufacturer(newManufacturer);
    manufacturerSuccessMessage.value = 'Manufacturer entry created succesfully!';
    setTimeout(() => {
      manufacturerSuccessMessage.value = '';
    }, 3000);

    clearManufacturerForm();
  } catch (error: Error | unknown) {
    manufacturerErrorMessage.value = `An error occurred while creating the manufacturer entry. Please try again.\nError details:${(error as Error).message}`;
    setTimeout(() => {
      manufacturerErrorMessage.value = '';
    }, 3000);
  }
}

function clearManufacturerForm(): void {
  manufacturerName.value = '';
  manufacturerCountry.value = 'AF';
  foundationDate.value = '';
  manufacturerImageURL.value = '';
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <header class="mb-8">
      <h2 class="text-3xl text-punch-50 font-black tracking-tight mb-2">Create New Entry</h2>
      <p class="text-punch-50">
        Add a new aircraft, airline, or manufacturer record to the global registry.
      </p>
    </header>

    <!-- Tabs Navigation -->
    <nav class="border-b border-punch-50 mb-8">
      <div class="flex gap-4">
        <button
          @click="activeTab = 'aircraft'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'aircraft'
              ? 'text-punch-50 bg-punch-900'
              : 'text-punch-800 bg-punch-50 hover:text-punch-900',
          ]"
        >
          <span>Aircraft</span>
        </button>

        <button
          @click="activeTab = 'airline'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'airline'
              ? 'text-punch-50 bg-punch-900'
              : 'text-punch-800 bg-punch-50 hover:text-punch-900',
          ]"
        >
          <span>Airline</span>
        </button>

        <button
          @click="activeTab = 'manufacturer'"
          :class="[
            'group relative p-4 text-sm font-bold rounded-t-xl cursor-pointer',
            activeTab === 'manufacturer'
              ? 'text-punch-50 bg-punch-900'
              : 'text-punch-800 bg-punch-50 hover:text-punch-900',
          ]"
        >
          <span>Manufacturer</span>
        </button>
      </div>
    </nav>

    <!-- Aircraft Form -->
    <!-- Success Message -->
    <Transition name="fade">
      <div
        v-if="aircraftSuccessMessage && activeTab === 'aircraft'"
        class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-check-circle material-symbols-outlined text-emerald-600 dark:text-emerald-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
          <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
            {{ aircraftSuccessMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="fade">
      <div
        v-if="aircraftErrorMessage && activeTab === 'aircraft'"
        class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-exclamation-circle material-symbols-outlined text-red-600 dark:text-red-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
          <p class="text-xs text-red-700 dark:text-red-400/80">
            {{ aircraftErrorMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <form
      method="POST"
      :class="['space-y-8', activeTab === 'aircraft' ? 'block' : 'hidden']"
      @submit.prevent="submitAircraftForm()"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="registry">Registry</label>
            <input
              v-model="registry"
              name="registry"
              id="registry"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. N123AA"
              type="text"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="model">Model</label>
            <input
              v-model="model"
              name="model"
              id="model"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="e.g. Boeing 737-800"
              type="text"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="manufacturer"
              >Manufacturer</label
            >
            <select
              v-model="selectedManufacturer"
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="manufacturer"
              id="manufacturer"
              required
            >
              <option disabled value="">Select Manufacturer</option>

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
            <label class="text-sm text-punch-50 font-semibold" for="airline">Airline</label>
            <select
              v-model="selectedAirline"
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="airline"
              id="airline"
              required
            >
              <option disabled value="">Select Airline</option>

              <option v-for="airline in airlines" :key="airline.id" :value="airline.name">
                {{ airline.name }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Section: Media -->
      <UploadFile v-model:imageURL="aircraftImageURL" />

      <!-- Section: Specifications -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Additional Specifications
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="passengerCapacity"
              >Passenger Capacity</label
            >
            <input
              v-model="passengerCapacity"
              name="passengerCapacity"
              id="passengerCapacity"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              type="number"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="firstFlightDate"
              >First Flight Date</label
            >
            <input
              v-model="firstFlightDate"
              name="firstFlightDate"
              id="firstFlightDate"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              type="date"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="status">Status</label>
            <select
              v-model="status"
              name="status"
              id="status"
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              required
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button"
          @click="clearAircraftForm()"
        >
          Discard Changes
        </button>

        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit"
        >
          Save Aircraft Entry
        </button>
      </div>
    </form>

    <!-- Airline Form -->
    <!-- Success Message -->
    <Transition name="fade">
      <div
        v-if="airlineSuccessMessage && activeTab === 'airline'"
        class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-check-circle material-symbols-outlined text-emerald-600 dark:text-emerald-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
          <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
            {{ airlineSuccessMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="fade">
      <div
        v-if="airlineErrorMessage && activeTab === 'airline'"
        class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-exclamation-circle material-symbols-outlined text-red-600 dark:text-red-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
          <p class="text-xs text-red-700 dark:text-red-400/80">
            {{ airlineErrorMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <form
      method="POST"
      :class="['space-y-8', activeTab === 'airline' ? 'block' : 'hidden']"
      @submit.prevent="submitAirlineForm()"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="airlineName">Name</label>
            <input
              v-model="airlineName"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Name"
              type="text"
              name="airlineName"
              id="airlineName"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="airlineCountry">Country</label>
            <select
              v-model="airlineCountry"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="airlineCountry"
              id="airlineCountry"
              required
            >
              <option disabled value="">Select a country</option>

              <option v-for="country in COUNTRIES" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="destinations"
              >Destinations</label
            >
            <input
              v-model="destinations"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="List of cities separated by commas"
              type="text"
              name="destinations"
              id="destinations"
              required
            />
          </div>
        </div>
      </section>

      <!-- Section: Media & Documentation -->
      <UploadFile v-model:imageURL="airlineImageURL" />

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button"
          @click="clearAirlineForm()"
        >
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit"
        >
          Save Airline Entry
        </button>
      </div>
    </form>

    <!-- Manufacturer Form -->
    <!-- Success Message -->
    <Transition name="fade">
      <div
        v-if="manufacturerSuccessMessage && activeTab === 'manufacturer'"
        class="mb-6 bg-emerald-50 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-check-circle material-symbols-outlined text-emerald-600 dark:text-emerald-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Success!</p>
          <p class="text-xs text-emerald-700 dark:text-emerald-400/80">
            {{ manufacturerSuccessMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition name="fade">
      <div
        v-if="manufacturerErrorMessage && activeTab === 'manufacturer'"
        class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i
          class="fas fa-exclamation-circle material-symbols-outlined text-red-600 dark:text-red-400"
        ></i>
        <div>
          <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
          <p class="text-xs text-red-700 dark:text-red-400/80">
            {{ manufacturerErrorMessage }}
          </p>
        </div>
      </div>
    </Transition>

    <form
      method="POST"
      :class="['space-y-8', activeTab === 'manufacturer' ? 'block' : 'hidden']"
      @submit.prevent="submitManufacturerForm()"
    >
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="manufacturerName">Name</label>
            <input
              v-model="manufacturerName"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Name"
              type="text"
              name="manufacturerName"
              id="manufacturerName"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="manufacturerCountry"
              >Country</label
            >
            <select
              v-model="manufacturerCountry"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="manufacturerCountry"
              id="manufacturerCountry"
              required
            >
              <option disabled value="">Select a country</option>

              <option v-for="country in COUNTRIES" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="foundationDate"
              >Foundation Date</label
            >
            <input
              v-model="foundationDate"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              type="date"
              name="foundationDate"
              id="foundationDate"
              required
            />
          </div>
        </div>
      </section>

      <!-- Section: Media & Documentation -->
      <UploadFile v-model:imageURL="manufacturerImageURL" />

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button"
          @click="clearManufacturerForm()"
        >
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-deep-black bg-punch-50 hover:text-light-black/50 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
          type="submit"
        >
          Save Manufacturer Entry
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
