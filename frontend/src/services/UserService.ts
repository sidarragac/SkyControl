// Developed by Mateo Pineda
// External imports
import axios from 'axios';

// Internal imports
import type { CreateUserDTO } from '@/dtos/userDTO/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  private static readonly apiUrl = import.meta.env.VITE_API_BASE_URL;

  public static async createUser(user: CreateUserDTO): Promise<UserInterface> {
    const response = await axios.post(`${this.apiUrl}users`, user);
    const newUser = response.data;

    return newUser;
  }
}
