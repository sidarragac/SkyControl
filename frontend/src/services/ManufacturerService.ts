// Developed by Mateo Pineda, Juan Jara
// External imports
import axios from 'axios';

// Internal imports
import type { CreateManufacturerDTO } from '@/dtos/manufacturerDTO/CreateManufacturerDTO';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { UpdateManufacturerDTO } from '@/dtos/manufacturerDTO/UpdateManufacturerDTO';

export class ManufacturerService {
  private static readonly apiUrl = import.meta.env.VITE_API_BASE_URL;

  static async getManufacturers(): Promise<ManufacturerInterface[]> {
    const response = await axios.get(`${this.apiUrl}manufacturers`);
    return response.data;
  }

  static async getManufacturerById(id: string): Promise<ManufacturerInterface> {
    const response = await axios.get(`${this.apiUrl}manufacturers/${id}`);
    return response.data;
  }

  static async createManufacturer(
    manufacturer: CreateManufacturerDTO,
  ): Promise<ManufacturerInterface> {
    const response = await axios.post(`${this.apiUrl}manufacturers`, manufacturer);
    return response.data;
  }

  static async updateManufacturer(
    manufacturer: UpdateManufacturerDTO,
    manufacturerId: string,
  ): Promise<ManufacturerInterface> {
    const response = await axios.patch(
      `${this.apiUrl}manufacturers/${manufacturerId}`,
      manufacturer,
    );
    return response.data;
  }

  static async deleteManufacturer(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}manufacturers/${id}`);
  }
}
