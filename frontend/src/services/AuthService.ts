// External imports
import axios from 'axios';

// Internal imports
import type { BackendUserDTO } from '@/dtos/userDTO/BackendUserDTO';

export class AuthService {
  private static readonly API_URL = 'http://localhost:3000/api/';

  public static async getLoggedInUser(): Promise<BackendUserDTO | null> {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      return null;
    }

    try {
      const response = await axios.get(`${this.API_URL}auth/profile`, {
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
    const response = await axios.post(`${this.API_URL}auth/login`, {
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
      await axios.get(this.API_URL + `users/${email}`);
      return true;
    } catch {
      return false;
    }
  }
}
