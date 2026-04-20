<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import { AirlineService } from '@/services/AirlineService';
import { COUNTRIES } from '@/types/SharedTypes';
import type { Country } from '@/types/SharedTypes';
import { CountryFormatterUtil } from '@/utils/CountryFormatterUtil';
import type { CreateAirlineDTO } from '@/dtos/airlineDTO/CreateAirlineDTO';
import ErrorMessageComponent from '../ErrorMessageComponent.vue';
import SuccessMessageComponent from '../SuccessMessageComponent.vue';
import UploadFileComponent from '../UploadFileComponent.vue';

// Reactive variables
const form = ref({
  name: '',
  country: 'AF',
  destinations: '',
  imageURL: '',
});

const successMessage = ref('');
const errorMessage = ref('');

// Functions
async function submitAirlineCreateForm(): Promise<void> {
  if (!form.value.imageURL) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    const newAirline = createAirlineEntry();
    await AirlineService.createAirline(newAirline);

    successMessage.value = 'Airline entry created succesfully!';

    clearAirlineForm();

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
    country: form.value.country as Country,
    destinations: CountryFormatterUtil.formatDestinations(form.value.destinations as string),
    imageURL: form.value.imageURL,
  };

  return newAirline;
}

function clearAirlineForm(): void {
  form.value.name = '';
  form.value.country = 'AF';
  form.value.destinations = '';
  form.value.imageURL = '';
}
</script>

<template>
  <!-- Success Message -->
  <SuccessMessageComponent :success-message="successMessage" />

  <!-- Error Message -->
  <ErrorMessageComponent :error-message="errorMessage" />

  <!-- Form Content -->
  <form :method="'POST'" :class="'space-y-8'" @submit.prevent="submitAirlineCreateForm()">
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
    <UploadFileComponent v-model:imageURL="form.imageURL" />

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
</template>
