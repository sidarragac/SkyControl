// Developed by Mateo Pineda, Juan Jara, Santiago Idárraga
// External imports
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { Country } from '@/types/SharedTypes';
import { COUNTRY_COORDINATES } from '@/types/SharedTypes';
import type { CreateAirlineDTO } from '@/dtos/CreateAirlineDTO';
import type { UpdateAirlineDTO } from '@/dtos/UpdateAirlineDTO';
import { useAirlineStore } from '@/stores/AirlineStore';
import type { MapData } from '@/interfaces/MapDataInterface';

export class AirlineService {
  static getAirlines(): AirlineInterface[] {
    return useAirlineStore().airlines;
  }

  static getAirlineById(id: string): AirlineInterface | undefined {
    return useAirlineStore().airlines.find((airline) => airline.id === id);
  }

  static createAirline(airline: CreateAirlineDTO): void {
    const id = crypto.randomUUID();
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
  static getActiveAirlinesCount(): ComputedRef<number> {
    const store = useAirlineStore();

    return computed(() => store.airlines.length);
  }

  static getAirlinesMapData(): ComputedRef<MapData[]> {
    const store = useAirlineStore();

    return computed(() => {
      const countryMap: Partial<Record<Country, number>> = {};

      for (const airline of store.airlines) {
        const country = airline.country as Country;
        countryMap[country] = (countryMap[country] ?? 0) + 1;
      }

      const result: MapData[] = [];

      for (const [country, airlineCount] of Object.entries(countryMap)) {
        const coords = COUNTRY_COORDINATES[country as Country];

        if (!coords || airlineCount === undefined) continue;

        result.push({
          country: country as Country,
          airlineCount,
          lat: coords.lat,
          lng: coords.lng,
        });
      }

      return result;
    });
  }
}
