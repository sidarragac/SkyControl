// Developed by Mateo Pineda
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AirlineInterface } from '@/interfaces/AirlineInterface';

export const useAirlineStore = defineStore('airline', () => {
  const airlines = ref<AirlineInterface[]>([]);

  return { airlines };
});
