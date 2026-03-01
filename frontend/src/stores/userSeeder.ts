// Developed by Mateo Pineda
export const userSeeder = [
  {
    id: crypto.randomUUID(),
    name: 'John Doe',
    email: 'admin@skycontrol.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Jane Smith',
    email: 'user@skycontrol.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
