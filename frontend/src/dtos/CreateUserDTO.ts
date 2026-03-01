// Developed by Mateo Pineda
import type { UserInterface } from '@/interfaces/UserInterface.js';

export type CreateUserDTO = Omit<UserInterface, 'id' | 'role' | 'createdAt' | 'updatedAt'>;
