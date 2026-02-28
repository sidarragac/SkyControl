// Developed by Mateo Pineda
import type { Status } from '@/types/AircraftTypes';

export interface AircraftInterface {
  id: string;
  registry: string;
  model: string;
  passengerCapacity: number;
  status: Status;
  firstFlightDate: Date;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
