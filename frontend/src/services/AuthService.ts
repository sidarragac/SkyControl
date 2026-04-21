// External imports
import axios from 'axios';

// Internal imports
import type { BackendUserDTO } from '@/dtos/userDTO/BackendUserDTO';

export class AuthService {
  private static readonly apiUrl = import.meta.env.VITE_API_BASE_URL;

  public static async getLoggedInUser(): Promise<BackendUserDTO | null> {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      return null;
    }

    try {
      const response = await axios.get(`${this.apiUrl}auth/profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user = response.data;

      return user;
    } catch {
      return null;
    }
  }

  public static async logInUser(email: string, password: string): Promise<void> {
    const response = await axios.post(`${this.apiUrl}auth/login`, {
      email,
      password,
    });

    const access_token = response.data.access_token;

    localStorage.setItem('access_token', access_token);
  }

  static logOutUser(): void {
    localStorage.removeItem('access_token');
  }

  public static async validateExistingEmail(email: string): Promise<boolean> {
    try {
      await axios.get(`${this.apiUrl}users/${email}`);
      return true;
    } catch {
      return false;
    }
  }
}
