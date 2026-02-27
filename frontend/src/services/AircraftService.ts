// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import { useAircraftStore } from '@/stores/AircraftStore';

export class AircraftService {
  static getAircrafts(): AircraftInterface[] {
    return useAircraftStore().aircrafts;
  }
}
