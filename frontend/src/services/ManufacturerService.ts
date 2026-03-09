// Developed by Mateo Pineda, Juan Jara
// External imports
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
// Internal imports
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { UpdateManufacturerDTO } from '@/dtos/UpdateManufacturerDTO';
import { useAircraftStore } from '@/stores/AircraftStore';
import { useManufacturerStore } from '@/stores/ManufacturerStore';

export class ManufacturerService {
  static getManufacturers(): ManufacturerInterface[] {
    return useManufacturerStore().manufacturers;
  }

  static getManufacturerById(id: string): ManufacturerInterface | undefined {
    return useManufacturerStore().manufacturers.find((manufacturer) => manufacturer.id === id);
  }

  static createManufacturer(manufacturer: CreateManufacturerDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    useManufacturerStore().manufacturers.push({ id, ...manufacturer, createdAt, updatedAt });
  }

  static updateManufacturer(updatedManufacturer: UpdateManufacturerDTO): void {
    const index = useManufacturerStore().manufacturers.findIndex(
      (manufacturer) => manufacturer.id === updatedManufacturer.id,
    );
    if (index === -1) {
      throw new Error('Manufacturer not found');
    }
    useManufacturerStore().manufacturers[index] = {
      ...updatedManufacturer,
      updatedAt: new Date().toISOString(),
    };
  }

  static deleteManufacturer(id: string): void {
    const index = useManufacturerStore().manufacturers.findIndex(
      (manufacturer) => manufacturer.id === id,
    );
    if (index === -1) {
      throw new Error('Manufacturer not found');
    }
    useManufacturerStore().manufacturers.splice(index, 1);
  }

  static getManufacturersCount(): ComputedRef<number> {
    const store = useManufacturerStore();
    return computed(() => store.manufacturers.length);
  }

  static getTopManufacturers(): ComputedRef<{ name: string; count: number }[]> {
    const aircraftStore = useAircraftStore();
    const manufacturerStore = useManufacturerStore();
    return computed(() => {
      const counts: Record<string, { name: string; count: number }> = {};
      aircraftStore.aircrafts.forEach((aircraft) => {
        const manufacturer = manufacturerStore.manufacturers.find(
          (m) => m.id === aircraft.manufacturerId,
        );
        if (!manufacturer) return;
        let entry = counts[manufacturer.id];
        if (!entry) {
          entry = counts[manufacturer.id] = { name: manufacturer.name, count: 0 };
        }
        entry.count++;
      });
      return Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);
    });
  }
}
