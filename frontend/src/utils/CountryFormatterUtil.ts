// Developed by Mateo Pineda
import { COUNTRIES, type Country } from '@/types/SharedTypes';

export class CountryFormatterUtil {
  static formatDestinations(destinations: string): Country[] {
    return destinations
      .split(',')
      .map((dest) => dest.trim().toUpperCase())
      .filter((dest): dest is Country => COUNTRIES.includes(dest as Country));
  }
}
