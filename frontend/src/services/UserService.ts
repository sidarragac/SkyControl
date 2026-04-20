// Developed by Mateo Pineda
// External imports
import axios from 'axios';

// Internal imports
import type { CreateUserDTO } from '@/dtos/userDTO/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  private static readonly API_URL = 'http://localhost:3000/api/';

  public static async createUser(user: CreateUserDTO): Promise<UserInterface> {
    const response = await axios.post(`${this.API_URL}users`, user);
    const newUser = response.data;

    return newUser;
  }
}
