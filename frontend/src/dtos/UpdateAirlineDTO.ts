// Developed by Mateo Pineda
import type { AirlineInterface } from '@/interfaces/AirlineInterface.js';

export type UpdateAirlineDTO = Omit<AirlineInterface, 'updatedAt'>;
