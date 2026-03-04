<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import AircraftFormComponent from '@/components/admin-components/AircraftFormComponent.vue';
import { AirlineService } from '@/services/AirlineService';
import { COUNTRIES, type Country } from '@/types/SharedTypes';
import { CountryFormatterUtil } from '@/utils/CountryFormatterUtil';
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
import { ManufacturerService } from '@/services/ManufacturerService';

// States for interactivity
const activeTab = ref('aircraft');

// Ariline creation form
const airlineName = ref('');
const airlineCountry = ref<Country>('AF');
const destinations = ref('');
const airlineImageURL = ref('');
const airlineSuccessMessage = ref('');
const airlineErrorMessage = ref('');

function submitAirlineForm(): void {
  if (!airlineImageURL.value) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    const newAirline: CreateAirlineDTO = {
      name: airlineName.value,
      country: airlineCountry.value,
      destinations: CountryFormatterUtil.formatDestinations(destinations.value),
      imageURL: airlineImageURL.value,
    };

    AirlineService.createAirline(newAirline);
    airlineSuccessMessage.value = 'Airline entry created succesfully!';
    setTimeout(() => {
      airlineSuccessMessage.value = '';
    }, 3000);

    clearAirlineForm();
  } catch (error: Error | unknown) {
    airlineErrorMessage.value = `An error occurred while creating the airline entry. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      airlineErrorMessage.value = '';
    }, 10000);
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
  if (!manufacturerImageURL.value) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    const newManufacturer: CreateManufacturerDTO = {
      name: manufacturerName.value,
      country: manufacturerCountry.value,
      foundationDate: new Date(foundationDate.value).toISOString(),
      imageURL: manufacturerImageURL.value,
    };

    ManufacturerService.createManufacturer(newManufacturer);
    manufacturerSuccessMessage.value = 'Manufacturer entry created succesfully!';
    setTimeout(() => {
      manufacturerSuccessMessage.value = '';
    }, 3000);

    clearManufacturerForm();
  } catch (error: Error | unknown) {
    manufacturerErrorMessage.value = `An error occurred while creating the manufacturer entry. Please try again.<br>Error details: ${(error as Error).message}`;
    setTimeout(() => {
      manufacturerErrorMessage.value = '';
    }, 10000);
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
    <!-- Success Message -->
    <Transition name="fade">
      <div
        v-if="airlineSuccessMessage && activeTab === 'airline'"
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
    <Transition name="fade">
      <div
        v-if="airlineErrorMessage && activeTab === 'airline'"
        class="mb-6 bg-red-50 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3"
      >
        <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
        <div>
          <p class="text-sm font-semibold text-red-800 dark:text-red-300">Error!</p>
          <p class="text-xs text-red-700 dark:text-red-400/80" v-html="airlineErrorMessage"></p>
        </div>
      </div>
    </Transition>

    <form
      method="POST"
      :class="['space-y-8', activeTab === 'airline' ? 'block' : 'hidden']"
      @submit.prevent="submitAirlineForm()"
    >
      <!-- Section: General Information -->
      <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
        <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-primary-700 font-semibold" for="airlineName">Name</label>
            <input
              v-model="airlineName"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
              placeholder="Name"
              type="text"
              name="airlineName"
              id="airlineName"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-primary-700 font-semibold" for="airlineCountry"
              >Country</label
            >
            <select
              v-model="airlineCountry"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
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
            <label class="text-sm text-primary-700 font-semibold" for="destinations"
              >Destinations</label
            >
            <input
              v-model="destinations"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
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
          class="px-6 py-3 text-sm font-bold text-black-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          type="button"
          @click="clearAirlineForm()"
        >
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
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
    <Transition name="fade">
      <div
        v-if="manufacturerErrorMessage && activeTab === 'manufacturer'"
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

    <form
      method="POST"
      :class="['space-y-8', activeTab === 'manufacturer' ? 'block' : 'hidden']"
      @submit.prevent="submitManufacturerForm()"
    >
      <!-- Section: General Information -->
      <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
        <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-primary-700 font-semibold" for="manufacturerName"
              >Name</label
            >
            <input
              v-model="manufacturerName"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
              placeholder="Name"
              type="text"
              name="manufacturerName"
              id="manufacturerName"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-primary-700 font-semibold" for="manufacturerCountry"
              >Country</label
            >
            <select
              v-model="manufacturerCountry"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
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
            <label class="text-sm text-primary-700 font-semibold" for="foundationDate"
              >Foundation Date</label
            >
            <input
              v-model="foundationDate"
              class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
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
          class="px-6 py-3 text-sm font-bold text-black-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          type="button"
          @click="clearManufacturerForm()"
        >
          Discard Changes
        </button>
        <button
          class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
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
