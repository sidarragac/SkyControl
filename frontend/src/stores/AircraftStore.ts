// Developed by Mateo Pineda
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';

export const useAircraftStore = defineStore('aircraft', () => {
  const aircrafts = ref<AircraftInterface[]>([]);

  return { aircrafts };
});
