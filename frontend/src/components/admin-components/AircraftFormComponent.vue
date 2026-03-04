<script setup lang="ts">
// External imports
import { ref, watch } from 'vue';

// Internal imports
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';
import type { CreateAircraftDTO } from '@/dtos/CreateAircraftDTO';
import ErrorMessageComponent from './ErrorMessageComponent.vue';
import { ManufacturerService } from '@/services/ManufacturerService';
import SuccessMessageComponent from './SuccessMessageComponent.vue';
import type { UpdateAircraftDTO } from '@/dtos/UpdateAircraftDTO';
import UploadFileComponent from '../UploadFileComponent.vue';

// Props
const props = defineProps<{
  modelValue?: AircraftInterface;
  formType: 'create' | 'edit';
}>();

// Emits
const emit = defineEmits(['delete']);

// Reactive variables
const form = ref({
  registry: props.modelValue?.registry || '',
  model: props.modelValue?.model || '',
  passengerCapacity: props.modelValue?.passengerCapacity || 0,
  status: props.modelValue?.status || 'active',
  firstFlightDate: props.modelValue?.firstFlightDate.split('T')[0] || '',
  imageURL: props.modelValue?.imageURL || '',
  airlineId: props.modelValue?.airlineId || '',
  manufacturerId: props.modelValue?.manufacturerId || '',
});

const manufacturers = ManufacturerService.getManufacturers();
const airlines = AirlineService.getAirlines();
const successMessage = ref('');
const errorMessage = ref('');

// Functions
function submitAircraftForm(): void {
  if (!form.value.imageURL) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    if (props.formType === 'create') {
      const newAircraft = createAircraftEntry();
      AircraftService.createAircraft(newAircraft);

      successMessage.value = 'Aircraft entry created succesfully!';

      clearAircraftForm();
    } else if (props.formType === 'edit' && props.modelValue) {
      const updatedAircraft = updateAircraftEntry();
      AircraftService.updateAircraft(updatedAircraft);

      successMessage.value = 'Aircraft entry updated successfully!';
    }

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
    status: form.value.status,
    firstFlightDate: new Date(form.value.firstFlightDate).toISOString(),
    imageURL: form.value.imageURL,
    airlineId: form.value.airlineId,
    manufacturerId: form.value.manufacturerId,
  };

  return newAircraft;
}

function updateAircraftEntry(): UpdateAircraftDTO {
  if (!props.modelValue) {
    throw new Error('No aircraft data provided for update.');
  }

  const updatedAircraft: UpdateAircraftDTO = {
    id: props.modelValue.id,
    registry: form.value.registry,
    model: form.value.model,
    passengerCapacity: Number(form.value.passengerCapacity),
    status: form.value.status,
    firstFlightDate: new Date(form.value.firstFlightDate).toISOString(),
    imageURL: form.value.imageURL,
    airlineId: form.value.airlineId,
    manufacturerId: form.value.manufacturerId,
    createdAt: props.modelValue.createdAt,
  };

  return updatedAircraft;
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

function deleteAircraftEntry(id: string): void {
  if (
    confirm('Are you sure you want to delete this aircraft entry? This action cannot be undone.')
  ) {
    AircraftService.deleteAircraft(id);
    emit('delete');
  }
}

// Watchers
watch(
  () => props.modelValue,
  (newModelValue) => {
    if (newModelValue) {
      form.value.registry = newModelValue.registry || '';
      form.value.model = newModelValue.model || '';
      form.value.passengerCapacity = newModelValue.passengerCapacity || 0;
      form.value.status = newModelValue.status || 'active';
      form.value.firstFlightDate = newModelValue.firstFlightDate?.split('T')[0] || '';
      form.value.imageURL = newModelValue.imageURL || '';
      form.value.airlineId = newModelValue.airlineId || '';
      form.value.manufacturerId = newModelValue.manufacturerId || '';
    }
  },
);
</script>

<template>
  <!-- Success Message -->
  <SuccessMessageComponent
    :class="props.formType === 'edit' ? 'mx-8' : ''"
    :success-message="successMessage"
  />

  <!-- Error Message -->
  <ErrorMessageComponent
    :class="props.formType === 'edit' ? 'mx-8' : ''"
    :error-message="errorMessage"
  />

  <form
    :method="props.formType === 'create' ? 'POST' : 'PUT'"
    :class="['space-y-8', props.formType === 'edit' ? 'px-8 pb-20' : '']"
    @submit.prevent="submitAircraftForm()"
  >
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
    <UploadFileComponent v-if="props.formType === 'create'" v-model:imageURL="form.imageURL" />

    <div
      v-if="props.formType === 'edit'"
      class="p-6 rounded-xl border border-neutral-100 bg-neutral-100 flex"
    >
      <div class="flex-1 flex flex-col">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-primary-900">
          Selected Media
        </h3>
        <img
          v-if="form.imageURL"
          :src="form.imageURL"
          :alt="form.model + 'image'"
          class="w-48 h-48 object-cover rounded-lg border border-primary-700/20 self-center my-auto"
        />
        <span v-else class="text-sm text-primary-700 self-center my-auto">No image available</span>
      </div>

      <UploadFileComponent
        class="border-none flex-2 p-0!"
        v-model:imageURL="form.imageURL"
        :preview="false"
      />
    </div>

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
        v-if="props.formType === 'create'"
        class="px-6 py-3 text-sm font-bold text-black-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        type="button"
        @click="clearAircraftForm()"
      >
        Discard Changes
      </button>

      <button
        v-if="props.formType === 'edit'"
        type="button"
        @click="deleteAircraftEntry(props.modelValue?.id as string)"
        class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-700 font-bold hover:bg-red-700 hover:text-white-100 transition-all cursor-pointer"
      >
        <i class="fas fa-trash text-lg"></i>
        Delete Aircraft
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
