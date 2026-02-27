// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { CreateAirCraftDTO } from '@/dtos/CreateAircraftDTO';
import { useAircraftStore } from '@/stores/AircraftStore';

export class AircraftService {
  static getAircrafts(): AircraftInterface[] {
    return useAircraftStore().aircrafts;
  }

  static createAircraft(aircraft: CreateAirCraftDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    useAircraftStore().aircrafts.push({ id, ...aircraft, createdAt, updatedAt });
  }
}
