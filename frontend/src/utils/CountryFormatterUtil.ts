// Developed by Mateo Pineda
// Internal imports
import { COUNTRIES, type Country } from '@/types/SharedTypes';

export class CountryFormatterUtil {
  static formatDestinations(destinations: string): Country[] {
    const destinationsArray = destinations
      .split(',')
      .map((dest) => dest.trim().toUpperCase())
      .filter((dest): dest is Country => COUNTRIES.includes(dest as Country));

    if (destinationsArray.length === 0) {
      throw new Error('No valid country codes found in the input string.');
    }

    return destinationsArray;
  }
}
