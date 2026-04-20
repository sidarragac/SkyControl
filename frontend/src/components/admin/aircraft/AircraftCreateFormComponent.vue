<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref, onMounted } from 'vue';

// Internal imports
import { AircraftService } from '@/services/AircraftService';
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import { AirlineService } from '@/services/AirlineService';
import type { CreateAircraftDTO } from '@/dtos/aircraftDTO/CreateAircraftDTO';
import ErrorMessageComponent from '../ErrorMessageComponent.vue';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import { ManufacturerService } from '@/services/ManufacturerService';
import type { Status } from '@/types/AircraftTypes';
import SuccessMessageComponent from '../SuccessMessageComponent.vue';
import UploadFileComponent from '../UploadFileComponent.vue';

// Reactive variables
const form = ref({
  registry: '',
  model: '',
  passengerCapacity: 0,
  status: 'active',
  firstFlightDate: '',
  imageURL: '',
  airlineId: '',
  manufacturerId: '',
});

const manufacturers = ref<ManufacturerInterface[]>([]);
const airlines = ref<AirlineInterface[]>([]);
const successMessage = ref('');
const errorMessage = ref('');

// Functions
async function submitAircraftCreateForm(): Promise<void> {
  if (!form.value.imageURL) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    const newAircraft = createAircraftEntry();
    console.log('Submitting new aircraft entry:', newAircraft);
    await AircraftService.createAircraft(newAircraft);

    successMessage.value = 'Aircraft entry created succesfully!';

    clearAircraftForm();

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error: Error | unknown) {
    errorMessage.value = `An error occurred in the Aircraft form. Please try again.<br>Error details: ${(error as Error).message}`;

    setTimeout(() => {
      errorMessage.value = '';
    }, 10000);
  }
}

function createAircraftEntry(): CreateAircraftDTO {
  const newAircraft: CreateAircraftDTO = {
    registry: form.value.registry,
    model: form.value.model,
    passengerCapacity: Number(form.value.passengerCapacity),
    status: form.value.status as Status,
    firstFlightDate: new Date(form.value.firstFlightDate).toISOString(),
    imageURL: form.value.imageURL,
    airlineId: form.value.airlineId,
    manufacturerId: form.value.manufacturerId,
  };

  return newAircraft;
}

async function loadData() {
  manufacturers.value = await ManufacturerService.getManufacturers();
  airlines.value = await AirlineService.getAirlines();
}

function clearAircraftForm(): void {
  form.value.registry = '';
  form.value.model = '';
  form.value.passengerCapacity = 0;
  form.value.status = 'active';
  form.value.firstFlightDate = '';
  form.value.imageURL = '';
  form.value.airlineId = '';
  form.value.manufacturerId = '';
}

// Hooks
onMounted(() => {
  loadData();
});
</script>

<template>
  <!-- Success Message -->
  <SuccessMessageComponent :success-message="successMessage" />

  <!-- Error Message -->
  <ErrorMessageComponent :error-message="errorMessage" />

  <!-- Form Content -->
  <form :method="'POST'" :class="'space-y-8'" @submit.prevent="submitAircraftCreateForm()">
    <!-- Section: General Information -->
    <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
      <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">
        General Information
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="registry">Registry</label>
          <input
            v-model="form.registry"
            name="registry"
            id="registry"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            placeholder="e.g. N123AA"
            type="text"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="model">Model</label>
          <input
            v-model="form.model"
            name="model"
            id="model"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            placeholder="e.g. Boeing 737-800"
            type="text"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="manufacturer"
            >Manufacturer</label
          >
          <select
            v-model="form.manufacturerId"
            class="w-full bg-white-100 text-black-800 border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            name="manufacturer"
            id="manufacturer"
            required
          >
            <option disabled value="">Select Manufacturer</option>

            <option
              v-for="manufacturer in manufacturers"
              :key="manufacturer.id"
              :value="manufacturer.id"
            >
              {{ manufacturer.name }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="airline">Airline</label>
          <select
            v-model="form.airlineId"
            class="w-full bg-white-100 text-black-800 border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-accent-500"
            name="airline"
            id="airline"
            required
          >
            <option disabled value="">Select Airline</option>

            <option v-for="airline in airlines" :key="airline.id" :value="airline.id">
              {{ airline.name }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Section: Media -->
    <UploadFileComponent v-model:imageURL="form.imageURL" />

    <!-- Section: Additional Specifications -->
    <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
      <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">
        Additional Specifications
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="passengerCapacity"
            >Passenger Capacity</label
          >
          <input
            v-model="form.passengerCapacity"
            name="passengerCapacity"
            id="passengerCapacity"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            type="number"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="firstFlightDate"
            >First Flight Date</label
          >
          <input
            v-model="form.firstFlightDate"
            name="firstFlightDate"
            id="firstFlightDate"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            type="date"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="status">Status</label>
          <select
            v-model="form.status"
            name="status"
            id="status"
            class="w-full bg-white-100 text-black-800 border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-accent-500"
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
        class="px-6 py-3 text-sm font-bold text-black-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        type="button"
        @click="clearAircraftForm()"
      >
        Discard Changes
      </button>

      <button
        class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
        type="submit"
      >
        Save Aircraft Entry
      </button>
    </div>
  </form>
</template>
