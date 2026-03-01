// Developed by Mateo Pineda
import type { AircraftInterface } from '@/interfaces/AircraftInterface.js';

export type EditAircraftDTO = Omit<AircraftInterface, 'updatedAt'>;
