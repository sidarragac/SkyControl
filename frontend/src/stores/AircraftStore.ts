// Developed by Mateo Pineda
// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { AircraftInterface } from '@/interfaces/AircraftInterface';

export const useAircraftStore = defineStore('aircraft', () => {
  const aircrafts = ref<AircraftInterface[]>([]);

  return { aircrafts };
});
