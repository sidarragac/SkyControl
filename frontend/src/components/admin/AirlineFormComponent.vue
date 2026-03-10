<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref, watch } from 'vue';

// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import { AirlineService } from '@/services/AirlineService';
import { COUNTRIES } from '@/types/SharedTypes';
import { CountryFormatterUtil } from '@/utils/CountryFormatterUtil';
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
import ErrorMessageComponent from './ErrorMessageComponent.vue';
import SuccessMessageComponent from './SuccessMessageComponent.vue';
import type { UpdateAirlineDTO } from '@/dtos/UpdateAirlineDTO';
import UploadFileComponent from '../UploadFileComponent.vue';

// Props
const props = defineProps<{
  modelValue?: AirlineInterface;
  formType: 'create' | 'edit';
}>();

// Emits
const emit = defineEmits(['delete']);

// Reactive variables
const form = ref({
  name: props.modelValue?.name || '',
  country: props.modelValue?.country || 'AF',
  destinations: props.modelValue?.destinations?.join(', ') || '',
  imageURL: props.modelValue?.imageURL || '',
});

const successMessage = ref('');
const errorMessage = ref('');

// Functions
function submitAirlineForm(): void {
  if (!form.value.imageURL) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    if (props.formType === 'create') {
      const newAirline = createAirlineEntry();
      AirlineService.createAirline(newAirline);

      successMessage.value = 'Airline entry created succesfully!';

      clearAirlineForm();
    } else if (props.formType === 'edit' && props.modelValue) {
      const updatedAirline = updateAirlineEntry();
      AirlineService.updateAirline(updatedAirline);

      successMessage.value = 'Airline entry updated successfully!';
    }

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error: Error | unknown) {
    errorMessage.value = `An error occurred in the Airline form. Please try again.<br>Error details: ${(error as Error).message}`;

    setTimeout(() => {
      errorMessage.value = '';
    }, 10000);
  }
}

function createAirlineEntry(): CreateAirlineDTO {
  const newAirline: CreateAirlineDTO = {
    name: form.value.name,
    country: form.value.country,
    destinations: CountryFormatterUtil.formatDestinations(form.value.destinations as string),
    imageURL: form.value.imageURL,
  };

  return newAirline;
}

function updateAirlineEntry(): UpdateAirlineDTO {
  if (!props.modelValue) {
    throw new Error('No airline data provided for update.');
  }

  const updatedAirline: UpdateAirlineDTO = {
    id: props.modelValue.id,
    name: form.value.name,
    country: form.value.country,
    destinations: CountryFormatterUtil.formatDestinations(form.value.destinations as string),
    imageURL: form.value.imageURL,
    createdAt: props.modelValue.createdAt,
  };

  return updatedAirline;
}

function clearAirlineForm(): void {
  form.value.name = '';
  form.value.country = 'AF';
  form.value.destinations = '';
  form.value.imageURL = '';
}

function deleteAirlineEntry(id: string): void {
  if (
    confirm('Are you sure you want to delete this airline entry? This action cannot be undone.')
  ) {
    AirlineService.deleteAirline(id);
    emit('delete');
  }
}

// Watchers
watch(
  () => props.modelValue,
  (newModelValue) => {
    if (newModelValue) {
      form.value.name = newModelValue.name || '';
      form.value.country = newModelValue.country || 'AF';
      form.value.destinations = newModelValue.destinations.join(', ') || '';
      form.value.imageURL = newModelValue.imageURL || '';
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

  <!-- Form Content -->
  <form
    :method="props.formType === 'create' ? 'POST' : 'PUT'"
    :class="['space-y-8', props.formType === 'edit' ? 'px-8 pb-20' : '']"
    @submit.prevent="submitAirlineForm()"
  >
    <!-- Section: General Information -->
    <section class="bg-neutral-100 p-6 rounded-xl border border-neutral-100">
      <h3 class="text-lg text-primary-900 font-bold mb-6 flex items-center gap-2">
        General Information
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="name">Name</label>
          <input
            v-model="form.name"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm text-primary-700 font-semibold" for="country">Country</label>
          <select
            v-model="form.country"
            class="w-full bg-white-100 text-black-800 border border-neutral-100 rounded-lg p-3 text-sm focus:ring-primary focus:border-accent-500 focus:outline-none"
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
          <label class="text-sm text-primary-700 font-semibold" for="destinations"
            >Destinations</label
          >
          <input
            v-model="form.destinations"
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
          :alt="form.name + 'image'"
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

    <!-- Form Actions -->
    <div class="flex items-center justify-end gap-4 pt-4">
      <button
        v-if="props.formType === 'create'"
        class="px-6 py-3 text-sm font-bold text-black-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        type="button"
        @click="clearAirlineForm()"
      >
        Discard Changes
      </button>

      <button
        v-if="props.formType === 'edit'"
        type="button"
        @click="deleteAirlineEntry(props.modelValue?.id as string)"
        class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/50 text-red-700 font-bold hover:bg-red-700 hover:text-white-100 transition-all cursor-pointer"
      >
        <i class="fas fa-trash text-lg"></i>
        Delete Airline
      </button>

      <button
        class="px-8 py-3 text-sm font-bold text-black-900 bg-accent-500 hover:bg-accent-500/90 rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer"
        type="submit"
      >
        Save Airline Entry
      </button>
    </div>
  </form>
</template>
