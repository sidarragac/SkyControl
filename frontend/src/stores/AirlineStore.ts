// Developed by Mateo Pineda
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';

export const useAirlineStore = defineStore('airline', () => {
  const airlines = ref<AirlineInterface[]>([]);

  return { airlines };
});
