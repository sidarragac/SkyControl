// Developed by Mateo Pineda, Santiago Idárraga
// External imports
import { v4 as uuidv4 } from 'uuid';

// Internal imports
import type { CreateAircraftDTO } from '@/dtos/aircraftDTO/CreateAircraftDTO';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { UpdateAircraftDTO } from '@/dtos/aircraftDTO/UpdateAircraftDTO';
import { useAircraftStore } from '@/stores/AircraftStore';

export class AircraftService {
  static getAircrafts(): AircraftInterface[] {
    return useAircraftStore().aircrafts;
  }

  static getAircraftById(id: string): AircraftInterface | undefined {
    return useAircraftStore().aircrafts.find((aircraft) => aircraft.id === id);
  }

  static createAircraft(aircraft: CreateAircraftDTO): void {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    useAircraftStore().aircrafts.push({ id, ...aircraft, createdAt, updatedAt });
  }

  static updateAircraft(updatedAircraft: UpdateAircraftDTO): void {
    const index = useAircraftStore().aircrafts.findIndex(
      (aircraft) => aircraft.id === updatedAircraft.id,
    );

    if (index === -1) {
      throw new Error('Aircraft not found');
    }

    useAircraftStore().aircrafts[index] = {
      ...updatedAircraft,
      updatedAt: new Date().toISOString(),
    };
  }

  static deleteAircraft(id: string): void {
    const index = useAircraftStore().aircrafts.findIndex((aircraft) => aircraft.id === id);
    if (index === -1) {
      throw new Error('Aircraft not found');
    }

    useAircraftStore().aircrafts.splice(index, 1);
  }

  static getAircraftsByAirlineId(airlineId: string): AircraftInterface[] {
    return useAircraftStore().aircrafts.filter((aircraft) => aircraft.airlineId === airlineId);
  }
}
