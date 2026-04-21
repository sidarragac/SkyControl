// Developed by Mateo Pineda
// Internal imports
import type { AircraftInterface } from '@/interfaces/AircraftInterface.js';

export type UpdateAircraftDTO = Omit<
  AircraftInterface,
  'id' | 'airline' | 'manufacturer' | 'createdAt' | 'updatedAt'
> & {
  airlineId: string;
  manufacturerId: string;
};
