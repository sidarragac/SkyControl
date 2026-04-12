// Developed by Mateo Pineda
// External imports
import { v4 as uuidv4 } from 'uuid';

export const userSeeder = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'admin@skycontrol.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'user@skycontrol.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
