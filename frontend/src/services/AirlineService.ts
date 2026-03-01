// Developed by Mateo Pineda
// Internal imports
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { UpdateAirlineDTO } from '@/dtos/UpdateAirlineDTO';
import { useAirlineStore } from '@/stores/AirlineStore';

export class AirlineService {
  static getAirlines(): AirlineInterface[] {
    return useAirlineStore().airlines;
  }

  static createAirline(airline: CreateAirlineDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    useAirlineStore().airlines.push({ id, ...airline, createdAt, updatedAt });
  }

  static updateAirline(updatedAirline: UpdateAirlineDTO): void {
    const index = useAirlineStore().airlines.findIndex(
      (airline) => airline.id === updatedAirline.id,
    );

    if (index === -1) {
      throw new Error('Airline not found');
    }

    useAirlineStore().airlines[index] = {
      ...updatedAirline,
      updatedAt: new Date(),
    };
  }

  static deleteAirline(id: string): void {
    const index = useAirlineStore().airlines.findIndex((airline) => airline.id === id);

    if (index === -1) {
      throw new Error('Airline not found');
    }

    useAirlineStore().airlines.splice(index, 1);
  }
}
