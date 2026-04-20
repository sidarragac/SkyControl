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
    console.log(AircraftService.apiUrl);
    return await axios.get(`${AircraftService.apiUrl}aircrafts`)
      .then((response) => response.data);
  }

  static async getAircraftById(id: string): Promise<AircraftInterface | undefined> {
    return await axios.get(`${AircraftService.apiUrl}aircrafts/${id}`)
      .then((response) => response.data);
  }

  static async createAircraft(aircraft: CreateAircraftDTO): Promise<AircraftInterface> {
    const createdAircraft = await axios.post(`${AircraftService.apiUrl}aircrafts`, aircraft)
      .then((response) => response.data);

    return createdAircraft;
  }

  static async updateAircraft(aircraft: UpdateAircraftDTO): Promise<AircraftInterface> {
    const updatedAircraft = await axios.patch(`${AircraftService.apiUrl}aircrafts/${aircraft.id}`, aircraft)
      .then((response) => response.data);

    return updatedAircraft;
  }

  static async deleteAircraft(id: string): Promise<void> {
    await axios.delete(`${AircraftService.apiUrl}aircrafts/${id}`);
  }

  static async getAircraftsByAirlineId(airlineId: string): Promise<AircraftInterface[]> {
    const aircrafts = await AircraftService.getAircrafts();

    return aircrafts.filter((aircraft) => aircraft.airline.id === airlineId);
  }
}
