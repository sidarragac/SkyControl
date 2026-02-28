// Developed by Mateo Pineda
import type { AirlineInterface } from '@/interfaces/AirlineInterface.js';

export type CreateAirlineDTO = Omit<AirlineInterface, 'id' | 'createdAt' | 'updatedAt'>;
