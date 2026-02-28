<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
import { ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue';
import { COUNTRIES, type Country } from '@/types/SharedTypes';
import type { CreateAirCraftDTO } from '@/dtos/CreateAircraftDTO';
import type { Status } from '@/types/AircraftTypes';
import { AircraftService } from '@/services/AircraftService';

// States for interactivity
const activeTab = ref('aircraft');
const selectedAirlineCountry = ref<Country | ''>('');
const selectedManufacturerCountry = ref<Country | ''>('');

// Aricraft creation form
const registry = ref('');
const model = ref('');
const aircraftImageURL = ref('');
const passengerCapacity = ref(0);
const firstFlightDate = ref('');
const status = ref('active' as Status);
const aircraftSuccessMessage = ref('');

function submitAircraftForm(): void {
  const newAircraft: CreateAirCraftDTO = {
    registry: registry.value,
    model: model.value,
    passengerCapacity: passengerCapacity.value,
    status: status.value,
    firstFlightDate: new Date(firstFlightDate.value),
    imageURL: aircraftImageURL.value,
  };

  AircraftService.createAircraft(newAircraft);
  aircraftSuccessMessage.value = 'Aircraft entry created succesfully!';

  clearAircraftForm();
}

function clearAircraftForm(): void {
  registry.value = '';
  model.value = '';
  passengerCapacity.value = 0;
  status.value = 'active';
  firstFlightDate.value = '';
  aircraftImageURL.value = '';
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
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="manufacturer"
              id="manufacturer"
              required
            >
              <option disabled value="">Select Manufacturer</option>
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="airline">Airline</label>
            <select
              class="w-full bg-punch-50 text-deep-black rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="airline"
              id="airline"
              required
            >
              <option disabled value="">Select Airline</option>
              <option>Boeing Commercial Airplanes</option>
              <option>Airbus</option>
              <option>Embraer</option>
              <option>Bombardier</option>
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
              placeholder="0"
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
              <option>Active</option>
              <option>Maintenance</option>
              <option>Retired</option>
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
    <form method="POST" :class="['space-y-8', activeTab === 'airline' ? 'block' : 'hidden']">
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="name">Name</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="country">Country</label>
            <select
              v-model="selectedAirlineCountry"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="country"
              id="country"
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
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Media &amp; Assets
        </h3>

        <div class="space-y-4">
          <label class="text-sm text-punch-50 font-semibold">Photo</label>
          <div
            class="border-2 border-dashed border-deep-black rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer hover:border-punch-700 transition-colors"
          >
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
            </div>
            <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-deep-black/80">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <!-- Upload Preview Placeholder -->
          <div class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg">
            <div
              class="size-12 rounded bg-punch-50 bg-cover bg-center"
              data-alt="Small thumbnail preview of uploaded airline image"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-deep-black font-bold truncate">B738_Final_Render.jpg</p>
              <p class="text-[10px] text-deep-black/80">2.4 MB • Complete</p>
            </div>
            <button class="p-1 hover:text-punch-900 transition-colors cursor-pointer" type="button">
              <i class="fas fa-trash material-symbols-outlined text-xl"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button"
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
    <form method="POST" :class="['space-y-8', activeTab === 'manufacturer' ? 'block' : 'hidden']">
      <!-- Section: General Information -->
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          General Information
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="name">Name</label>
            <input
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm text-punch-50 font-semibold" for="country">Country</label>
            <select
              v-model="selectedManufacturerCountry"
              class="w-full bg-punch-50 border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
              name="country"
              id="country"
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
      <section class="bg-punch-900 p-6 rounded-xl border">
        <h3 class="text-lg text-punch-50 font-bold mb-6 flex items-center gap-2">
          Media &amp; Assets
        </h3>

        <div class="space-y-4">
          <label class="text-sm text-punch-50 font-semibold">Photo</label>
          <div
            class="border-2 border-dashed border-deep-black rounded-xl p-10 flex flex-col items-center justify-center bg-punch-50 group cursor-pointer hover:border-punch-700 transition-colors"
          >
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <i class="fas fa-file material-symbols-outlined text-deep-black text-3xl"></i>
            </div>
            <p class="text-sm text-deep-black font-bold mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-deep-black/80">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>

          <!-- Upload Preview Placeholder -->
          <div class="flex items-center gap-4 p-3 bg-punch-50 rounded-lg">
            <div
              class="size-12 rounded bg-punch-50 bg-cover bg-center"
              data-alt="Small thumbnail preview of uploaded manufacturer image"
            ></div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-deep-black font-bold truncate">B738_Final_Render.jpg</p>
              <p class="text-[10px] text-deep-black/80">2.4 MB • Complete</p>
            </div>
            <button class="p-1 hover:text-punch-900 transition-colors cursor-pointer" type="button">
              <i class="fas fa-trash material-symbols-outlined text-xl"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <button
          class="px-6 py-3 text-sm font-bold text-punch-50 bg-punch-800 hover:bg-punch-900 rounded-lg transition-colors cursor-pointer"
          type="button"
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
