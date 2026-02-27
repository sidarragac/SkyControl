import type { Country } from '../types/SharedTypes';

export interface AirlineInterface {
  id:string;
  name: string;
  country: Country;
  destinations: string[];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}