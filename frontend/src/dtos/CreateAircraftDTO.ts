// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface.js';

export type CreateAirCraftDTO = Omit<AircraftInterface, 'id' | 'createdAt' | 'updatedAt'>;
