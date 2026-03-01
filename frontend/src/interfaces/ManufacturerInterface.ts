// Developed by Mateo Pineda
// Internal imports
import type { Country } from '@/types/SharedTypes';

export interface ManufacturerInterface {
  id: string;
  name: string;
  country: Country;
  foundationDate: Date;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
