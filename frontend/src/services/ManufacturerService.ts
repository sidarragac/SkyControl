// Developed by Mateo Pineda, Juan Jara
// External imports
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { Ref } from 'vue';

// Internal imports
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { UpdateManufacturerDTO } from '@/dtos/UpdateManufacturerDTO';
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

  // Dashboard helpers
  static getManufacturersCount(): ComputedRef<number> {
    const store = useManufacturerStore();

    return computed(() => store.manufacturers.length);
  }

  static getTopManufacturers(
    fleetPresenceMap: Ref<Record<string, number>>,
  ): ComputedRef<{ name: string; count: number }[]> {
    const store = useManufacturerStore();

    return computed(() =>
      store.manufacturers
        .map((m) => ({ name: m.name, count: fleetPresenceMap.value[m.id] ?? 0 }))
        .filter((m) => m.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 4),
    );
  }

  static getCountryOptions(): ComputedRef<string[]> {
    const store = useManufacturerStore();

    return computed(() => {
      const countries = store.manufacturers.map((m) => m.country);
      return ['All Countries', ...Array.from(new Set(countries)).sort()];
    });
  }

  static getFilteredManufacturers(
    search: Ref<string>,
    selectedCountry: Ref<string>,
    fleetPresenceMap: Ref<Record<string, number>>,
  ): ComputedRef<ManufacturerInterface[]> {
    const store = useManufacturerStore();

    return computed(() =>
      store.manufacturers.filter((m) => {
        const matchesSearch =
          search.value === '' ||
          m.name.toLowerCase().includes(search.value.toLowerCase()) ||
          m.country.toLowerCase().includes(search.value.toLowerCase());
        const matchesCountry =
          selectedCountry.value === 'All Countries' || m.country === selectedCountry.value;

        return matchesSearch && matchesCountry;
      }),
    );
  }

  static getMarketShareData(
    fleetPresenceMap: Ref<Record<string, number>>,
  ): ComputedRef<{ name: string; value: number }[]> {
    const store = useManufacturerStore();

    return computed(() => {
      const total = Object.values(fleetPresenceMap.value).reduce((a, b) => a + b, 0) || 1;

      return store.manufacturers.map((m) => ({
        name: m.name.split(' ')[0] ?? m.name,
        value: Math.round(((fleetPresenceMap.value[m.id] ?? 0) / total) * 100 * 10) / 10,
      }));
    });
  }

  static getProductionVolumeData(
    fleetPresenceMap: Ref<Record<string, number>>,
  ): ComputedRef<{ name: string; value: number }[]> {
    const store = useManufacturerStore();

    return computed(() =>
      store.manufacturers.map((m) => ({
        name: m.name.split(' ')[0] ?? m.name,
        value: fleetPresenceMap.value[m.id] ?? 0,
      })),
    );
  }

  static getTotalProductionVolume(
    fleetPresenceMap: Ref<Record<string, number>>,
  ): ComputedRef<number> {
    return computed(() => Object.values(fleetPresenceMap.value).reduce((a, b) => a + b, 0));
  }
}
