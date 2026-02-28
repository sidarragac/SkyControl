// Developed by Mateo Pineda
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';

export const useManufacturerStore = defineStore('manufacturer', () => {
  const manufacturers = ref<ManufacturerInterface[]>([]);

  return { manufacturers };
});
