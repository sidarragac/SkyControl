// Developed by Mateo Pineda
// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface.js';

export type CreateUserDTO = Omit<UserInterface, 'id' | 'role' | 'createdAt' | 'updatedAt'>;
