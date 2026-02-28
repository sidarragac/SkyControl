// Developed by Mateo Pineda
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
