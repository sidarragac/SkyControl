// Developed by Mateo Pineda
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface.js';

export type UpdateManufacturerDTO = Omit<ManufacturerInterface, 'updatedAt'>;
