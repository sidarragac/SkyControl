// Developed by Mateo Pineda
// Internal imports
import type { AircraftInterface } from '@/interfaces/AircraftInterface.js';

export type CreateAircraftDTO = Omit<AircraftInterface, 'id' | 'createdAt' | 'updatedAt'>;
