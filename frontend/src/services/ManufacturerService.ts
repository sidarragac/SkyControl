// Developed by Mateo Pineda
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
import type { EditManufacturerDTO } from '@/dtos/UpdateManufacturerDTO';
import { useManufacturerStore } from '@/stores/ManufacturerStore';

export class ManufacturerService {
  static getManufacturers(): ManufacturerInterface[] {
    return useManufacturerStore().manufacturers;
  }

  static createManufacturer(manufacturer: CreateManufacturerDTO): void {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    useManufacturerStore().manufacturers.push({ id, ...manufacturer, createdAt, updatedAt });
  }

  static updateManufacturer(updatedManufacturer: EditManufacturerDTO): void {
    const index = useManufacturerStore().manufacturers.findIndex(
      (manufacturer) => manufacturer.id === updatedManufacturer.id,
    );

    if (index === -1) {
      throw new Error('Manufacturer not found');
    }

    useManufacturerStore().manufacturers[index] = {
      ...updatedManufacturer,
      updatedAt: new Date(),
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
}
