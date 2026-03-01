// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface.js';

export type UpdateAircraftDTO = Omit<AircraftInterface, 'updatedAt'>;
