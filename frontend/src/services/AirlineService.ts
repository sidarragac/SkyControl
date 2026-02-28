// Developed by Mateo Pineda
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
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
}
