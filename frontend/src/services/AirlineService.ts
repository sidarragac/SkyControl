// Developed by Mateo Pineda, Juan Jara, Santiago Idárraga
// External imports
import { v4 as uuidv4 } from 'uuid';

// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import { AircraftService } from './AircraftService';
import type { CreateAirlineDTO } from '@/dtos/airlineDTO/CreateAirlineDTO';
import type { UpdateAirlineDTO } from '@/dtos/airlineDTO/UpdateAirlineDTO';
import { useAirlineStore } from '@/stores/AirlineStore';

export class AirlineService {
  static getAirlines(): AirlineInterface[] {
    return useAirlineStore().airlines;
  }

  static getAirlineById(id: string): AirlineInterface | undefined {
    return useAirlineStore().airlines.find((airline) => airline.id === id);
  }

  static createAirline(airline: CreateAirlineDTO): void {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

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
      updatedAt: new Date().toISOString(),
    };
  }

  static deleteAirline(id: string): void {
    const index = useAirlineStore().airlines.findIndex((airline) => airline.id === id);

    if (index === -1) {
      throw new Error('Airline not found');
    }

    useAirlineStore().airlines.splice(index, 1);
  }

  // Dashboard helpers
  static getNumberOfDestinations(airlineId: string): number {
    const airline = AirlineService.getAirlineById(airlineId);

    if (!airline) {
      return 0;
    }

    return airline.destinations.length;
  }

  static getMostCommonAircraft(airlineId: string): string {
    const aircrafts = AircraftService.getAircraftsByAirlineId(airlineId);

    if (aircrafts.length === 0) {
      return 'N/A';
    }

    const modelCount = new Map<string, number>();

    aircrafts.forEach((aircraft) => {
      const currentCount = modelCount.get(aircraft.model) || 0;
      modelCount.set(aircraft.model, currentCount + 1);
    });

    let mostRepeatedModel = '';
    let maxCount = 0;

    modelCount.forEach((count, model) => {
      if (count > maxCount) {
        maxCount = count;
        mostRepeatedModel = model;
      }
    });

    return mostRepeatedModel;
  }
}
