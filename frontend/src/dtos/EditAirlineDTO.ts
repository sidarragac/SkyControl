// Developed by Mateo Pineda
import type { AirlineInterface } from '@/interfaces/AirlineInterface.js';

export type EditAirlineDTO = Omit<AirlineInterface, 'updatedAt'>;
