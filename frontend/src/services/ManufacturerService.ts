// Developed by Mateo Pineda
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { CreateManufacturerDTO } from '@/dtos/CreateManufacturerDTO';
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
}
