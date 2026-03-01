// Developed by Mateo Pineda
import type { ManufacturerInterface } from '@/interfaces/ManufacturerInterface.js';

export type EditManufacturerDTO = Omit<ManufacturerInterface, 'updatedAt'>;
