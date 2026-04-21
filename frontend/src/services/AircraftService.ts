// Developed by Mateo Pineda, Santiago Idárraga
// External imports
import axios from 'axios';

// Internal imports
import type { CreateAircraftDTO } from '@/dtos/aircraftDTO/CreateAircraftDTO';
import type { AircraftInterface } from '@/interfaces/AircraftInterface';
import type { UpdateAircraftDTO } from '@/dtos/aircraftDTO/UpdateAircraftDTO';

export class AircraftService {
  private static readonly apiUrl = import.meta.env.VITE_API_BASE_URL;

  static async getAircrafts(): Promise<AircraftInterface[]> {
    return await axios.get(`${this.apiUrl}aircrafts`).then((response) => response.data);
  }

  static async getAircraftById(id: string): Promise<AircraftInterface | undefined> {
    return await axios.get(`${this.apiUrl}aircrafts/${id}`).then((response) => response.data);
  }

  static async createAircraft(aircraft: CreateAircraftDTO): Promise<AircraftInterface> {
    const createdAircraft = await axios
      .post(`${this.apiUrl}aircrafts`, aircraft)
      .then((response) => response.data);

    return createdAircraft;
  }

  static async updateAircraft(
    aircraft: UpdateAircraftDTO,
    aircraftId: string,
  ): Promise<AircraftInterface> {
    const updatedAircraft = await axios
      .patch(`${this.apiUrl}aircrafts/${aircraftId}`, aircraft)
      .then((response) => response.data);

    return updatedAircraft;
  }

  static async deleteAircraft(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}aircrafts/${id}`);
  }
}
