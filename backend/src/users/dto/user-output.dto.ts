import type { Role } from 'src/types/UsersTypes';

export class UserOutputDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
