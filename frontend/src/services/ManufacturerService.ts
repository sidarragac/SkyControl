// Developed by Mateo Pineda, Juan Jara
// External imports
import axios from 'axios';

// Internal imports
import type { CreateManufacturerDTO } from '@/dtos/manufacturerDTO/CreateManufacturerDTO';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { UpdateManufacturerDTO } from '@/dtos/manufacturerDTO/UpdateManufacturerDTO';

let manufacturerCache: Map<string, ManufacturerInterface> = new Map();

export class ManufacturerService {
  private static readonly API_URL = 'http://localhost:3000/api/';

  static async loadCache(): Promise<void> {
    const manufacturers = await ManufacturerService.getManufacturers();
    manufacturerCache = new Map(manufacturers.map((m) => [m.id, m]));
  }

  static getManufacturerByIdSync(id: string): ManufacturerInterface | undefined {
    return manufacturerCache.get(id);
  }

  static async getManufacturers(): Promise<ManufacturerInterface[]> {
    const response = await axios.get(`${ManufacturerService.API_URL}manufacturers`);
    return response.data;
  }

  static async getManufacturerById(id: string): Promise<ManufacturerInterface> {
    const response = await axios.get(`${ManufacturerService.API_URL}manufacturers/${id}`);
    return response.data;
  }

  static async createManufacturer(manufacturer: CreateManufacturerDTO): Promise<ManufacturerInterface> {
    const response = await axios.post(`${ManufacturerService.API_URL}manufacturers`, manufacturer);
    return response.data;
  }

  static async updateManufacturer(manufacturer: UpdateManufacturerDTO): Promise<ManufacturerInterface> {
    const response = await axios.patch(`${ManufacturerService.API_URL}manufacturers/${manufacturer.id}`, manufacturer);
    return response.data;
  }

  static async deleteManufacturer(id: string): Promise<void> {
    await axios.delete(`${ManufacturerService.API_URL}manufacturers/${id}`);
  }
}
