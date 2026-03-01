// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { CreateAircraftDTO } from '@/dtos/CreateAircraftDTO';
import type { UpdateAircraftDTO } from '@/dtos/UpdateAircraftDTO';
import { useAircraftStore } from '@/stores/AircraftStore';

export class AircraftService {
  static getAircrafts(): AircraftInterface[] {
    return useAircraftStore().aircrafts;
  }

  static createAircraft(aircraft: CreateAircraftDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

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
      updatedAt: new Date(),
    };
  }

  static deleteAircraft(id: string): void {
    const index = useAircraftStore().aircrafts.findIndex((aircraft) => aircraft.id === id);

    if (index === -1) {
      throw new Error('Aircraft not found');
    }

    useAircraftStore().aircrafts.splice(index, 1);
  }
}
