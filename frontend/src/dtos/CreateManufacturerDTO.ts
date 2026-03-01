// Developed by Mateo Pineda
// Internal imports
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface.js';

export type CreateManufacturerDTO = Omit<ManufacturerInterface, 'id' | 'createdAt' | 'updatedAt'>;
