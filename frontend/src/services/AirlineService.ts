// Developed by Mateo Pineda, Juan Jara, Santiago Idárraga
// External imports
import axios from 'axios';

// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { CreateAirlineDTO } from '@/dtos/airlineDTO/CreateAirlineDTO';
import type { UpdateAirlineDTO } from '@/dtos/airlineDTO/UpdateAirlineDTO';

export class AirlineService {
  private static readonly apiUrl = import.meta.env.VITE_API_BASE_URL;

  static async getAirlines(): Promise<AirlineInterface[]> {
    const airlines = await axios.get(`${AirlineService.apiUrl}airlines`)
      .then((response) => response.data);

    return airlines;
  }

  static async getAirlineById(id: string): Promise<AirlineInterface> {
    const airline = await axios.get(`${AirlineService.apiUrl}airlines/${id}`)
      .then((response) => response.data);

    return airline;
  }

  static async createAirline(airline: CreateAirlineDTO): Promise<AirlineInterface> {
    const createdAirline = await axios.post(`${AirlineService.apiUrl}airlines`, airline)
      .then((response) => response.data);

    return createdAirline;
  }

  static async updateAirline(airline: UpdateAirlineDTO, airlineId: string): Promise<AirlineInterface> {
    const updatedAirline = await axios.patch(`${AirlineService.apiUrl}airlines/${airlineId}`, airline)
      .then((response) => response.data);

    return updatedAirline;
  }

  static async deleteAirline(id: string): Promise<void> {
    await axios.delete(`${AirlineService.apiUrl}airlines/${id}`);
  }
}
