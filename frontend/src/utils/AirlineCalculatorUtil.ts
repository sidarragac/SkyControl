// Developed by Santiago Idárraga
// Internal Imports
import { AircraftService } from '@/services/AircraftService';
import { AirlineService } from '@/services/AirlineService';

export class AirlineCalculatorUtil {
  static calculateAirlineFavouriteAircraft(airlineId: string): string {
    const aircrafts = AircraftService.getAircraftsByAirlineId(airlineId);
    
    if (aircrafts.length === 0) {
      return 'N/A';
    }
  
    const modelCount = new Map<string, number>();
  
    aircrafts.forEach((aircraft) => {
      const currentCount = modelCount.get(aircraft.model) || 0;
      modelCount.set(aircraft.model, currentCount + 1);
    });
  
    let mostRepeatedModel = '';
    let maxCount = 0;
  
    modelCount.forEach((count, model) => {
      if (count > maxCount) {
        maxCount = count;
        mostRepeatedModel = model;
      }
    });
  
    return mostRepeatedModel;
  }

  static calculateAirlineNumberOfDestinations(airlineId: string): number {
    const airline = AirlineService.getAirlineById(airlineId);
    if (!airline) {
      return 0;
    }
    return airline.destinations.length;
  }
}