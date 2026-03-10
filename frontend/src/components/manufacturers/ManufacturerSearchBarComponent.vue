<!-- Developed by Juan Jara -->
<script setup lang="ts">
// Props
defineProps<{
  search: string;
  selectedCountry: string;
  countryOptions: string[];
}>();

// Emits
const emit = defineEmits<{
  'update:search': [value: string];
  'update:selectedCountry': [value: string];
}>();
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <!-- Search -->
    <div class="relative flex-1">
      <i
        class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-black-800/30 text-xs pointer-events-none"
      ></i>
      <input
        :value="search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Search manufacturers by name"
        class="w-full bg-white-100 text-black-800 text-sm rounded-lg pl-9 pr-4 py-2.5 border border-neutral-100 focus:outline-none focus:border-primary-700 placeholder:text-black-800/40 shadow-sm"
      />
    </div>

    <!-- Country filter -->
    <div class="relative">
      <select
        :value="selectedCountry"
        @change="emit('update:selectedCountry', ($event.target as HTMLSelectElement).value)"
        class="appearance-none bg-white-100 text-black-800 text-sm rounded-lg pl-4 pr-8 py-2.5 border border-neutral-100 focus:outline-none focus:border-primary-700 shadow-sm cursor-pointer"
      >
        <option v-for="country in countryOptions" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
      <i
        class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-black-800/40 text-[10px] pointer-events-none"
      ></i>
    </div>
  </div>
</template>
