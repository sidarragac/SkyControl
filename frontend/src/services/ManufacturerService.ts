// Developed by Mateo Pineda, Juan Jara
// Internal imports
import { apiRequest } from '@/api/api';
import type { CreateManufacturerDTO } from '@/dtos/manufacturerDTO/CreateManufacturerDTO';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { UpdateManufacturerDTO } from '@/dtos/manufacturerDTO/UpdateManufacturerDTO';

let manufacturerCache: Map<string, ManufacturerInterface> = new Map();

export class ManufacturerService {
  static async loadCache(): Promise<void> {
    const manufacturers = await ManufacturerService.getManufacturers();
    manufacturerCache = new Map(manufacturers.map((m) => [m.id, m]));
  }

  static getManufacturerByIdSync(id: string): ManufacturerInterface | undefined {
    return manufacturerCache.get(id);
  }

  static async getManufacturers(): Promise<ManufacturerInterface[]> {
    return await apiRequest<ManufacturerInterface[]>('/manufacturers');
  }

  static async getManufacturerById(id: string): Promise<ManufacturerInterface> {
    return await apiRequest<ManufacturerInterface>(`/manufacturers/${id}`);
  }

  static async createManufacturer(
    manufacturer: CreateManufacturerDTO,
  ): Promise<ManufacturerInterface> {
    return await apiRequest<ManufacturerInterface>('/manufacturers', {
      method: 'POST',
      body: JSON.stringify(manufacturer),
    });
  }

  static async updateManufacturer(
    manufacturer: UpdateManufacturerDTO,
  ): Promise<ManufacturerInterface> {
    return await apiRequest<ManufacturerInterface>(`/manufacturers/${manufacturer.id}`, {
      method: 'PATCH',
      body: JSON.stringify(manufacturer),
    });
  }

  static async deleteManufacturer(id: string): Promise<void> {
    await apiRequest<void>(`/manufacturers/${id}`, { method: 'DELETE' });
  }
}
