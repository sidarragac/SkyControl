// Developed by Mateo Pineda
// Internal imports
import type { AirlineInterface } from '@/interfaces/AirlineInterface.js';

export type CreateAirlineDTO = Omit<AirlineInterface, 'id' | 'createdAt' | 'updatedAt'>;
