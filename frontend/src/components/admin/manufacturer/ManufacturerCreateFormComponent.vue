<!-- Developed by Mateo Pineda -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import { ManufacturerService } from '@/services/ManufacturerService';
import { COUNTRIES } from '@/types/SharedTypes';
import type { Country } from '@/types/SharedTypes';
import type { CreateManufacturerDTO } from '@/dtos/manufacturerDTO/CreateManufacturerDTO';
import ErrorMessageComponent from '../ErrorMessageComponent.vue';
import SuccessMessageComponent from '../SuccessMessageComponent.vue';
import UploadFileComponent from '../UploadFileComponent.vue';

// Reactive variables
const form = ref({
  name: '',
  country: 'AF',
  foundationDate: '',
  imageURL: '',
});

const successMessage = ref('');
const errorMessage = ref('');

// Functions
function submitManufacturerCreateForm(): void {
  if (!form.value.imageURL) {
    alert('Please upload an image before submitting the form.');
    return;
  }

  try {
    const newManufacturer = createManufacturerEntry();
    ManufacturerService.createManufacturer(newManufacturer);

    successMessage.value = 'Manufacturer entry created succesfully!';

    clearManufacturerForm();

    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error: Error | unknown) {
    errorMessage.value = `An error occurred in the Manufacturer form. Please try again.<br>Error details: ${(error as Error).message}`;

    setTimeout(() => {
      errorMessage.value = '';
    }, 10000);
  }
}

function createManufacturerEntry(): CreateManufacturerDTO {
  const newManufacturer: CreateManufacturerDTO = {
    name: form.value.name,
    country: form.value.country as Country,
    foundationDate: new Date(form.value.foundationDate).toISOString(),
    imageURL: form.value.imageURL,
  };

  return newManufacturer;
}

function clearManufacturerForm(): void {
  form.value.name = '';
  form.value.country = 'AF';
  form.value.foundationDate = '';
  form.value.imageURL = '';
}
</script>

<template>
  <!-- Success Message -->
  <SuccessMessageComponent :success-message="successMessage" />

  <!-- Error Message -->
  <ErrorMessageComponent :error-message="errorMessage" />

  <!-- Form Content -->
  <form :method="'POST'" :class="'space-y-8'" @submit.prevent="submitManufacturerCreateForm()">
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
          <label class="text-sm text-primary-700 font-semibold" for="foundationDate"
            >Foundation Date</label
          >
          <input
            v-model="form.foundationDate"
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
    <UploadFileComponent v-model:imageURL="form.imageURL" />

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
</template>
