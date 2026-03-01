// Developed by Mateo Pineda
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';

export const useManufacturerStore = defineStore('manufacturer', () => {
  const manufacturers = ref<ManufacturerInterface[]>([]);

  return { manufacturers };
});
