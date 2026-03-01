// Developed by Mateo Pineda
import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import { useUserStore } from '@/stores/UserStore';

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users;
  }

  static getLoggedInUser(): UserInterface | null {
    return useUserStore().loggedInUser;
  }

  static createUser(user: CreateUserDTO): void {
    const id = crypto.randomUUID();
    const role = 'user';
    const createdAt = new Date();
    const updatedAt = new Date();

    useUserStore().users.push({ id, ...user, role, createdAt, updatedAt });
  }

  static logInUser(email: string, password: string): void {
    const user = useUserStore().users.find((u) => u.email === email && u.password === password);
    if (user) {
      useUserStore().loggedInUser = user;
    }
  }

  static logOutUser(): void {
    useUserStore().loggedInUser = null;
  }

  static validateExistingEmail(email: string): boolean {
    return useUserStore().users.some((u) => u.email === email);
  }
}
