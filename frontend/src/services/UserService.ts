// Developed by Mateo Pineda
import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import { useUserStore } from '@/stores/UserStore';

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users;
  }

  static createUser(user: CreateUserDTO): void {
    const id = crypto.randomUUID();
    const role = 'user';
    const createdAt = new Date();
    const updatedAt = new Date();

    useUserStore().users.push({ id, ...user, role, createdAt, updatedAt });
  }
}