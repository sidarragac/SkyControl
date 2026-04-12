// Developed by Mateo Pineda
// Internal imports
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface.js';

export type UpdateManufacturerDTO = Omit<ManufacturerInterface, 'updatedAt'>;
