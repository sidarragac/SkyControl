// Developed by Mateo Pineda
// Internal imports
import type { Status } from '@/types/AircraftTypes';

export interface AircraftInterface {
  id: string;
  registry: string;
  model: string;
  passengerCapacity: number;
  status: Status;
  firstFlightDate: string;
  imageURL: string;
  airlineId: string;
  manufacturerId: string;
  createdAt: string;
  updatedAt: string;
}
