// Developed by Mateo Pineda
import type { Role } from '@/types/UserTypes';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
