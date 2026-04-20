// Developed by Mateo Pineda
// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface';
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface';
import type { Status } from '@/types/AircraftTypes';

export interface AircraftInterface {
  id: string;
  registry: string;
  model: string;
  passengerCapacity: number;
  status: Status;
  firstFlightDate: string;
  imageURL: string;
  airline: AirlineInterface;
  manufacturer: ManufacturerInterface;
  createdAt: string;
  updatedAt: string;
}
