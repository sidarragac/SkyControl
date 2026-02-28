// Developed by Mateo Pineda
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface.js';

export type CreateManufacturerDTO = Omit<ManufacturerInterface, 'id' | 'createdAt' | 'updatedAt'>;
