import type { Country } from '../types/SharedTypes';

export interface AirlineInterface {
  id: string;
  name: string;
  country: Country;
  foundationDate: Date;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}
