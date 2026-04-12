// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/UserStore';

export class AuthService {
  static getLoggedInUser(): UserInterface | null {
    return useUserStore().loggedInUser;
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
