// Developed by Mateo Pineda
// External imports
import { v4 as uuidv4 } from 'uuid';

// Internal imports
import type { CreateUserDTO } from '@/dtos/userDTO/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/UserStore';

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users;
  }

  static createUser(user: CreateUserDTO): void {
    const id = uuidv4();
    const role = 'user';
    const createdAt = new Date();
    const updatedAt = new Date();

    useUserStore().users.push({ id, ...user, role, createdAt, updatedAt });
  }
}
