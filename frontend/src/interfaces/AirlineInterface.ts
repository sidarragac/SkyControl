// Developed by Mateo Pineda
// Internal imports
import type { Country } from '@/types/SharedTypes';

export interface AirlineInterface {
  id: string;
  name: string;
  country: Country;
  destinations: Country[];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
